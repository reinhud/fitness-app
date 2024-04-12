"""
Data structures, used in project.

Add your new models here so Alembic could pick them up.

You may do changes in tables, then execute
`alembic revision --message="Your text" --autogenerate`
and alembic would generate new migration for you
in alembic/versions folder.
"""

from sqlmodel import SQLModel


from .country import Country
from .address import Address

from .user import (
    UserInDB,
    UserBase,
    UserLogin,
    UserRegistration,
    UserResponse,
    TempUserInDB,
)

__all__ = [
    "SQLModel",
    "Address",
    "Country",
    "UserInDB",
    "UserBase",
    "UserLogin",
    "UserRegistration",
    "UserResponse",
    "TempUserInDB",
]
