import bcrypt

from src.core.logging import logger


async def verify_password(plain_password: str, hashed_password: bytes) -> bool:
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
    try:
        password_byte_enc = plain_password.encode("utf-8")
        password_correct = bcrypt.checkpw(
            password=password_byte_enc, hashed_password=hashed_password
        )
        logger.info(f"Password correct: {password_correct}")
        return password_correct
    except Exception as e:
        logger.error(f"Error verifying password: {e}")
        return False


async def get_password_hash(plain_password: str) -> bytes:
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
    pwd_bytes = plain_password.encode("utf-8")
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password=pwd_bytes, salt=salt)
    return hashed_password
