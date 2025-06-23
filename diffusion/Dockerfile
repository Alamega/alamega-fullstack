FROM debian:bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends wget git python3 python3-venv libgl1 libglib2.0-0 google-perftools bc

RUN useradd -m sduser
USER sduser

WORKDIR /app

RUN git clone --depth=1 https://github.com/AUTOMATIC1111/stable-diffusion-webui .
RUN git clone --depth=1 https://github.com/AUTOMATIC1111/stable-diffusion-webui-assets /app/repositories/stable-diffusion-webui-assets
RUN git clone --depth=1 https://github.com/Stability-AI/stablediffusion /app/repositories/stablediffusion
RUN git clone --depth=1 https://github.com/Stability-AI/generative-models /app/repositories/generative-models
RUN git clone --depth=1 https://github.com/crowsonkb/k-diffusion /app/repositories/k-diffusion
RUN git clone --depth=1 https://github.com/salesforce/BLIP /app/repositories/BLIP

RUN python3 -m venv venv && ./venv/bin/pip install --upgrade pip

ENV PATH="/app/venv/bin:$PATH"
ENV TORCH_COMMAND="pip install torch==2.1.2 torchvision==0.16.2 --index-url https://download.pytorch.org/whl/cpu"

RUN pip install \
    mpmath \
    urllib3 \
    typing-extensions \
    sympy \
    pillow \
    numpy \
    networkx \
    MarkupSafe \
    idna \
    fsspec \
    filelock \
    charset-normalizer \
    certifi \
    requests \
    jinja2 && \
    bash -c "$TORCH_COMMAND"

ENTRYPOINT ["bash","webui.sh","--listen","--port","7860","--precision","full","--no-half","--use-cpu","all","--skip-torch-cuda-test"]