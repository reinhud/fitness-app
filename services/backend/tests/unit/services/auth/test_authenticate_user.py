import pytest
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from src.models import LoginRequest, UserInDB
from src.services.auth.authenticate_user import authenticate_user
from src.services.auth.passwords import get_password_hash


async def test_authenticate_user_success(test_session: AsyncSession):
    # Create a test user
    hashed_password = await get_password_hash("testpassword1234")
    test_user = UserInDB(
        username="test_user",
        email="test@example.com",
        hashed_password=hashed_password,
        is_disabled=False,
    )
    test_session.add(test_user)
    await test_session.commit()

    # Test successful authentication
    login_request = LoginRequest(email="test@example.com", password="testpassword1234")
    authenticated_user = await authenticate_user(login_request, test_session)
    assert authenticated_user.email == login_request.email


async def test_authenticate_user_user_not_found(test_session: AsyncSession):
    # Test user not found
    login_request = LoginRequest(
        email="nonexistent@example.com", password="testpassword1234"
    )
    with pytest.raises(HTTPException) as exc_info:
        await authenticate_user(login_request, test_session)
    assert exc_info.value.status_code == 400
    assert exc_info.value.detail == "User not found"


async def test_authenticate_user_inactive_user(test_session: AsyncSession):
    # Create an inactive test user
    hashed_password = await get_password_hash("testpassword1234")
    test_user = UserInDB(
        username="inactive_user",
        email="inactive@example.com",
        hashed_password=hashed_password,
        is_disabled=True,
    )
    test_session.add(test_user)
    await test_session.commit()

    # Test inactive user
    login_request = LoginRequest(
        email="inactive@example.com", password="testpassword1234"
    )
    with pytest.raises(HTTPException) as exc_info:
        await authenticate_user(login_request, test_session)
    assert exc_info.value.status_code == 400
    assert exc_info.value.detail == "Inactive user"


async def test_authenticate_user_invalid_password(test_session: AsyncSession):
    # Create a test user
    hashed_password = await get_password_hash("testpassword1234")
    test_user = UserInDB(
        username="test_user",
        email="invalid_password@example.com",
        hashed_password=hashed_password,
        is_disabled=False,
    )
    test_session.add(test_user)
    await test_session.commit()

    # Test invalid password
    login_request = LoginRequest(
        email="invalid_password@example.com", password="invalidpassword"
    )
    with pytest.raises(HTTPException) as exc_info:
        await authenticate_user(login_request, test_session)
    assert exc_info.value.status_code == 400
    assert exc_info.value.detail == "Invalid password"
