from typing import Annotated

from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from src.core.logging import logger
from src.models import TempUserInDB, UserInDB, UserRegistration
from src.services.auth.passwords import get_password_hash, verify_password
from src.services.auth.token import access_token
from src.services.database.database_session_manager import get_db_session
from src.services.auth.bearer_token_with_cookies import oauth2_scheme


async def get_user_by_email(user_email: str, db: AsyncSession) -> UserInDB | None:
    stmt = select(UserInDB).where(UserInDB.email == user_email)
    result = await db.execute(stmt)
    user = result.scalars().first()
    if not user:
        return None
    return user


async def get_temp_user_by_email(
    user_email: str, db: AsyncSession
) -> TempUserInDB | None:
    stmt = select(TempUserInDB).where(TempUserInDB.email == user_email)
    result = await db.execute(stmt)
    user = result.scalars().first()
    if not user:
        return None
    return user


async def register_user(new_user: UserRegistration, db: AsyncSession) -> TempUserInDB:
    logger.info(f"User registration attempt: '{new_user.username}'")
    # Check for existing user
    user_exists = await get_user_by_email(new_user.username, db)
    if user_exists:
        raise HTTPException(
            status_code=400, detail="User with this email already exists"
        )
    # Create new temp user
    new_hashed_password = await get_password_hash(new_user.password)
    temp_user = TempUserInDB(
        email=new_user.username, hashed_password=new_hashed_password
    )
    try:
        db.add(temp_user)
        await db.commit()
    except Exception:
        raise HTTPException(status_code=400, detail="Error registering user")
    return temp_user


async def validate_user_registration(
    user_access_token: str, db: AsyncSession
) -> UserInDB:
    username = await access_token.get_subject(user_access_token)
    temp_user = await get_temp_user_by_email(username, db)
    if not temp_user:
        raise HTTPException(status_code=400, detail="User not found")
    new_user = UserInDB(
        email=temp_user.email, hashed_password=temp_user.hashed_password
    )
    try:
        await db.delete(temp_user)
        db.add(new_user)
        await db.commit()
    except Exception:
        raise HTTPException(status_code=400, detail="Error validating user")
    return new_user


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    db: AsyncSession = Depends(get_db_session),
) -> UserInDB:
    username = await access_token.get_subject(token)
    user: UserInDB | None = await get_user_by_email(username, db)
    if not user:
        raise HTTPException(status_code=400, detail="User not found")
    return user


async def get_current_active_user(
    current_user: Annotated[UserInDB, Depends(get_current_user)],
) -> UserInDB:
    if current_user.is_disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


async def authenticate_user(username: str, password: str, db: AsyncSession) -> UserInDB:
    """
    Authenticate a user with the provided username and password.

    Parameters
    ----------
    username : str
        Username of the user.
    password : str
        Password entered by the user.

    Returns
    -------
    UserInDBModel | bool
        User data if authenticated, False otherwise.
    """
    logger.info(f"User login attempt: '{username}'")

    # Retrieve user data from the database based on the provided username
    user = await get_user_by_email(username, db)

    if not user or user.is_disabled:
        raise HTTPException(status_code=400, detail="Inactive user")

    # Verify the password provided against the hashed password stored in the database
    user_verified = await verify_password(
        plain_password=password, hashed_password=user.hashed_password
    )
    if not user_verified:
        raise HTTPException(status_code=400, detail="Invalid password")

    # If both username and password are valid, log the successful authentication and return the user data
    logger.info(f"User authenticated: '{username}'")
    return user
