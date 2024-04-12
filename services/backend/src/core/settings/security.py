import secrets
from pydantic_settings import BaseSettings


class SecuritySettings(BaseSettings):
    """Settings related to security."""

    JWT_ALGORITHM: str = "HS256"

    JWT_ACCESS_KEY: str = secrets.token_urlsafe(32)
    ACCESS_KEY_EXPIRES_MINUTES: int = 60 * 24 * 2  # 2 days
    JWT_RESET_KEY: str = secrets.token_urlsafe(32)
    RESET_KEY_EXPIRES_MINUTES: int = 60 * 12  # 1/2 day
