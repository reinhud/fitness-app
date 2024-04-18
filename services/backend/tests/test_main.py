from httpx import ASGITransport, AsyncClient

from src.main import app


async def test_root():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"  # type: ignore
    ) as ac:
        response = await ac.get("/")
    assert response.status_code == 200
