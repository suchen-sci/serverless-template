ARG BASE_URL
FROM nicolaka/netshoot AS model-builder

RUN curl -L  https://github.com/git-lfs/git-lfs/releases/download/v3.2.0/git-lfs-linux-amd64-v3.2.0.tar.gz \
    -o /root/git-lfs-linux-amd64-v3.2.0.tar.gz && cd /root/ && \
    tar -xzf git-lfs-linux-amd64-v3.2.0.tar.gz && cd /root/git-lfs-3.2.0 && \
    ./install.sh && rm -f /root/git-lfs-linux-amd64-v3.2.0.tar.gz

RUN pip install --break-system-packages -U huggingface_hub[cli]

RUN mkdir -p /root/models_cache/DeepSeek-R1-Distill-Qwen-32B-FP8-Dynamic && \
    cd /root/models_cache/DeepSeek-R1-Distill-Qwen-32B-FP8-Dynamic && \
    huggingface-cli download getfit/DeepSeek-R1-Distill-Qwen-32B-FP8-Dynamic --local-dir .


FROM ${BASE_URL}/library/cuda-12.1.1-cudnn-devel-ubuntu22.04:py311-builder-torch251 AS deepseek

WORKDIR /workspace/deepseek/DeepSeek-R1-Distill-Qwen-32B-FP8-Dynamic

COPY --from=model-builder /root/models_cache/DeepSeek-R1-Distill-Qwen-32B-FP8-Dynamic/ /workspace/deepseek/DeepSeek-R1-Distill-Qwen-32B-FP8-Dynamic/

COPY requirements.txt /requirements.txt

RUN pip install -r /requirements.txt && rm -rf /root/.cache/pip

WORKDIR /workspace/deepseek/

COPY src/ /workspace/deepseek/src/

COPY start.sh /start.sh

RUN chmod 755 /start.sh

CMD ["/start.sh"]
