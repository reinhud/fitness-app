from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hashed password.

    Parameters
    ----------
    plain_password : str
        The plain password.

    hashed_password : str
        The hashed password.

    Returns
    -------
    bool
        True if the password matches the hash, False otherwise.
    """
    return pwd_context.verify(plain_password, hashed_password)


async def get_password_hash(plain_password: str) -> str:
    """Hash a password.

    Parameters
    ----------
    plain_password : str
        The password to hash.

    Returns
    -------
    str
        The hashed password.
    """
    return pwd_context.hash(plain_password)
