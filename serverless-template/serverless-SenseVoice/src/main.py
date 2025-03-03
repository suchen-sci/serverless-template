import logging
from typing import Any, Dict
from spirit_gpu import start, Env
import json

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


def start_handler():
    config_logging()

    def handler(request: Dict[str, Any], _: Env):

        model_dir = "/workspace/FunAudioLLM/SenseVoiceSmall"
        logging.info(f"request: {request}")
        model = AutoModel(
            model=model_dir,
            vad_model="fsmn-vad",
            vad_kwargs={"max_single_segment_time": 30000},
            disable_update=True,
        )

        # en
        res = model.generate(
            input="./zh.mp3",
            cache={},
            language="auto",  # "zh", "en", "yue", "ja", "ko", "nospeech"
            use_itn=True,
            batch_size_s=60,
            merge_vad=True,
            merge_length_s=15,
        )
        text = rich_transcription_postprocess(res[0]["text"])
        logging.info(f"生成文案: {text}")

        # 构造响应
        response = {"data": {"audio_base64": text}}

        return json.dumps(response)

    return handler


# 启动应用程序
start({"handler": start_handler()})
