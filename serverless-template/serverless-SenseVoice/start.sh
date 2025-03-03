#!/bin/bash

echo "Container Started"
export PYTHONUNBUFFERED=1

# 激活虚拟环境
source /workspace/FunAudioLLM/venv/bin/activate

# 启动 CosyVoice serverless 的入口脚本
exec /workspace/FunAudioLLM/venv/bin/python -u /workspace/FunAudioLLM/src/main.py
