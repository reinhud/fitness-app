from typing import Annotated

from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from src.models import TempUserInDB, UserInDB
from src.services.auth.bearer_token_with_cookies import oauth2_scheme
from src.services.auth.token import access_token
from src.services.database.database_session_manager import get_db_session


async def get_user_by_email(email: str, db: AsyncSession) -> UserInDB | None:
    stmt = select(UserInDB).where(UserInDB.email == email)
    result = await db.execute(stmt)
    user = result.scalars().first()
    if not user:
        return None
    return user


async def get_temp_user_by_email(email: str, db: AsyncSession) -> TempUserInDB | None:
    stmt = select(TempUserInDB).where(TempUserInDB.email == email)
    result = await db.execute(stmt)
    user = result.scalars().first()
    if not user:
        return None
    return user


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    db=Depends(get_db_session),
):
    email = await access_token.get_subject(token)
    user: UserInDB | None = await get_user_by_email(email=email, db=db)
    if not user:
        raise HTTPException(status_code=400, detail="User not found.")
    return user


async def get_current_active_user(
    current_user: Annotated[UserInDB, Depends(get_current_user)],
):
    if current_user.is_disabled:
        raise HTTPException(status_code=400, detail="User disabled.")
    return current_user
