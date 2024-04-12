from pydantic_settings import BaseSettings
from sqlalchemy import make_url
from sqlalchemy.engine.url import URL as SQLAlchemyURL


class DatabaseSettings(BaseSettings):
    """Settings related to the database."""

    POSTGRES_DRIVER: str = "asyncpg"
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_HOST_URL: str = "fitness-app-postgres-dev"
    POSTGRES_HOST_PORT: int = 5432
    POSTGRES_DB: str = "development"

    @property
    def DATABASE_URL(self) -> SQLAlchemyURL:
        """Return the database URL."""
        return make_url(
            f"postgresql+{self.POSTGRES_DRIVER}://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@"
            f"{self.POSTGRES_HOST_URL}:{self.POSTGRES_HOST_PORT}/{self.POSTGRES_DB}"
        )

    @DATABASE_URL.setter
    def DATABASE_URL(self, value: SQLAlchemyURL) -> None:
        """Set the database URL."""
        self._database_url = value
