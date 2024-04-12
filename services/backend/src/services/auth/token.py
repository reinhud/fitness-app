from datetime import UTC, datetime, timedelta

from jose import jwt

from src.core.logging import logger
from src.core.settings.settings import get_settings


class Token:
    """A class to manage JWT tokens.

    Attributes
    ----------
    algorithm : str
        The algorithm to use for encoding and decoding the token.

    key : str
        The key to use for encoding and decoding the token.

    expires_delta : timedelta
        The expiration time delta for the token.
    """

    def __init__(self, algorithm: str, key: str, expires_delta: timedelta):
        self.algorithm = algorithm
        self.key = key
        self.expires_delta = expires_delta

    async def create(self, subject: str):
        """Create a JWT token with the provided data.

        Parameters
        ----------
        subject : str
            The content of the token.

        Returns
        -------
        str
            The encoded access token.
        """
        expire = datetime.now(UTC) + self.expires_delta
        try:
            to_encode = {"exp": expire, "nbf": datetime.now(), "sub": subject}
            encoded_jwt = jwt.encode(
                claims=to_encode,
                key=self.key,
                algorithm=self.algorithm,
            )
        except Exception as e:
            logger.error(f"Error encoding token: {e}")
            raise e
        return encoded_jwt

    async def get_subject(self, token: str):
        """Get the content of a JWT token.

        Parameters
        ----------
        token : str
            The encoded token.

        Returns
        -------
        dict
            The content of the token.
        """
        try:
            decoded_token = jwt.decode(
                token,
                key=self.key,
                algorithms=[self.algorithm],
            )
        except Exception as e:
            logger.error(f"Error decoding token: {e}")
            raise e
        token_subject = decoded_token.get("sub", None)
        if not token_subject:
            raise ValueError("No subject found in token")

        return token_subject


# ==============================================================================#
# Token instances to be used in the application.
# ==============================================================================#
access_token = Token(
    algorithm=get_settings().security.JWT_ALGORITHM,
    key=get_settings().security.JWT_ACCESS_KEY,
    expires_delta=timedelta(minutes=get_settings().security.ACCESS_KEY_EXPIRES_MINUTES),
)

reset_token = Token(
    algorithm=get_settings().security.JWT_ALGORITHM,
    key=get_settings().security.JWT_RESET_KEY,
    expires_delta=timedelta(minutes=get_settings().security.RESET_KEY_EXPIRES_MINUTES),
)
