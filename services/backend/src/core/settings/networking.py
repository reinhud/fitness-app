from pydantic_settings import BaseSettings


class NetworkingSettings(BaseSettings):
    """Settings related to the networking."""

    BACKEND_HOST_URL: str = "0.0.0.0"
    BACKEND_HOST_PORT: int = 8000
    FRONTEND_HOST_PORT: int = 3000
    FRONTEND_HOST_URL: str = "localhost"
    SMTP_PORT: int = 587
    SMTP_SERVER: str = "smtp.gmail.com"
