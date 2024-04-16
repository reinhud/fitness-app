import pytest
from sqlalchemy.ext.asyncio import create_async_engine
from src.core.settings.settings import get_settings
from alembic.config import Config
from tests.tests_utils.db_utils import tmp_postgres_database


@pytest.fixture()
async def postgres():
    """
    Creates empty temporary database.
    """
    database_url = get_settings().database.DATABASE_URL
    async with tmp_postgres_database(database_url) as tmp_url:
        yield tmp_url


@pytest.fixture()
async def postgres_engine(postgres):
    """
    SQLAlchemy engine, bound to temporary database.
    """
    engine = create_async_engine(
        url=postgres,
        pool_pre_ping=True,
    )
    try:
        yield engine
    finally:
        await engine.dispose()


@pytest.fixture()
def alembic_config(postgres):
    """
    Alembic configuration object, bound to temporary database.
    """
    alembic_config = Config("alembic.ini")
    alembic_config.set_main_option("sqlalchemy.url", str(postgres))
    return alembic_config
