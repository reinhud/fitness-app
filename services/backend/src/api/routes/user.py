'''from fastapi import APIRouter, Depends, status
from typing import Annotated
from src.models import UserInDB, UserBase
from services.domain.account import get_current_active_user

user_router = APIRouter()


@user_router.get(
    "/users/me/",
    name="Users: Me",
    status_code=status.HTTP_200_OK,
    response_model=UserBase,
)
async def read_users_me(
    current_user: Annotated[UserInDB, Depends(get_current_active_user)]
):
    """
    Get the current user.

    Parameters
    ----------
    *current_user* : Annotated[UserModel, Depends(get_current_active_user)] \\
        - Current user data that is received from the get_current_active_user function automatically.

    Returns
    -------
    *UserModel* \\
        - Current user data (status code 200).

    """
    return UserBase(username=current_user.email)'''
