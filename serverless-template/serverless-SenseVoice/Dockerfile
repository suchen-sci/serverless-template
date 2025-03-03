ARG BASE_URL
FROM ${BASE_URL}/library/cuda-12.1.1-cudnn-devel-ubuntu22.04:py311-builder-torch251 AS senseVoice

RUN curl -L  https://github.com/git-lfs/git-lfs/releases/download/v3.2.0/git-lfs-linux-amd64-v3.2.0.tar.gz \
    -o /root/git-lfs-linux-amd64-v3.2.0.tar.gz && cd /root/ && \
    tar -xzf git-lfs-linux-amd64-v3.2.0.tar.gz && cd /root/git-lfs-3.2.0 && \
    ./install.sh && rm -f /root/git-lfs-linux-amd64-v3.2.0.tar.gz

RUN pip install --break-system-packages -U huggingface_hub[cli]

RUN mkdir -p /workspace/FunAudioLLM/SenseVoiceSmall && \
    cd /workspace/FunAudioLLM/SenseVoiceSmall && \
    huggingface-cli download FunAudioLLM/SenseVoiceSmall --local-dir .

RUN rm -f /workspace/FunAudioLLM/SenseVoiceSmall/requirements.txt

WORKDIR /workspace/FunAudioLLM
RUN python -m venv --system-site-packages /workspace/FunAudioLLM/venv

WORKDIR /workspace/FunAudioLLM

COPY requirements.txt /requirements.txt

RUN /workspace/FunAudioLLM/venv/bin/python -m pip install -r /requirements.txt && \
    rm -rf /root/.cache/pip 

# RUN source /workspace/FunAudioLLM/venv/bin/activate && \ 
#     cd /workspace/FunAudioLLM && \
#     pip install -r /requirements.txt && rm -rf /root/.cache/pip

WORKDIR /workspace/FunAudioLLM/

COPY src/ /workspace/FunAudioLLM/src/

COPY start.sh /start.sh

RUN chmod 755 /start.sh

CMD ["/start.sh"]
