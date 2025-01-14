import aiohttp
from spirit_gpu import start, logger

base_url = "http://localhost:11434"

async def check_start_async():
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(base_url) as response:
                text = await response.text()
                logger.info(f"response.status: {response.status}, text: {text}")
                return True
    except Exception:
        return False

start(
    {
        "mode": "proxy",
        "base_url": base_url,
        "check_start": check_start_async,
    }
)
