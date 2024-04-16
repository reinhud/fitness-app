from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.core.settings.settings import get_settings

# Allow requests to the backend from these origins
origins = [
    f"http://{get_settings().networking.FRONTEND_HOST_URL}:{get_settings().networking.FRONTEND_HOST_PORT}",
    "http://localhost:3000",
    "http://localhost",
    "http://localhost:8000",
    "localhost:8000",
]


def add_cors_middleware(app: FastAPI) -> None:
    """Add middleware to FastAPI app.

    Parameters
    ----------
    app : FastAPI
        - The FastAPI app instance.

    Returns
    -------
    None
    """
    # Add middleware here
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        expose_headers="set-cookie",
        allow_methods=["*"],
        allow_headers=["*"],
    )
