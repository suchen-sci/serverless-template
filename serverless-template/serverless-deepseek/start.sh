#!/bin/bash

echo "Container Started"

export PYTHONUNBUFFERED=1

# 启动 vLLM 服务
vllm serve /workspace/deepseek/DeepSeek-R1-Distill-Qwen-32B-FP8-Dynamic \
    --dtype bfloat16 \
    --port 11434 \
    --max-model-len 6144 \
    --gpu-memory-utilization 0.95 \
    --pipeline-parallel-size 2 \
    --max-num-batched-tokens 6144 \
    --max-num-seqs 32 &


# 启动主程序
exec python -u /workspace/deepseek/src/main.py
