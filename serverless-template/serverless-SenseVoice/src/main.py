import logging
from typing import Any, Dict
from spirit_gpu import start, Env
import json
import base64
import os
import uuid
from pathlib import Path
import edge_tts
import asyncio

from funasr import AutoModel
from funasr.utils.postprocess_utils import rich_transcription_postprocess


def config_logging():
    console = logging.StreamHandler()
    console.setLevel(logging.DEBUG)
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        handlers=[console],
    )


async def text_to_base64_audio(text: str) -> str:
    """
    将文本转换为音频并返回Base64编码的音频数据。
    """
    # 创建Communicate对象
    communicate = edge_tts.Communicate(text=text, voice="zh-CN-XiaoxiaoNeural")

    # 生成临时音频文件
    temp_dir = "/workspace/FunAudioLLM/temp_audio"
    Path(temp_dir).mkdir(parents=True, exist_ok=True)
    unique_filename = f"{uuid.uuid4()}.mp3"
    file_path = os.path.join(temp_dir, unique_filename)

    # 保存音频文件
    await communicate.save(file_path)

    # 读取音频文件并转换为Base64
    with open(file_path, "rb") as f:
        audio_data = f.read()
    base64_audio = base64.b64encode(audio_data).decode("utf-8")

    # 删除临时文件
    os.remove(file_path)

    # 添加前缀，使其可直接用于<audio>标签
    return f"data:audio/mp3;base64,{base64_audio}"


def save_base64_audio(base64_audio: str, temp_dir: str) -> str:
    """
    将 base64 音频数据解码并保存到临时目录，返回文件路径。
    """
    # 确保临时目录存在
    Path(temp_dir).mkdir(parents=True, exist_ok=True)

    # 生成唯一文件名
    unique_filename = f"{uuid.uuid4()}.wav"
    file_path = os.path.join(temp_dir, unique_filename)

    # 解码 base64 数据并写入文件
    audio_data = base64.b64decode(base64_audio)
    with open(file_path, "wb") as f:
        f.write(audio_data)

    return file_path


def generate_audio_handler(base64_audio: str) -> str:
    """
    处理语音转文本请求。
    """
    if not base64_audio:
        logging.error("No base64 audio file provided in the request.")
        return json.dumps({"error": "No base64 audio file provided."})

    # 保存 base64 音频到临时目录
    temp_dir = "/workspace/FunAudioLLM/temp_audio"
    audio_file_path = save_base64_audio(base64_audio, temp_dir)
    logging.info(f"Audio file saved to: {audio_file_path}")

    model_dir = "/workspace/FunAudioLLM/SenseVoiceSmall"
    model = AutoModel(
        model=model_dir,
        vad_model="fsmn-vad",
        vad_kwargs={"max_single_segment_time": 30000},
        disable_update=True,
    )

    # 生成文本
    res = model.generate(
        input=audio_file_path,
        cache={},
        language="auto",  # "zh", "en", "yue", "ja", "ko", "nospeech"
        use_itn=True,
        batch_size_s=60,
        merge_vad=True,
        merge_length_s=15,
    )
    text = rich_transcription_postprocess(res[0]["text"])
    os.remove(audio_file_path)

    return text


def start_handler():
    config_logging()

    async def handler(request: Dict[str, Any], _: Env):
        request_input = request.get("input", {})
        file = request_input.get("file")
        type = request_input.get("type")

        # 根据 type 调用不同的处理函数
        if type == "speech2text":
            data = generate_audio_handler(file)
        else:
            data = await text_to_base64_audio(file)
        # 构造响应
        response = {"data": data}
        return response

    return handler


# 启动应用程序
start({"handler": start_handler()})
