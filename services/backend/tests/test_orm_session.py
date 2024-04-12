from sqlalchemy.sql import text
from sqlmodel import select

import pytest

from src.models import Country


async def test_temp_database_exists(test_session):
    stmt = text("SELECT 1 FROM pg_database WHERE datname='%s'" % "test-db")
    result = await test_session.execute(stmt)
    assert result.scalar() == 1


@pytest.mark.asyncio
async def test_orm_session(test_session):
    country = Country(name="USA", code="US")
    test_session.add(country)
    await test_session.commit()

    stmt = select(Country)
    result = await test_session.execute(stmt)
    country = result.scalars().first()
    assert country.name == "USA"
    assert country.code == "US"
