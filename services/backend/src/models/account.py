from datetime import datetime

from sqlmodel import Field, SQLModel


class AccountInDBBase(SQLModel):
    """Model for account in database.

    This model specifies the fields required to store.
    It uses ORM to reflect database entities.
    """

    id: int = Field(primary_key=True, default=None)
    username: str = Field(unique=True, max_length=15)
    # TODO: add email validation, EmailStr is no sqlalchemy type
    email: str = Field(unique=True, max_length=100)
    hashed_password: bytes
    createdAt: datetime = datetime.now()
    lastLoginAt: datetime = datetime.now()
    is_disabled: bool = False


class AccountInDB(AccountInDBBase, table=True):
    """Model for account in database.

    This model specifies the fields required to store.
    It uses ORM to reflect database entities.
    """

    pass


class TempAccountInDB(AccountInDBBase, table=True):
    """Model for temporary account in database.

    This is used for registration and password reset"""

    pass


class AccountLogin(SQLModel):
    """Model for account login.

    This model specifies the fields required to use
    OAuth2PasswordRequestForm for account login.
    """

    email: str
    password: str


class AccountRegistration(AccountLogin):
    """Model for account registration.

    This model specifies the fields required to register a account.
    """

    name: str
