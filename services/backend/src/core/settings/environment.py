from typing import Literal
from pydantic_settings import BaseSettings


LOG_LEVEL = Literal["debug", "info"]
ENVIRONMENTS = Literal["development", "staging", "production"]


class EnvironmentSettings(BaseSettings):
    """Settings related to the environment."""

    ENVIRONMENT: ENVIRONMENTS = "development"

    @property
    def ECHO_SQL(self) -> bool:
        """Return whether SQL queries should be echoed."""
        return self.ENVIRONMENT == "development"

    @property
    def LOG_LEVEL(self) -> LOG_LEVEL:
        """Return log level based on environment."""
        return "debug" if self.ENVIRONMENT == "development" else "info"

    @property
    def PROTOCOL(self) -> str:
        return "https" if self.ENVIRONMENT == "production" else "http"
