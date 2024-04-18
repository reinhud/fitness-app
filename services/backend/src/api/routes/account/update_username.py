from typing import Annotated

from fastapi import APIRouter, Depends, Form, status

from src.models import UserInDB
from src.services.database.database_session_manager import get_db_session
from src.services.domain.user.get_user import get_current_active_user
from src.services.domain.user.update_username import update_username

update_username_router = APIRouter()


@update_username_router.post(
    "/update-username",
    name="User: Update Password",
    status_code=status.HTTP_200_OK,
)
async def update_username_route(
    current_active_user: Annotated[UserInDB, Depends(get_current_active_user)],
    new_username: Annotated[str, Form()],
    db=Depends(get_db_session),
):
    await update_username(
        current_active_user,
        new_username,
        db,
    )

    return {"message": "Username update successfully"}
