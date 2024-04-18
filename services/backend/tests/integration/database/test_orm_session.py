from sqlalchemy.sql import text
from sqlmodel import select

from src.models import UserInDB


async def test_temp_database_exists(test_session):
    stmt = text("SELECT 1 FROM pg_database WHERE datname='%s'" % "test-db")
    result = await test_session.execute(stmt)
    assert result.scalar() == 1


async def test_orm_session(test_session):
    user = await test_session.execute(select(UserInDB))

    # Test if the database is empty
    assert user.scalars().all() == []
    assert user.scalars().first() is None

    # Create a new user
    new_user = UserInDB(
        username="test_user",
        email="test@mail.com",
        hashed_password=b"testpassword1234",
    )
    test_session.add(new_user)
    await test_session.commit()

    # Check if the user was created
    user = await test_session.execute(select(UserInDB))
    db_user: UserInDB = user.scalars().first()

    assert db_user.username == new_user.username
    assert db_user.email == new_user.email
    assert db_user.hashed_password == new_user.hashed_password
    assert db_user.is_disabled == new_user.is_disabled
