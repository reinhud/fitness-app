from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.logging import logger
from src.models import LoginRequest, UserInDB
from src.services.auth.passwords import verify_password
from src.services.domain.user.get_user import get_user_by_email


async def authenticate_user(login_request: LoginRequest, db: AsyncSession) -> UserInDB:
    logger.info(f"User login attempt: '{login_request.email}'")

    # Retrieve user data from the database
    user = await get_user_by_email(email=login_request.email, db=db)

    if not user:
        raise HTTPException(status_code=400, detail="User not found")

    if user.is_disabled:
        raise HTTPException(status_code=400, detail="Inactive user")

    # Verify the password provided against the hashed password stored in the database
    user_verified = await verify_password(
        plain_password=login_request.password, hashed_password=user.hashed_password
    )
    if not user_verified:
        raise HTTPException(status_code=400, detail="Invalid password")

    return user
