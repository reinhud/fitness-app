from functools import lru_cache


from pydantic import BaseModel

from src.core.settings.environment import EnvironmentSettings
from src.core.settings.security import SecuritySettings
from src.core.settings.networking import NetworkingSettings
from src.core.settings.database import DatabaseSettings
from src.core.settings.fastapi import FastAPISettings
from src.core.settings.email import EmailSettings


class Settings(BaseModel):
    """Application settings.

    Grouping all settings classes into one class.
    This will be used to access all settings in the application.
    """

    environment: EnvironmentSettings = EnvironmentSettings()
    security: SecuritySettings = SecuritySettings()
    networking: NetworkingSettings = NetworkingSettings()
    database: DatabaseSettings = DatabaseSettings()  # type: ignore
    fastapi: FastAPISettings = FastAPISettings()
    email: EmailSettings = EmailSettings()  # type: ignore


@lru_cache
def get_settings() -> Settings:
    """Return the application settings."""
    return Settings()
