from typing import Annotated

from fastapi import APIRouter, Depends, Form, Response, status
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordRequestForm

from src.core.settings.settings import get_settings
from src.models import RegistrationRequest, TempUserInDB
from src.services.auth.register import register_user, validate_user_registration
from src.services.auth.token import access_token
from src.services.database.database_session_manager import get_db_session
from src.services.email.templates.registration.registration import (
    send_registration_email,
)

register_router = APIRouter()


@register_router.post(
    "/register",
    name="Auth: Register",
    status_code=status.HTTP_201_CREATED,
)
async def register_route(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    name: Annotated[str, Form()],
    db=Depends(get_db_session),
):
    # Create a new temporary user
    temp_user: TempUserInDB = await register_user(
        RegistrationRequest(
            email=form_data.username,
            password=form_data.password,
            username=name,
        ),
        db,
    )

    # Create an access token
    user_access_token = await access_token.create(subject=temp_user.email)

    # Send registration email
    await send_registration_email(temp_user, user_access_token)

    return {"message": "Registration email sent"}


@register_router.get(
    "/validate-registration",
    name="Auth: Validate Registration",
    status_code=status.HTTP_200_OK,
)
async def validate_registration_route(
    response: Response,
    token: str,
    db=Depends(get_db_session),
):
    # Check if token is valid and get user
    new_user = await validate_user_registration(token, db)

    # Set the access token as a cookie
    user_access_token = await access_token.create(subject=new_user.email)

    response.set_cookie(
        key="access_token",
        value=f"Bearer {user_access_token}",
        httponly=True,
    )

    # Redirect to React frontend login page
    redirect_url = get_settings().networking.FRONTENT_URL
    return RedirectResponse(redirect_url)
