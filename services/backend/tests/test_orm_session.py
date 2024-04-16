from sqlalchemy.sql import text
from sqlmodel import select

import pytest

from src.models import AccountInDB


async def test_temp_database_exists(test_session):
    stmt = text("SELECT 1 FROM pg_database WHERE datname='%s'" % "test-db")
    result = await test_session.execute(stmt)
    assert result.scalar() == 1


@pytest.mark.asyncio
async def test_orm_session(test_session):
    account = await test_session.execute(select(AccountInDB))
    assert account.scalars().all() == []
    assert account.scalars().first() is None

    # Create a new account
    new_account = AccountInDB(
        username="test_user",
        email="",
        hashed_password="",
    )
    test_session.add(new_account)
    await test_session.commit()

    # Check if the account was created
    account = await test_session.execute(select(AccountInDB))
    assert account.scalars().all() == [new_account]
    assert account.scalars().first() == new_account
