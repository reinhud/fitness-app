from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from src.models.country import Country


class Address(SQLModel, table=True):
    """Address model."""

    id: int | None = Field(default=None, primary_key=True)
    country_id: int = Field(foreign_key="country.id")
    unit_number: str | None = None
    street_number: str | None = None
    address_line_1: str | None = None
    address_line_2: str | None = None
    city: str | None = None
    state: str | None = None
    region: str | None = None
    postal_code: str | None = None

    country: "Country" = Relationship(back_populates="addresses")
