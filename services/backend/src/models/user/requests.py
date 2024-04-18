from sqlmodel import SQLModel


class LoginRequest(SQLModel):
    """Model for account login.

    This model specifies the fields required to use
    OAuth2PasswordRequestForm for account login.
    """

    email: str
    password: str


class RegistrationRequest(LoginRequest):
    """Model for account registration.

    This model specifies the fields required to register a account.
    """

    username: str


class EmailResetRequest(SQLModel):
    """Model for account email reset.

    This model specifies the fields required to reset a account email.
    """

    new_email: str
    confirm_email: str


class PasswordResetRequest(SQLModel):
    """Model for account password reset.

    This model specifies the fields required to reset a account password.
    """

    current_password: str
    new_password: str
    confirm_password: str


class ForgotPasswordRequest(SQLModel):
    """Model for account forgot password.

    This model specifies the fields required to reset a account password.
    """

    email: str
    verify_email: str


class ForgotPasswordResetRequest(SQLModel):
    """Model for account forgot password.

    This model specifies the fields required to reset a account password.
    """

    new_password: str
    confirm_password: str
