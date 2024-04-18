import bcrypt

from src.core.logging import logger


async def verify_password(plain_password: str, hashed_password: bytes) -> bool:
    try:
        password_byte_enc = plain_password.encode("utf-8")
        password_correct = bcrypt.checkpw(
            password=password_byte_enc, hashed_password=hashed_password
        )
        return password_correct
    except Exception as e:
        logger.error(f"Error verifying password: {e}")
        return False


async def get_password_hash(plain_password: str) -> bytes:
    try:
        pwd_bytes = plain_password.encode("utf-8")
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password=pwd_bytes, salt=salt)
        return hashed_password
    except Exception as e:
        logger.error(f"Error hashing password: {e}")
        raise e
