from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.logging import logger
from src.models import EmailResetRequest, TempUserInDB, UserInDB
from src.services.auth.token import reset_token
from src.services.domain.user.get_user import get_temp_user_by_email, get_user_by_email


async def reset_email(
    current_active_user: UserInDB,
    email_reset_request: EmailResetRequest,
    db: AsyncSession,
) -> None:
    # Check if confirm email is the same as the new email
    if email_reset_request.confirm_email != email_reset_request.new_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Emails do not match",
        )

    # Check if the new email is the same as the current email
    if current_active_user.email == email_reset_request.new_email:
        raise HTTPException(
            status_code=400,
            detail="New email must be different from the current email.",
        )

    # Check if temp user exists
    temp_user = await get_temp_user_by_email(email_reset_request.new_email, db)

    if not temp_user:
        # Create a new temporary user
        temp_user = TempUserInDB(
            username=current_active_user.username,
            email=email_reset_request.new_email,
            hashed_password=current_active_user.hashed_password,
        )

        try:
            db.add(temp_user)
            await db.commit()
        except Exception:
            logger.error(
                f"Error resetting email for user: '{current_active_user.username}'"
            )
            raise HTTPException(status_code=400, detail="Error resetting email.")


async def validate_reset_email(
    old_email_token: str,
    new_email_token: str,
    db: AsyncSession,
) -> None:
    # Try get the temp user from the reset token
    new_email = await reset_token.get_subject(new_email_token)
    logger.info(f"Validating email for: {new_email}")
    temp_user = await get_temp_user_by_email(new_email, db)
    if not temp_user:
        raise HTTPException(status_code=400, detail="User update not found.")

    # Get the user from the database
    old_email = await reset_token.get_subject(old_email_token)
    db_user = await get_user_by_email(old_email, db)
    if not db_user:
        raise HTTPException(status_code=400, detail="User not found.")

    # Update the user with the new email
    try:
        await db.delete(temp_user)
        db_user.email = temp_user.email
        await db.commit()
    except Exception:
        logger.error(f"Error validating user: '{db_user.username}'")
        raise HTTPException(status_code=400, detail="Error validating user.")
