from fastapi import APIRouter

from src.api.routes.country import router as country_router
from src.api.routes.auth import auth_router
from src.api.routes.user import user_router

app_router = APIRouter()

app_router.include_router(country_router)
app_router.include_router(auth_router)
app_router.include_router(user_router)
