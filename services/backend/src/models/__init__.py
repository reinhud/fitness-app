"""
Data structures, used in project.

Add your new models here so Alembic could pick them up.

You may do changes in tables, then execute
`alembic revision --message="Your text" --autogenerate`
and alembic would generate new migration for you
in alembic/versions folder.
"""

from sqlmodel import SQLModel

from .user.domain import TempUserInDB, UserInDB
from .user.requests import (
    EmailResetRequest,
    ForgotPasswordRequest,
    ForgotPasswordResetRequest,
    LoginRequest,
    PasswordResetRequest,
    RegistrationRequest,
)

__all__ = [
    "SQLModel",
    "UserInDB",
    "TempUserInDB",
    "EmailResetRequest",
    "ForgotPasswordRequest",
    "ForgotPasswordResetRequest",
    "LoginRequest",
    "PasswordResetRequest",
    "RegistrationRequest",
]
