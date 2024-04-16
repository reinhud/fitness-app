from fastapi import APIRouter

from src.api.routes.auth import auth_router

# from api.routes.user import user_router

app_router = APIRouter()

app_router.include_router(auth_router)
# app_router.include_router(user_router)
