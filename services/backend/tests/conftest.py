from contextlib import ExitStack
from typing import AsyncGenerator, Generator
from fastapi import FastAPI
from httpx import AsyncClient
import nest_asyncio
import pytest
from asyncio import AbstractEventLoop, get_event_loop_policy
from core.settings.settings import get_settings
from tests.tests_utils.db_utils import tmp_postgres_database
from alembic.command import revision, stamp, upgrade
from alembic.config import Config
from src.core.logging import logger
from pathlib import Path
from src.services.database.database_session_manager import (
    database_session_manager,
    get_db_session,
)
from src.main import app as actual_app

from pytest_asyncio import is_async_test


# ==============================================================================#
# ================================ General Stuff ===============================#
# ==============================================================================#


def pytest_collection_modifyitems(items):
    """Add a session scope marker to all async tests.

    This will make all async tests run in the same event loop.
    https://pytest-asyncio.readthedocs.io/en/latest/how-to-guides/run_session_tests_in_same_loop.html
    """
    pytest_asyncio_tests = (item for item in items if is_async_test(item))
    session_scope_marker = pytest.mark.asyncio(scope="session")
    for async_test in pytest_asyncio_tests:
        async_test.add_marker(session_scope_marker, append=False)


# Allow for nested event loops, like the one in migrations and tests
nest_asyncio.apply()


# TODO: this will be deprecuated, but it works. fix in future
@pytest.fixture(scope="session")
def event_loop() -> Generator[AbstractEventLoop, None, None]:
    loop = get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


# ==============================================================================#
# =============================== Database Stuff ===============================#
# ==============================================================================#
@pytest.fixture(scope="session")
async def migrated_postgres_test_db():
    """
    Creates empty temporary database.
    """
    database_url = get_settings().database.DATABASE_URL
    async with tmp_postgres_database(database_url) as tmp_url:
        # Set up alembic configuration
        alembic_config = Config("alembic.ini")
        alembic_config.set_main_option("sqlalchemy.url", str(tmp_url))

        # Make migrations
        stamp(alembic_config, "head")
        revision(
            alembic_config,
            message="Revision before test",
            autogenerate=True,
        )
        upgrade(alembic_config, "head")

        logger.info(
            f"Migrations applied in temporary database {get_settings().database.DATABASE_URL}."
        )

        yield tmp_url

        # Clean alembic # TODO: Fix this to downgrade correctly
        # latest_revision = alembic_config.latest_revision()
        # downgrade(alembic_config, to_revision=latest_revision)

        migrations_dir = Path("alembic/versions")
        files_to_remove = [
            filename
            for filename in migrations_dir.iterdir()
            if "revision_before_test" in filename.name
        ]

        for file_to_remove in files_to_remove:
            file_to_remove.unlink()


@pytest.fixture(scope="session")
async def test_database_session_manager(migrated_postgres_test_db):
    await database_session_manager.init(database_url=migrated_postgres_test_db)
    logger.info(
        f"Test DB initialized connection to database {migrated_postgres_test_db}."
    )
    yield database_session_manager
    await database_session_manager.close()
    logger.info(f"Test DB closed connection to database {migrated_postgres_test_db}.")


@pytest.fixture()
async def test_session(test_database_session_manager):
    async with test_database_session_manager.session() as session:
        yield session


# ==============================================================================#
# =============================== FastApi Stuff ================================#
# ==============================================================================#
@pytest.fixture()
async def test_app(test_database_session_manager) -> FastAPI:
    """Injecting test database as dependancy in app for tests.

    Fixtures
    ----------
    test_session : Session
        - The test session to be used in the tests.

    Returns
    -------
    FastAPI
        - The test app with the test session injected.
    """
    with ExitStack():  # Make sure to close everything properly

        async def get_db_session_override() -> AsyncGenerator:
            yield test_session

        # Injection of test session
        actual_app.dependency_overrides[get_db_session] = get_db_session_override

    return actual_app


@pytest.fixture()
async def async_test_client(test_app: FastAPI) -> AsyncGenerator[AsyncClient, None]:
    """Test client that will be used to make requests against our endpoints.

    Fixtures
    ----------
    test_app : FastAPI
        - The test app to be used in the tests.

    Returns
    -------
    AsyncClient
        - The test client to be used in the tests.
    """
    async with AsyncClient(app=test_app, base_url="http://testserver") as ac:
        try:
            yield ac

        except Exception as e:
            logger.error(f"Error while yielding test client: {e}")
