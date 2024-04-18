from datetime import datetime

from sqlmodel import Field, SQLModel


class UserInDBBase(SQLModel):
    """Model for user in database.

    This model specifies the fields required to store.
    It uses ORM to reflect database entities.
    """

    id: int = Field(primary_key=True, default=None)
    username: str = Field(max_length=15)
    # TODO: add email validation, EmailStr is no sqlalchemy type
    email: str = Field(unique=True, max_length=100)
    hashed_password: bytes
    createdAt: datetime = datetime.now()
    lastLoginAt: datetime = datetime.now()
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
