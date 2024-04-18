from typing import Annotated

from fastapi import APIRouter, Depends, Form, HTTPException, Request, Response, status
from fastapi.responses import RedirectResponse

from src.core.settings.settings import get_settings
from src.models import ForgotPasswordRequest, ForgotPasswordResetRequest
from src.services.auth.token import reset_token
from src.services.database.database_session_manager import get_db_session
from src.services.domain.user.forgot_password import (
    forgot_password,
    reset_forgot_password,
    validate_reset_forgot_password,
)
from src.services.domain.user.get_user import get_user_by_email
from src.services.email.templates.forgot_password.forgot_passwprd import (
    send_forgot_password_email,
)
from src.services.email.templates.reset_password.reset_password import (
    send_password_reset_email,
)

forgot_password_router = APIRouter()


@forgot_password_router.post(
    "/forgot-password",
    name="User: Forgot Password",
    status_code=status.HTTP_200_OK,
)
async def forgot_password_route(
    email: Annotated[str, Form()],
    verify_email: Annotated[str, Form()],
    db=Depends(get_db_session),
):
    user = await forgot_password(
        ForgotPasswordRequest(
            email=email,
            verify_email=verify_email,
        ),
        db,
    )

    # Create a new reset token
    user_reset_token = await reset_token.create(subject=email)

    # Send forgot password email
    await send_forgot_password_email(user, user_reset_token)

    return {"message": "Forgot password email sent"}


@forgot_password_router.get(
    "/validate-forgot-password",
    name="Auth: Verify Forgot Password",
    status_code=status.HTTP_200_OK,
)
async def validate_forgot_password_route(
    response: Response,
    token: str,
):
    # Try get the user from the reset token
    try:
        await reset_token.get_subject(token)
    except Exception:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Invalid token"}

    # Set the access token as a cookie
    response.set_cookie(
        key="reset_token",
        value=f"Bearer {token}",
        httponly=True,
    )

    # Redirect to React frontend forgot password page
    redirect_url = f"{get_settings().networking.FRONTENT_URL}/forgot-password"
    return RedirectResponse(redirect_url)


@forgot_password_router.post(
    "/reset-forgot-password",
    name="user: Reset Password",
    status_code=status.HTTP_200_OK,
)
async def reset_forgot_password_route(
    request: Request,
    new_password: Annotated[str, Form()],
    confirm_password: Annotated[str, Form()],
    db=Depends(get_db_session),
):
    # Get user from token
    token = request.cookies.get("reset_token")
    if not token:
        raise HTTPException(status_code=400, detail="Invalid token")
    try:
        email = await reset_token.get_subject(token)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid token")

    current_active_user = await get_user_by_email(email, db)

    if not current_active_user:
        raise HTTPException(status_code=400, detail="User not found.")

    await reset_forgot_password(
        current_active_user,
        ForgotPasswordResetRequest(
            new_password=new_password,
            confirm_password=confirm_password,
        ),
        db,
    )

    # Create a new reset token
    user_reset_token = await reset_token.create(subject=email)

    # Send password reset email
    await send_password_reset_email(current_active_user, user_reset_token)

    return {"message": "Password reset email sent"}


@forgot_password_router.get(
    "/validate-reset-forgot-password",
    name="Auth: Verify Reset Password",
    status_code=status.HTTP_200_OK,
)
async def validate_reset_forgot_password_route(
    response: Response,
    token: str,
    db=Depends(get_db_session),
):
    await validate_reset_forgot_password(token, db)

    # Delete the reset token
    response.delete_cookie(key="reset_token")

    # Redirect to React frontend login page
    redirect_url = f"{get_settings().networking.FRONTENT_URL}/login"
    return RedirectResponse(redirect_url)
