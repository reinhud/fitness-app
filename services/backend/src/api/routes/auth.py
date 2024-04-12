from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from fastapi.security import OAuth2PasswordRequestForm

from src.core.logging import logger
from src.services.auth.passwords import get_password_hash

from src.models import TempUserInDB, UserInDB, UserRegistration
from src.services.auth.token import access_token, reset_token

from src.services.database.database_session_manager import get_db_session
from src.services.domain.user import (
    authenticate_user,
    get_current_active_user,
    get_user_by_email,
    register_user,
    validate_user_registration,
)
from src.services.email.templates.password_reset.password_reset import (
    send_password_reset_email,
)
from src.services.email.templates.registration.registration import (
    send_registration_email,
)

auth_router = APIRouter()


@auth_router.post(
    "/auth/login",
    name="Auth: Token",
    status_code=status.HTTP_200_OK,
)
async def login_for_access_token(
    response: Response,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db=Depends(get_db_session),
):
    """
    Endpoint to obtain an access token for authentication.

    Parameters
    ----------
    *form_data* : Annotated[OAuth2PasswordRequestForm, Depends()] \\
        - OAuth2 password request form containing username and password.

    Returns
    -------
   *Token* \\
        - Token object containing the access token and token type (status code 200).

    Raises
    ------
    *HTTPException* \\
        - If the provided username or password is incorrect.
    """

    # Authenticate user
    try:
        user: UserInDB = await authenticate_user(
            form_data.username, form_data.password, db
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect username or password",
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


@auth_router.post(
    "/auth/register",
    name="Auth: Register",
    status_code=status.HTTP_201_CREATED,
)
async def register(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db=Depends(get_db_session),
):
    """
    Endpoint to register a new user.

    Parameters
    ----------
    *user_data* : UserRegistrationModel: \\
        User registration data containing username and password.

    Returns
    -------
    *Token* \\
        Token object containing the access token and token type (status code 201).

    Raises
    ------
    *HTTPException* \\
        If the user already exists (status code 400).
    """
    # Create a new temporary user
    temp_user: TempUserInDB = await register_user(
        UserRegistration(
            username=form_data.username,
            password=form_data.password,
        ),
        db,
    )

    # Create an access token
    user_access_token = await access_token.create(subject=temp_user.email)

    # Send registration email
    await send_registration_email(temp_user, user_access_token)

    return {"message": "Registration email sent"}


@auth_router.get(
    "/auth/validate-registration",
    name="Auth: Validate Registration",
    status_code=status.HTTP_200_OK,
)
async def validate_registration(
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


@auth_router.post(
    "/auth/request-forgot-password",
    name="Auth: Request Forgot Password",
    status_code=status.HTTP_200_OK,
)
async def request_forgot_password(
    requested_email: str,
    db=Depends(get_db_session),
):
    # Check if user exists
    user = await get_user_by_email(requested_email, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not found",
        )

    user_reset_token = await reset_token.create(subject=requested_email)

    # Send password reset email
    await send_password_reset_email(user, user_reset_token)

    return {"message": "Password reset email sent"}


@auth_router.get(
    "/auth/request-reset-password",
    name="Auth: Request Reset Password",
    status_code=status.HTTP_200_OK,
)
async def request_reset_password(
    current_active_user: Annotated[UserInDB, Depends(get_current_active_user)],
):
    user_reset_token = await reset_token.create(subject=current_active_user.email)

    # Send password reset email
    await send_password_reset_email(current_active_user, user_reset_token)

    return {"message": "Password reset email sent"}


@auth_router.get(
    "/auth/verify-reset-password",
    name="Auth: Verify Reset Password",
    status_code=status.HTTP_200_OK,
)
async def verify_reset_password(
    response: Response,
    token: str,
):
    # Extract username from token and verify
    username = await reset_token.get_subject(token)
    logger.info(f"Reset token verified for user: {username}")

    # Set the access token as a cookie
    response.set_cookie(
        key="reset_token",
        value=f"Bearer {token}",
        httponly=True,
    )

    return {"message": "Token verified"}


@auth_router.post(
    "/auth/reset-password",
    name="Auth: Reset Password",
    status_code=status.HTTP_200_OK,
)
async def reset_password(
    request: Request,
    response: Response,
    new_password: str,
    db=Depends(get_db_session),
):
    # Get token from cookie
    token = request.cookies.get("reset_token")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Reset token not found",
        )

    # Validate token and get username
    username = await reset_token.get_subject(token)

    # Delete cookie
    response.delete_cookie(key="reset_token")

    # Get user from db
    user = await get_user_by_email(username, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not found",
        )

    # Create user password
    new_hashed_password = await get_password_hash(new_password)

    # Update user
    user.hashed_password = new_hashed_password
    await db.commit()

    return {"message": "Password updated"}


@auth_router.post(
    "/auth/logout",
    name="Auth: Logout",
    status_code=status.HTTP_200_OK,
)
async def logout(response: Response):
    """
    Endpoint to remove the access token cookie.

    Parameters
    ----------
    *response* : Response \\
        - The response object.

    Returns
    -------
    *None* \\
        - No content (status code 200).
    """
    # Remove the access token cookie
    response.delete_cookie(key="access_token")

    return None
