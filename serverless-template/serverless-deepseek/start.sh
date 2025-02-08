#!/bin/bash

echo "Container Started"

export PYTHONUNBUFFERED=1

# 启动 vLLM 服务
vllm serve /workspace/deepseek/DeepSeek-R1-Distill-Qwen-32B-bnb-4bit \
    --dtype half \
    --load-format bitsandbytes \
    --quantization bitsandbytes \
    --port 11434 \
    --max-model-len 8192 \
    --gpu-memory-utilization 0.9 \
    --pipeline-parallel-size 2 \
    --max-num-batched-tokens 8192 \
    --max-num-seqs 32 &


# 启动主程序
exec python -u /workspace/deepseek/src/main.py