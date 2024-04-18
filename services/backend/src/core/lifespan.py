from contextlib import asynccontextmanager
from typing import AsyncIterator

from fastapi import FastAPI

from src.core.settings.settings import get_settings
from src.services.database.database_session_manager import database_session_manager


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Function that handles startup and shutdown events.

    To understand more, read https://fastapi.tiangolo.com/advanced/events/
    In this case, the startup event is used to initialize the database session manager
    and the shutdown event is used to close the database session manager
    after the application is done running.

    Parameters
    ----------
    app : FastAPI
        - The FastAPI application instance.

    Yields
    -------
    None
    """
    # Startup
    await database_session_manager.init(get_settings().database.DATABASE_URL)

    yield None

    # Shutdown
    await database_session_manager.close()
