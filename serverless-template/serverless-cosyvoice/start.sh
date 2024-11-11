#!/bin/bash

echo "Container Started"
export PYTHONUNBUFFERED=1

# 激活虚拟环境
source /spirit/CosyVoice/venv/bin/activate

# 设置 Python 路径以包含 Matcha-TTS 库
#export PYTHONPATH=third_party/Matcha-TTS
# export PYTHONPATH=/spirit/CosyVoice:${PYTHONPATH}
# 设置 Python 路径以包含 CosyVoice 和 serverless 代码库
export PYTHONPATH=/spirit/CosyVoice:/spirit/CosyVoice_serverless:/spirit/CosyVoice/third_party/Matcha-TTS

# 设置 Python 路径以包含 serverless 的代码
#export PYTHONPATH=/spirit/CosyVoice_serverless

# 启动 CosyVoice serverless 的入口脚本
exec /spirit/CosyVoice/venv/bin/python -u /spirit/CosyVoice_serverless/main.py
