from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.logging import logger
from src.models import RegistrationRequest, TempUserInDB, UserInDB
from src.services.auth.passwords import get_password_hash
from src.services.auth.token import access_token
from src.services.domain.user.get_user import get_temp_user_by_email, get_user_by_email


async def register_user(
    new_user: RegistrationRequest, db: AsyncSession
) -> TempUserInDB:
    logger.info(f"user registration attempt: '{new_user.username}'")

    # Check for existing user
    user = await get_user_by_email(new_user.email, db)
    temp_user = await get_temp_user_by_email(new_user.email, db)
    if user or temp_user:
        raise HTTPException(
            status_code=400, detail="User with this email already exists."
        )

    # Create new temp user
    new_hashed_password = await get_password_hash(new_user.password)
    temp_user = TempUserInDB(
        username=new_user.username,
        email=new_user.email,
        hashed_password=new_hashed_password,
    )

    try:
        db.add(temp_user)
        await db.commit()
    except Exception:
        logger.error(f"Error registering user: '{new_user.username}'")
        raise HTTPException(status_code=400, detail="Error registering user.")
    return temp_user


async def validate_user_registration(
    user_access_token: str, db: AsyncSession
) -> UserInDB:
    email = await access_token.get_subject(user_access_token)

    temp_user = await get_temp_user_by_email(email, db)
    if not temp_user:
        raise HTTPException(status_code=400, detail="User not found.")

    new_user = UserInDB(
        username=temp_user.username,
        email=temp_user.email,
        hashed_password=temp_user.hashed_password,
    )

    try:
        await db.delete(temp_user)
        db.add(new_user)
        await db.commit()
    except Exception:
        logger.error(f"Error validating user: '{new_user.username}'")
        raise HTTPException(status_code=400, detail="Error validating user.")
    return new_user
