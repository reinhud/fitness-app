from typing import Annotated

from fastapi import APIRouter, Depends, Response, status
from fastapi.security import OAuth2PasswordRequestForm

from src.models import LoginRequest, UserInDB
from src.services.auth.authenticate_user import authenticate_user
from src.services.auth.token import access_token
from src.services.database.database_session_manager import get_db_session

login_router = APIRouter()


@login_router.post(
    "/login",
    name="Auth: Token",
    status_code=status.HTTP_200_OK,
)
async def login_for_access_token_route(
    response: Response,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db=Depends(get_db_session),
):
    # Authenticate the user
    user: UserInDB = await authenticate_user(
        login_request=LoginRequest(
            email=form_data.username,  # username is the email because of required fields in OAuth2PasswordRequestForm  # noqa: E501
            password=form_data.password,
        ),
        db=db,
    )

    # Create an access token
    user_access_token = await access_token.create(subject=user.email)

    # Set the access token as a cookie
    response.set_cookie(
        key="access_token",
        value=f"Bearer {user_access_token}",
        httponly=True,
    )

    return {"message": "Login successful"}
