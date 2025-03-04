#!/bin/bash

echo "Container Started"
export PYTHONUNBUFFERED=1

# 激活虚拟环境
source /workspace/FunAudioLLM/venv/bin/activate


exec /workspace/FunAudioLLM/venv/bin/python -u /workspace/FunAudioLLM/src/main.py
