from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from models.address import Address


class Country(SQLModel, table=True):
    """Country model."""

    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(unique=True, max_length=100)
    code: str = Field(unique=True, max_length=10)

    addresses: list["Address"] = Relationship(back_populates="country")
