import aiohttp
from .spirit_gpu import start, logger

base_url = "http://127.0.0.1:11434"


async def check_start_async():
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(base_url) as response:
                text = await response.text()
                logger.info(f"response.status: {response.status}, text: {text}")
                return True
    except Exception:
        return False


def concurrency_modifier(current_allowed_concurrency: int) -> int:
    """
    Adjusts the allowed concurrency level based on the current state.
    For example, if the current allowed concurrency is 3 and resources are sufficient,
    it can be increased to 5, allowing 5 tasks to run concurrently.
    """
    allowed_concurrency = 5
    return allowed_concurrency


start(
    {
        "mode": "proxy",
        "base_url": base_url,
        "check_start": check_start_async,
        "concurrency_modifier": concurrency_modifier,
    }
)
