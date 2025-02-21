#!/bin/bash

echo "Container Started"

export PYTHONUNBUFFERED=1


/relauncher.sh &

# 启动主程序
exec python -u /workspace/deepseek/src/main.py
