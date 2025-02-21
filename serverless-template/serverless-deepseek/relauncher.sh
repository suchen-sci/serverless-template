#!/bin/bash

export PYTHONUNBUFFERED=1

GPU_COUNT=$(nvidia-smi -L | wc -l)

MAX_MODEL_LEN=${SERVERLESS_MAX_MODE_LEN:-6144}
MAX_NUM_BATCHED_TOKENS=${SERVERLESS_MAX_NUM_BATCHED_TOKENS:-6144}

# Set the pipeline parallel size to the number of GPUs
PIPELINE_PARALLEL_SIZE=${GPU_COUNT:-2}

echo "MAX_MODEL_LEN: is ${MAX_MODEL_LEN}, MAX_NUM_BATCHED_TOKENS: is ${MAX_NUM_BATCHED_TOKENS}, and PIPELINE_PARALLEL_SIZE: is ${PIPELINE_PARALLEL_SIZE}"


n=0
while true; do
    echo "Relauncher: Launching..."
    if [ $n -gt 0 ]; then
        echo -e "\tRelaunch count: $n"
    fi

    # 启动 vLLM 服务
    LAUNCH_CMD="vllm serve /workspace/deepseek/DeepSeek-R1-Distill-Qwen-32B-FP8-Dynamic --dtype bfloat16 --port 11434 --max-model-len ${MAX_MODEL_LEN} --gpu-memory-utilization 0.95 --pipeline-parallel-size ${PIPELINE_PARALLEL_SIZE} --max-num-batched-tokens ${MAX_NUM_BATCHED_TOKENS} --max-num-seqs 32"

    echo "Starting with command: $LAUNCH_CMD"
    eval $LAUNCH_CMD

    echo "Relauncher: Process is ending. Relaunching in 2s..."
    n=$((n+1))
    rm -rf /tmp/*
    sleep 1
done
