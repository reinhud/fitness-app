import contextlib
from typing import AsyncIterator
from src.core.logging import logger
from sqlalchemy.engine.url import URL as SQLAlchemyURL
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine


@contextlib.asynccontextmanager
async def tmp_postgres_database(
    database_url: SQLAlchemyURL, **kwargs
) -> AsyncIterator[SQLAlchemyURL]:
    """Context manager for creating new database and deleting it on exit.

    This will be used during testing to not interfere with the main database.

    Parameters
    ----------
    database_url : SQLAlchemyURL
        - The URL of the database.
    **kwargs
        - Additional keyword arguments to pass to the create_database_async function.

    Yields
    ------
    SQLAlchemyURL
        - The URL of the temporary database.
    """
    # Create temporary database
    tmp_db_name = "test-db"
    tmp_db_url = database_url.set(database=tmp_db_name)
    await create_postgres_async(tmp_db_url, **kwargs)
    logger.info(f"Temporary database {tmp_db_url} created.")

    try:
        # Yield the temporary database URL to be used in the tests
        yield tmp_db_url
    finally:
        # Drop database after the tests
        await drop_postgres_async(tmp_db_url)
        logger.info(f"Temporary database {tmp_db_url} dropped.")


async def create_postgres_async(
    database_url: SQLAlchemyURL, encoding: str = "utf8", template: str = "template1"
) -> None:
    """Create a new PostgreSQL database.

    Parameters
    ----------
    database_url : SQLAlchemyURL
        - The URL of the database.
    encoding : str
        - The encoding of the database.
    template : str
        - The template to use for the new database.
    """
    conn_url = database_url.set(database="postgres")

    try:
        engine = create_async_engine(conn_url, isolation_level="AUTOCOMMIT")
    except Exception as e:
        logger.error(f"Could not create engine: {e}")
        raise e

    async with engine.begin() as conn:
        stmt = f'CREATE DATABASE "{database_url.database}" ENCODING {encoding} TEMPLATE {template}'
        await conn.execute(text(stmt))
        logger.info(f"Database {database_url.database} created.")


async def drop_postgres_async(database_url: SQLAlchemyURL) -> None:
    """Drop a PostgreSQL database.

    Parameters
    ----------
    database_url : SQLAlchemyURL
        - The URL of the database.
    """
    conn_url = database_url.set(database="postgres")

    try:
        engine = create_async_engine(conn_url, isolation_level="AUTOCOMMIT")
    except Exception as e:
        logger.error(f"Could not create engine: {e}")
        raise e

    async with engine.begin() as conn:
        stmt = f'DROP DATABASE "{database_url.database}"'
        await conn.execute(text(stmt))
        logger.info(f"Database {database_url.database} dropped.")
