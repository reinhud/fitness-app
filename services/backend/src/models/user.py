from datetime import datetime

from sqlmodel import Field, SQLModel


class UserInDBBase(SQLModel):
    """Model for user in database.

    This model specifies the fields required to store.
    It uses ORM to reflect database entities.
    """

    id: int = Field(primary_key=True, default=None)
    hashed_password: str
    email: str
    first_name: str | None = None
    last_name: str | None = None
    phone_number: str | None = None
    createdAt: datetime = datetime.now()
    is_disabled: bool = False


class UserInDB(UserInDBBase, table=True):
    """Model for user in database.

    This model specifies the fields required to store.
    It uses ORM to reflect database entities.
    """

    pass


class TempUserInDB(UserInDBBase, table=True):
    """Model for temporary user in database.

    This is used for registration and password reset"""

    pass


class UserBase(SQLModel):
    username: str


class UserResponse(UserBase):
    """Model for user response.

    This model specifies the fields required to return a user.
    """


class UserLogin(UserBase):
    """Model for user login.

    This model specifies the fields required to use
    OAuth2PasswordRequestForm for user login.
    """

    password: str


class UserRegistration(UserLogin):
    """Model for user registration.

    This model specifies the fields required to register a user.
    """
