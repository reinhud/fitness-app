from typing import Annotated

from fastapi import APIRouter, Depends, Form, Response, status
from fastapi.responses import RedirectResponse

from src.core.settings.settings import get_settings
from src.models import EmailResetRequest, UserInDB
from src.services.auth.token import reset_token
from src.services.database.database_session_manager import get_db_session
from src.services.domain.user.get_user import get_current_active_user
from src.services.domain.user.reset_email import reset_email, validate_reset_email
from src.services.email.templates.reset_email.reset_email import send_email_reset_email

reset_email_router = APIRouter()


@reset_email_router.post(
    "/reset-email",
    name="User: Reset Email",
    status_code=status.HTTP_200_OK,
)
async def reset_email_route(
    current_active_user: Annotated[UserInDB, Depends(get_current_active_user)],
    new_email: Annotated[str, Form()],
    confirm_email: Annotated[str, Form()],
    db=Depends(get_db_session),
):
    await reset_email(
        current_active_user,
        EmailResetRequest(new_email=new_email, confirm_email=confirm_email),
        db,
    )

    # Create a new reset token
    old_email_token = await reset_token.create(subject=current_active_user.email)
    new_email_token = await reset_token.create(subject=new_email)

    # Send password reset email
    await send_email_reset_email(current_active_user, old_email_token, new_email_token)

    return {"message": "Email reset email sent"}


@reset_email_router.get(
    "/validate-reset-email",
    name="User: Verify Reset Email",
    status_code=status.HTTP_200_OK,
)
async def validate_reset_email_route(
    response: Response,
    old_email_token: str,
    new_email_token: str,
    db=Depends(get_db_session),
):
    await validate_reset_email(old_email_token, new_email_token, db)

    # Delete acces token cookie if it exists to log off user
    response.delete_cookie(key="access_token")

    # Redirect to React frontend login page
    redirect_url = f"{get_settings().networking.FRONTENT_URL}/login"
    return RedirectResponse(redirect_url)
