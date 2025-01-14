from typing import Any, Dict
import aiohttp
from spirit_gpu import start, logger
from spirit_gpu.env import Env
from spirit_generated_model import RequestInput


def get_request_input(request: Dict[str, Any]) -> RequestInput:
    return RequestInput(**request["input"])


def handler(request: Dict[str, Any], env: Env):
    request_input = get_request_input(request)
    return handler_impl(request_input, request, env)


def concurrency_modifier(current_concurrency: int) -> int:
    """
    Allow 5 job to run concurrently.
    Be careful with this function.
    You should fully understand python GIL and related problems before setting this value bigger than 1.
    """
    return 1


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


# def handler_impl(request_input: RequestInput, request: Dict[str, Any], env: Env):
#     prompt = request_input.prompt

#     try:
#         generated_code = llm.generate(prompt, max_tokens=100)
#         logger.info(f"Generated code: {generated_code}")
#         return {"generated_code": generated_code}
#     except Exception as e:
#         logger.error(f"Error during inference: {e}")
#         return {"error": str(e)}


start(
    {
        "mode": "proxy",
        "base_url": base_url,
        "check_start": check_start_async,
    }
)
# start({"handler": handler, "concurrency_modifier": concurrency_modifier})
