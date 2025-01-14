ARG BASE_URL
FROM nicolaka/netshoot AS model-builder

RUN curl -L  https://github.com/git-lfs/git-lfs/releases/download/v3.2.0/git-lfs-linux-amd64-v3.2.0.tar.gz \
    -o /root/git-lfs-linux-amd64-v3.2.0.tar.gz && cd /root/ && \
    tar -xzf git-lfs-linux-amd64-v3.2.0.tar.gz && cd /root/git-lfs-3.2.0 && \
    ./install.sh && rm -f /root/git-lfs-linux-amd64-v3.2.0.tar.gz

RUN pip install   --break-system-packages -U huggingface_hub[cli]

RUN mkdir -p /root/models_cache/phi-4-bnb-4bit && \
    cd /root/models_cache/phi-4-bnb-4bit && \
    huggingface-cli download unsloth/phi-4-bnb-4bit --local-dir .


FROM ${BASE_URL}/library/cuda-12.1.1-cudnn-devel-ubuntu22.04:builder-torch231 AS vllm

WORKDIR /workspace/vllm
RUN python -m venv --system-site-packages /workspace/vllm/venv
ENV PATH="/workspace/vllm/venv/bin:$PATH"
ENV PATH="/root/.local/bin:$PATH"
# Install Python dependencies (Worker Template)
COPY requirements.txt /requirements.txt
RUN /workspace/vllm/venv/bin/python -m pip install -r /requirements.txt && rm -rf /root/.cache/pip

WORKDIR /workspace/vllm/phi-4-bnb-4bit/
COPY --from=model-builder /root/models_cache/phi-4-bnb-4bit/ /workspace/vllm/phi-4-bnb-4bit/

WORKDIR /workspace/vllm/
COPY src/ /workspace/vllm/src/
COPY start.sh /start.sh
RUN chmod 755 /start.sh
CMD ["/start.sh"]