from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.logging import logger
from src.models import (
    ForgotPasswordRequest,
    ForgotPasswordResetRequest,
    TempUserInDB,
    UserInDB,
)
from src.services.auth.passwords import get_password_hash
from src.services.auth.token import reset_token
from src.services.domain.user.get_user import get_temp_user_by_email, get_user_by_email


async def forgot_password(
    forgot_password_request: ForgotPasswordRequest,
    db: AsyncSession,
) -> UserInDB:
    # Check that emails are same
    if forgot_password_request.email != forgot_password_request.confirm_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Emails do not match",
        )

    # Get user by email
    user = await get_user_by_email(forgot_password_request.email, db)
    if not user:
        raise HTTPException(status_code=400, detail="User not found.")

    return user


async def reset_forgot_password(
    current_active_user: UserInDB,
    forgot_password_reset_request: ForgotPasswordResetRequest,
    db: AsyncSession,
):
    # Check that new password and confirm password match
    if (
        forgot_password_reset_request.new_password
        != forgot_password_reset_request.confirm_password
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match",
        )

    # Hash the new password
    new_hashed_password = await get_password_hash(
        forgot_password_reset_request.new_password
    )

    logger.debug(f"Resetting password for user: '{current_active_user}'")
    # Check if temp user exists
    temp_user = await get_temp_user_by_email(current_active_user.email, db)

    logger.debug(f"Temp user: {temp_user}")

    if temp_user:
        # Update the temp user with the new password
        temp_user.hashed_password = new_hashed_password
        try:
            await db.commit()
        except Exception:
            logger.error(f"Error resetting password for user: '{temp_user.username}'")
            raise HTTPException(status_code=400, detail="Error resetting password.")
        return

    else:

        if not current_active_user:
            raise HTTPException(status_code=400, detail="User not found.")

        # Create a new temporary user
        temp_user = TempUserInDB(
            username=current_active_user.username,
            email=current_active_user.email,
            hashed_password=new_hashed_password,
        )

        try:
            db.add(temp_user)
            await db.commit()
        except Exception:
            logger.error(
                f"Error resetting password for user: '{current_active_user.username}'"
            )
            raise HTTPException(status_code=400, detail="Error resetting password.")


async def validate_reset_forgot_password(
    token: str,
    db: AsyncSession,
) -> None:
    # Try get the user from the reset token
    email = await reset_token.get_subject(token)
    temp_user = await get_temp_user_by_email(email, db)
    if not temp_user:
        raise HTTPException(status_code=400, detail="User update not found.")

    # Get the user from the database
    db_user = await get_user_by_email(email, db)
    if not db_user:
        raise HTTPException(status_code=400, detail="User not found.")
