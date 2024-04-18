import bcrypt
import pytest

from src.services.auth.passwords import get_password_hash, verify_password


@pytest.mark.asyncio
async def test_verify_password_correct():
    plain_password = "testpassword1234"
    hashed_password = bcrypt.hashpw(plain_password.encode("utf-8"), bcrypt.gensalt())

    assert await verify_password(plain_password, hashed_password)


@pytest.mark.asyncio
async def test_verify_password_incorrect():
    plain_password = "testpassword1234"
    correct_password = bcrypt.hashpw(plain_password.encode("utf-8"), bcrypt.gensalt())
    wrong_password = bcrypt.hashpw("wrongpassword".encode("utf-8"), bcrypt.gensalt())

    assert await verify_password(plain_password, correct_password)
    assert not await verify_password(plain_password, wrong_password)


@pytest.mark.asyncio
async def test_get_password_hash():
    plain_password = "testpassword1234"
    hashed_password = await get_password_hash(plain_password)

    assert bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password)
