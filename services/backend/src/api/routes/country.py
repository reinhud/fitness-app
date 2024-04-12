from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from src.models.country import Country
from src.services.database.database_session_manager import get_db_session

router = APIRouter()


@router.get(
    path="/country",
    name="Get all countries",
    tags=["Country"],
    response_model=List[Country],
    status_code=status.HTTP_200_OK,
)
async def get_countries(session: AsyncSession = Depends(get_db_session)):
    """Get all countries."""
    stmt = select(Country)
    result = await session.execute(stmt)

    return result.scalars().all()


@router.get(
    path="/country/{country_id}",
    name="Get country by id",
    tags=["Country"],
    response_model=Country,
    status_code=status.HTTP_200_OK,
)
async def get_country_by_id(
    country_id: int, session: AsyncSession = Depends(get_db_session)
):
    """Get country by id."""
    stmt = select(Country).where(Country.id == country_id)
    result = await session.execute(stmt)

    return result.scalars().first()


@router.post(
    path="/country",
    name="Create country",
    tags=["Country"],
    response_model=Country,
    status_code=status.HTTP_201_CREATED,
)
async def create_country(
    country: Country, session: AsyncSession = Depends(get_db_session)
):
    """Create country."""
    session.add(country)
    await session.commit()

    return country
