from typing import Annotated

from fastapi import APIRouter, Depends, status

from src.models import UserInDB
from src.services.domain.user.get_user import get_current_active_user

me_router = APIRouter()


@me_router.get(
    "/me",
    name="User: Me",
    status_code=status.HTTP_200_OK,
    response_model=UserInDB,
)
async def read_user_route(
    current_user: Annotated[UserInDB, Depends(get_current_active_user)],
):
    """
    Get the current user.

    Parameters
    ----------
    *current_user* : Annotated[UserInDB, Depends(get_current_active_user)] \\
        - Current user data that is received from the get_current_active_user function automatically.

    Returns
    -------
    *UserInDB* \\
        - Current user data (status code 200).

    """
    return current_user
