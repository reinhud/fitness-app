from pydantic_settings import BaseSettings


class EmailSettings(BaseSettings):
    """Settings related to email."""

    SMTP_USERNAME: str
    SMTP_PASSWORD: str
