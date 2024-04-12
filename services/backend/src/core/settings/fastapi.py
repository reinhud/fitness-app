from typing import Any, Dict
from pydantic_settings import BaseSettings


class FastAPISettings(BaseSettings):
    """Settings related to FastAPI."""

    DOC_URL: str = "/docs"
    OPENAPI_URL: str = "/openapi.json"
    ROOT_PATH: str = ""
    OPENAPI_TAGS: Dict[str, str] = {"tag1": "Tag 1", "tag2": "Tag 2"}
    REDOC_URL: str = "/redoc"
    TITLE: str = "FastAPI App"
    VERSION: str = "0.1.0"
    DESCRIPTION: str = """
    Fitness App Backend.

    Add description here.
    """

    @property
    def fastapi_kwargs(self) -> Dict[str, Any]:
        """Return FastAPI kwargs."""
        return {
            "docs_url": self.DOC_URL,
            "root_path": self.ROOT_PATH,
            "openapi_url": self.OPENAPI_URL,
            "redoc_url": self.REDOC_URL,
            "title": self.TITLE,
            "version": self.VERSION,
            "description": self.DESCRIPTION,
        }
