from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.logging import logger
from src.models import UserInDB


async def update_username(
    current_active_user: UserInDB,
    new_username: str,
    db: AsyncSession,
) -> None:
    """Update the user's username."""
    # Check if the new username is the same as the current username
    if current_active_user.username == new_username:
        raise HTTPException(
            status_code=400,
            detail="New username must be different from the current username.",
        )

    # Update the user with the new username
    current_active_user.username = new_username

    try:
        await db.commit()
    except Exception:
        logger.error(
            f"Error updateting username for user: '{current_active_user.username}'"
        )
        raise HTTPException(status_code=400, detail="Error updateting username.")
    return
