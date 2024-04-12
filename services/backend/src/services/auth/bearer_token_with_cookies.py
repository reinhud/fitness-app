from typing import Dict, Optional

from fastapi import HTTPException, Request, status
from fastapi.openapi.models import OAuthFlowPassword, OAuthFlows
from fastapi.security import OAuth2
from fastapi.security.utils import get_authorization_scheme_param


class OAuth2PasswordBearerWithCookie(OAuth2):
    """
    Class for validating and retrieving access tokens from HTTP-only cookies.

    Attributes
    ----------
    tokenUrl : str
        The URL where the client should send the username and password for verification.
    scheme_name : Optional[str], optional
        The name of the scheme.
    scopes : Optional[Dict[str, str]], optional
        Optional scopes.
    auto_error : bool, optional
        If True, automatically raise HTTPException on error.
    """

    def __init__(
        self,
        tokenUrl: str,
        scheme_name: Optional[str] = None,
        scopes: Optional[Dict[str, str]] = None,
        auto_error: bool = True,
    ) -> None:
        if not scopes:
            scopes = {}
        flows = OAuthFlows(password=OAuthFlowPassword(tokenUrl=tokenUrl, scopes=scopes))
        super().__init__(flows=flows, scheme_name=scheme_name, auto_error=auto_error)

    async def __call__(self, request: Request) -> str | None:
        """
        Validate and retrieve the access token from the HTTP-only cookie.

        Parameters
        ----------
        request : Request
            The incoming request.

        Returns
        -------
        Optional[str]
            The access token if present in the cookie, else None.

        Raises
        ------
        HTTPException
            If not authenticated.
        """
        # Accept access token from HTTP-only Cookie
        authorization_header_value: str | None = request.cookies.get(
            "access_token", None
        )

        # Get the scheme and parameter from the authorization header
        scheme, param = get_authorization_scheme_param(authorization_header_value)

        # Check if the scheme is "Bearer"
        if not authorization_header_value or scheme.lower() != "bearer":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not authenticated",
                headers={"WWW-Authenticate": "Bearer"},
            )

        return param


oauth2_scheme = OAuth2PasswordBearerWithCookie(tokenUrl="auth/login")
