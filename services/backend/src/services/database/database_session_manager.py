from contextlib import asynccontextmanager
from typing import Any, AsyncIterator

from sqlalchemy.engine.url import URL as SQLAlchemyURL
from sqlalchemy.ext.asyncio import (
    AsyncConnection,
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from src.core.logging import logger

# Heavily inspired by https://praciano.com.br/fastapi-and-async-sqlalchemy-20-with-pytest-done-right.html


class DatabaseSessionManager:
    """Database session manager singleton.

    This singleton will be responsible for abstracting
    the database connection and session handling in FastAPI.
    """

    def __init__(self) -> None:
        self._engine: AsyncEngine | None = None
        self._sessionmaker: async_sessionmaker[AsyncSession] | None = None

    async def init(
        self, database_url: SQLAlchemyURL, engine_kwargs: dict[str, Any] = {}
    ) -> None:
        """Establish initial connection.

        Parameters
        ----------
        database_url : SQLAlchemyURL
            - The URL of the database.
        engine_kwargs : dict[str, Any]
            - Additional keyword arguments to pass to the engine.
        """
        if "postgresql" in database_url.drivername:
            # These settings are needed to work with pgbouncer in transaction mode
            # because you can't use prepared statements in such case
            postgresql_engine_kwargs_overrides = {
                "statement_cache_size": 0,
                "prepared_statement_cache_size": 0,
            }
            engine_kwargs.update(postgresql_engine_kwargs_overrides)

        self._engine = create_async_engine(
            url=database_url,
            pool_pre_ping=True,
            connect_args=engine_kwargs,
        )
        self._sessionmaker = async_sessionmaker(
            bind=self._engine,
            expire_on_commit=False,
        )
        logger.success(
            f"DatabaseSessionManager initialized connection to database: {database_url}."
        )

    async def close(self) -> None:
        """Close the database session manager."""
        if self._engine is None:
            logger.warning(
                "Trying to close connection of DatabaseSessionManager that was never initialized."
            )
            return
        database_url = self._engine.url
        await self._engine.dispose()
        self._engine = None
        self._sessionmaker = None
        logger.success(
            f"DatabaseSessionManager closed connection to database {database_url}."
        )

    @asynccontextmanager
    async def connect(self) -> AsyncIterator[AsyncConnection]:
        """Connect to the database."""
        if self._engine is None:
            raise IOError("DatabaseSessionManager is not initialized")
        async with self._engine.begin() as connection:
            try:
                yield connection
            except Exception:
                await connection.rollback()
                raise

    @asynccontextmanager
    async def session(self) -> AsyncIterator[AsyncSession]:
        """Create a new session."""
        if self._sessionmaker is None:
            raise IOError("DatabaseSessionManager is not initialized")
        async with self._sessionmaker() as session:
            try:
                yield session
            except Exception:
                await session.rollback()
                raise


# Singleton instance used throughout the application lifecycle
database_session_manager = DatabaseSessionManager()


async def get_db_session() -> AsyncIterator[AsyncSession]:
    """Fastapi database dependency.
    Example:
    ```
    @auth_router.post(
        "/example",
    )
    async def reset_password(
        database_session=Depends(get_db_session),
    ):
        ...
    ```
    """
    async with database_session_manager.session() as session:
        yield session
