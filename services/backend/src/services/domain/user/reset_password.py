from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.logging import logger
from src.models import PasswordResetRequest, TempUserInDB, UserInDB
from src.services.auth.passwords import get_password_hash, verify_password
from src.services.auth.token import reset_token
from src.services.domain.user.get_user import get_temp_user_by_email, get_user_by_email


async def reset_password(
    current_active_user: UserInDB,
    password_reset_request: PasswordResetRequest,
    db: AsyncSession,
) -> None:
    # Verify the password provided against the hashed password stored in the database
    user_verified = await verify_password(
        plain_password=password_reset_request.current_password,
        hashed_password=current_active_user.hashed_password,
    )
    if not user_verified:
        raise HTTPException(status_code=400, detail="Invalid password")

    # Check if the new password and confirm password match
    if password_reset_request.new_password != password_reset_request.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match",
        )

    # Hash the new password
    new_hashed_password = await get_password_hash(password_reset_request.new_password)

    # Check if temp user exists
    temp_user = await get_temp_user_by_email(current_active_user.email, db)

    if temp_user:
        # Update the temp user with the new password
        temp_user.hashed_password = new_hashed_password
        try:
            await db.commit()
        except Exception:
            logger.error(
                f"Error resetting password for user: '{current_active_user.username}'"
            )
            raise HTTPException(status_code=400, detail="Error resetting password.")
        return

    else:
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


async def validate_reset_password(
    token: str,
    db: AsyncSession,
) -> UserInDB:
    # Try get the user from the reset token
    email = await reset_token.get_subject(token)
    logger.info(f"Validating password for: {email}")
    temp_user = await get_temp_user_by_email(email, db)
    if not temp_user:
        raise HTTPException(status_code=400, detail="User update not found.")

    # Get the user from the database
    db_user = await get_user_by_email(email, db)
    if not db_user:
        raise HTTPException(status_code=400, detail="User not found.")

    # Update the user with the new password
    try:
        await db.delete(temp_user)
        db_user.hashed_password = temp_user.hashed_password
        await db.commit()
    except Exception:
        logger.error(f"Error validating user: '{db_user.username}'")
        raise HTTPException(status_code=400, detail="Error validating user.")

    return db_user
