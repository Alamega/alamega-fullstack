ARG USE_CUDA=false
FROM python:3.11-slim

ENV USE_CUDA=${USE_CUDA}
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      wget \
      git \
      python3-venv \
      libgl1 \
      libglib2.0-0 \
      libtcmalloc-minimal4 \
      bc && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN git clone --recurse-submodules https://github.com/AUTOMATIC1111/stable-diffusion-webui.git .

RUN pip install --upgrade pip && \
    pip install -r requirements.txt && \
    pip install git+https://github.com/openai/CLIP.git && \
    pip install git+https://github.com/crowsonkb/k-diffusion.git && \
    pip install transformers accelerate && \
    pip install xformers

RUN if [ "$USE_CUDA" = "true" ]; then \
      pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121 ; \
    else \
      pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu ; \
    fi

RUN git clone https://github.com/CompVis/stable-diffusion.git repositories/stable-diffusion-stability-ai && \
    git clone https://github.com/salesforce/BLIP.git /app/repositories/BLIP

RUN useradd -m sduser && \
    mkdir -p /home/sduser/.cache/pip && \
    chown -R sduser:sduser /app /home/sduser/.cache

USER sduser
ENV PIP_CACHE_DIR=/home/sduser/.cache/pip

CMD ["/bin/bash", "-c", "if [ \"$USE_CUDA\" = \"true\" ]; then exec bash webui.sh --listen --port 7860 --precision full --no-half --ckpt-dir /app/models/Stable-diffusion; else exec bash webui.sh --listen --port 7860 --skip-torch-cuda-test --precision full --no-half --ckpt-dir /app/models/Stable-diffusion; fi"]
