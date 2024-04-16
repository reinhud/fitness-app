from typing import Annotated

from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from src.core.logging import logger
from src.models import AccountInDB, AccountRegistration, TempAccountInDB
from src.services.auth.bearer_token_with_cookies import oauth2_scheme
from src.services.auth.passwords import get_password_hash, verify_password
from src.services.auth.token import access_token
from src.services.database.database_session_manager import get_db_session


async def get_account_by_email(
    account_email: str, db: AsyncSession
) -> AccountInDB | None:
    logger.info(f"Getting account by email: '{account_email}'")
    stmt = select(AccountInDB).where(AccountInDB.email == account_email)
    logger.info(f"Statement: {stmt}")
    result = await db.execute(stmt)
    account = result.scalars().first()
    if not account:
        return None
    return account


async def get_temp_account_by_email(
    account_email: str, db: AsyncSession
) -> TempAccountInDB | None:
    logger.info(f"Getting temp account by email: '{account_email}'")
    stmt = select(TempAccountInDB).where(TempAccountInDB.email == account_email)
    result = await db.execute(stmt)
    account = result.scalars().first()
    if not account:
        return None
    return account


async def register_account(
    new_account: AccountRegistration, db: AsyncSession
) -> TempAccountInDB:
    logger.info(f"Account registration attempt: '{new_account.name}'")
    # Check for existing account
    account = await get_account_by_email(new_account.email, db)
    temp_account = await get_temp_account_by_email(new_account.email, db)
    if account or temp_account:
        raise HTTPException(
            status_code=400, detail="Account with this email already exists."
        )
    logger.info(f"Creating new account: '{new_account.name}'")
    # Create new temp account
    new_hashed_password = await get_password_hash(new_account.password)
    temp_account = TempAccountInDB(
        username=new_account.name,
        email=new_account.email,
        hashed_password=new_hashed_password,
    )

    try:
        db.add(temp_account)
        await db.commit()
    except Exception:
        logger.error(f"Error registering account: '{new_account.name}'")
        raise HTTPException(status_code=400, detail="Error registering account.")
    return temp_account


async def validate_account_registration(
    account_access_token: str, db: AsyncSession
) -> AccountInDB:
    logger.info(f"Validating account registration: '{account_access_token}'")
    username = await access_token.get_subject(account_access_token)
    temp_account = await get_temp_account_by_email(username, db)
    if not temp_account:
        raise HTTPException(status_code=400, detail="Account not found.")
    new_account = AccountInDB(
        username=temp_account.username,
        email=temp_account.email,
        hashed_password=temp_account.hashed_password,
    )

    try:
        await db.delete(temp_account)
        db.add(new_account)
        await db.commit()
    except Exception:
        logger.error(f"Error validating account: '{username}'")
        raise HTTPException(status_code=400, detail="Error validating account.")
    return new_account


async def get_current_account(
    token: Annotated[str, Depends(oauth2_scheme)],
    db: AsyncSession = Depends(get_db_session),
) -> AccountInDB:
    accountname = await access_token.get_subject(token)
    account: AccountInDB | None = await get_account_by_email(accountname, db)
    if not account:
        raise HTTPException(status_code=400, detail="Account not found.")
    return account


async def get_current_active_account(
    current_account: Annotated[AccountInDB, Depends(get_current_account)],
) -> AccountInDB:
    if current_account.is_disabled:
        raise HTTPException(status_code=400, detail="Account disabled.")
    return current_account


async def authenticate_account(
    username: str, password: str, db: AsyncSession
) -> AccountInDB:
    """
    Authenticate a user with the provided username and password.

    Parameters
    ----------
    username : str
        Username of the user.
    password : str
        Password entered by the user.

    Returns
    -------
    AccountInDBModel | bool
        Account data if authenticated, False otherwise.
    """
    logger.info(f"Account login attempt: '{username}'")

    # Retrieve user data from the database based on the provided username
    account = await get_account_by_email(username, db)

    if not account or account.is_disabled:
        raise HTTPException(status_code=400, detail="Inactive account")

    # Verify the password provided against the hashed password stored in the database
    account_verified = await verify_password(
        plain_password=password, hashed_password=account.hashed_password
    )
    if not account_verified:
        logger.error(f"Invalid password for account: '{username}'")
        raise HTTPException(status_code=400, detail="Invalid password")

    return account
