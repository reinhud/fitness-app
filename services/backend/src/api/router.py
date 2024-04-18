from fastapi import APIRouter

from src.api.routes.account.me import me_router
from src.api.routes.account.reset_email import reset_email_router
from src.api.routes.account.reset_password import reset_password_router
from src.api.routes.account.update_username import update_username_router
from src.api.routes.auth.login import login_router
from src.api.routes.auth.logout import logout_router
from src.api.routes.auth.register import register_router

app_router = APIRouter()

# ==================================== Auth ===================================#
app_router.include_router(login_router, prefix="/auth", tags=["auth"])
app_router.include_router(register_router, prefix="/auth", tags=["auth"])
app_router.include_router(logout_router, prefix="/auth", tags=["auth"])

# ================================== User ==================================#
app_router.include_router(reset_password_router, prefix="/users", tags=["users"])
app_router.include_router(me_router, prefix="/users", tags=["users"])
app_router.include_router(update_username_router, prefix="/users", tags=["users"])
app_router.include_router(reset_email_router, prefix="/users", tags=["users"])
