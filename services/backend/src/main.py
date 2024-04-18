import uvicorn
from fastapi import FastAPI, status

from src.api.router import app_router
from src.core.lifespan import lifespan
from src.core.middleware import add_cors_middleware
from src.core.settings.settings import get_settings


def init_app() -> FastAPI:
    """Return a set up FastAPI application.

    Returns
    -------
    FastAPI
        - A FastAPI application instance.
    """
    # Create FastAPI application
    app = FastAPI(lifespan=lifespan, **get_settings().fastapi.fastapi_kwargs)

    # Add middleware
    add_cors_middleware(app)

    # Add router
    app.include_router(app_router)

    return app


app = init_app()


@app.get(
    path="/",
    name="Healthcheck",
    summary="Check if backend is up and running",
    status_code=status.HTTP_200_OK,
)
async def healthcheck():
    """Healthcheck endpoint."""
    return {"message": "Up and running"}


if __name__ == "__main__":
    # Run the FastAPI application
    # This is the entry point for the application
    uvicorn.run(
        "main:app",
        host=get_settings().networking.BACKEND_HOST_URL,
        port=get_settings().networking.BACKEND_HOST_PORT,
        log_level=get_settings().environment.LOG_LEVEL,
        reload=True,
    )
