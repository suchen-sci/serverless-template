#!/bin/bash

echo "Container Started"

export PYTHONUNBUFFERED=1

vllm serve /workspace/vllm/phi-4-bnb-4bit --dtype bfloat16 --load_format bitsandbytes --quantization bitsandbytes --port 11434 &

exec python -u /workspace/vllm/src/main.py 

