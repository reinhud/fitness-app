from fastapi import APIRouter, Response, status
from fastapi.responses import RedirectResponse

from src.core.settings.settings import get_settings

logout_router = APIRouter()


@logout_router.post(
    "/logout",
    name="Auth: Logout",
    status_code=status.HTTP_200_OK,
)
async def logout(response: Response):
    # Remove the access token cookie
    response.delete_cookie(key="access_token")

    # Redirect to React frontend login page
    redirect_url = get_settings().networking.FRONTENT_URL
    return RedirectResponse(redirect_url)
