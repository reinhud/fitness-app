from typing import Annotated

from fastapi import (
    APIRouter,
    Depends,
    Form,
    HTTPException,
    Request,
    Response,
    status,
)
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordRequestForm

from src.core.logging import logger
from src.models import (
    AccountInDB,
    AccountRegistration,
    TempAccountInDB,
)
from src.services.auth.passwords import get_password_hash
from src.services.auth.token import access_token, reset_token
from src.services.database.database_session_manager import get_db_session
from src.services.domain.account import (
    authenticate_account,
    get_account_by_email,
    get_current_active_account,
    register_account,
    validate_account_registration,
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

    # Authenticate account
    try:
        account: AccountInDB = await authenticate_account(
            form_data.username, form_data.password, db
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect username or password",
        )

    # Create an access token with the email as the subject
    account_access_token = await access_token.create(subject=account.email)

    # Set the access token as a cookie
    response.set_cookie(
        key="access_token",
        value=f"Bearer {account_access_token}",
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
    name: Annotated[str, Form()],
    db=Depends(get_db_session),
):
    """
    Endpoint to register a new account.

    Parameters
    ----------
    *account_data* : AccountRegistrationModel: \\
        account registration data containing username and password.

    Returns
    -------
    *Token* \\
        Token object containing the access token and token type (status code 201).

    Raises
    ------
    *HTTPException* \\
        If the account already exists (status code 400).
    """
    # Create a new temporary account
    temp_account: TempAccountInDB = await register_account(
        AccountRegistration(
            email=form_data.username,
            password=form_data.password,
            name=name,
        ),
        db,
    )

    # Create an access token
    account_access_token = await access_token.create(subject=temp_account.email)

    # Send registration email
    await send_registration_email(temp_account, account_access_token)

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
    logger.info(f"Validating registration token: {token}")
    # Check if token is valid and get account
    new_account = await validate_account_registration(token, db)

    # Set the access token as a cookie
    account_access_token = await access_token.create(subject=new_account.email)

    response.set_cookie(
        key="access_token",
        value=f"Bearer {account_access_token}",
        httponly=True,
    )

    # Redirect to React frontend login page
    redirect_url = "http://localhost:3000/login"
    return RedirectResponse(redirect_url)


@auth_router.post(
    "/auth/request-forgot-password",
    name="Auth: Request Forgot Password",
    status_code=status.HTTP_200_OK,
)
async def request_forgot_password(
    requested_email: str,
    db=Depends(get_db_session),
):
    # Check if account exists
    account = await get_account_by_email(requested_email, db)
    if not account:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="account not found",
        )

    account_reset_token = await reset_token.create(subject=requested_email)

    # Send password reset email
    await send_password_reset_email(account, account_reset_token)

    return {"message": "Password reset email sent"}


@auth_router.get(
    "/auth/request-reset-password",
    name="Auth: Request Reset Password",
    status_code=status.HTTP_200_OK,
)
async def request_reset_password(
    current_active_account: Annotated[AccountInDB, Depends(get_current_active_account)],
):
    account_reset_token = await reset_token.create(subject=current_active_account.email)

    # Send password reset email
    await send_password_reset_email(current_active_account, account_reset_token)

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
    logger.info(f"Reset token verified for account: {username}")

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

    # Get account from db
    account = await get_account_by_email(username, db)
    if not account:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="account not found",
        )

    # Create account password
    new_hashed_password = await get_password_hash(new_password)

    # Update account
    account.hashed_password = new_hashed_password
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
