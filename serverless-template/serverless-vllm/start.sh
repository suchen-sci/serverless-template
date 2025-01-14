#!/bin/bash

echo "Container Started"
export PYTHONUNBUFFERED=1

source /workspace/vllm/venv/bin/activate

vllm serve /workspace/vllm/phi-4-bnb-4bit --dtype bfloat16 --load_format bitsandbytes --quantization bitsandbytes --port 11434 &

/workspace/vllm/venv/bin/python -u /workspace/vllm/src/main.py &

exec sleep infinity
