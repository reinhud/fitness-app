from typing import Annotated

from fastapi import APIRouter, Depends, Form, Response, status
from fastapi.responses import RedirectResponse

from src.core.settings.settings import get_settings
from src.models import PasswordResetRequest, UserInDB
from src.services.auth.token import reset_token
from src.services.database.database_session_manager import get_db_session
from src.services.domain.user.get_user import get_current_active_user
from src.services.domain.user.reset_password import (
    reset_password,
    validate_reset_password,
)
from src.services.email.templates.reset_password.reset_password import (
    send_password_reset_email,
)

reset_password_router = APIRouter()


@reset_password_router.post(
    "/reset-password",
    name="User: Reset Password",
    status_code=status.HTTP_200_OK,
)
async def reset_password_route(
    current_active_user: Annotated[UserInDB, Depends(get_current_active_user)],
    current_password: Annotated[str, Form()],
    new_password: Annotated[str, Form()],
    confirm_password: Annotated[str, Form()],
    db=Depends(get_db_session),
):
    await reset_password(
        current_active_user,
        PasswordResetRequest(
            current_password=current_password,
            new_password=new_password,
            confirm_password=confirm_password,
        ),
        db,
    )

    # Create a new reset token
    user_reset_token = await reset_token.create(subject=current_active_user.email)

    # Send password reset email
    await send_password_reset_email(current_active_user, user_reset_token)

    return {"message": "Password reset email sent"}


@reset_password_router.get(
    "/validate-reset-password",
    name="User: Verify Reset Password",
    status_code=status.HTTP_200_OK,
)
async def validate_reset_password_route(
    response: Response,
    token: str,
    db=Depends(get_db_session),
):
    await validate_reset_password(token, db)

    # Delete acces token cookie if it exists to log off user
    response.delete_cookie(key="access_token")

    # Redirect to React frontend login page
    redirect_url = f"{get_settings().networking.FRONTENT_URL}/login"
    return RedirectResponse(redirect_url)
