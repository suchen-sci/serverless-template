import os
import logging
from typing import Any, Dict
from spirit_gpu import start, Env
import json
import base64
import tempfile
from cosyvoice.cli.cosyvoice import CosyVoice
from cosyvoice.utils.file_utils import load_wav
import torchaudio
import torch
import soundfile

cosyvoice = CosyVoice('/spirit/CosyVoice/pretrained_models/CosyVoice-300M')

logging.info(f"Received request with prompt: {cosyvoice.list_avaliable_spks()}")

def config_logging():
    console = logging.StreamHandler()
    console.setLevel(logging.DEBUG)
    logging.basicConfig(level=logging.INFO, 
                        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', 
                        datefmt='%Y-%m-%d %H:%M:%S', 
                        handlers=[console])
    
def load_base64_audio(base64_audio: str, sample_rate=16000):
    missing_padding = len(base64_audio) % 4
    if missing_padding:
        base64_audio += '=' * (4 - missing_padding)
        
    audio_data = base64.b64decode(base64_audio)
    
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as temp_wav:
        temp_wav.write(audio_data)
        temp_wav_path = temp_wav.name
    data, samplerate = soundfile.read(temp_wav_path)
    audio_tensor = load_wav(temp_wav_path, sample_rate)
    return audio_tensor

def audio_to_base64(audio_tensor, sample_rate=22050):
    with tempfile.NamedTemporaryFile(suffix=".wav") as temp_wav:
        torchaudio.save(temp_wav.name, audio_tensor, sample_rate)
        with open(temp_wav.name, "rb") as f:
            audio_base64 = base64.b64encode(f.read()).decode("utf-8")
    return audio_base64

def start_handler():
    config_logging()
    
    def handler(request: Dict[str, Any], _: Env):
        request_input = request.get("input", {})

        # 获取并解析 Base64 编码的音频和文本
        prompt = json.loads(request_input.get("prompt"))
        # 音频base64
        base64_audio = prompt.get("audio_base64")
        # 需生成文案语音
        output_text = prompt.get("output_text")
        # 原音频文案
        origin_audio_text = prompt.get("origin_audio_text")

        # 实例化ComfyUIClient
        
        logging.info(f"Received request with prompt: {prompt}")

        # 处理 Base64 编码音频，解码并加载
        audio_tensor = load_base64_audio(base64_audio)

        # 使用 CosyVoice 生成语音
        output_audio = []
        for i, j in enumerate(cosyvoice.inference_zero_shot(output_text, origin_audio_text, audio_tensor, stream=False)):
            output_audio.append(j['tts_speech'])

        # 将生成的语音片段合并为一个 Tensor
        final_audio = torch.cat(output_audio, dim=1)

        # 将生成的音频数据编码为 Base64
        output_audio_base64 = audio_to_base64(final_audio)

        # 构造响应
        response = {
            "data": {
                "audio_base64": output_audio_base64
            }
        }
        
        return json.dumps(response)

    return handler

# 启动应用程序
start({"handler": start_handler()})
