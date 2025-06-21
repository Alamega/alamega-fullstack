FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      git \
      python3-venv \
      libgl1 \
      libglib2.0-0 \
      libtcmalloc-minimal4 \
      bc \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN git clone --recurse-submodules https://github.com/AUTOMATIC1111/stable-diffusion-webui.git . \
 && git clone https://github.com/CompVis/stable-diffusion.git repositories/stable-diffusion-stability-ai \
 && git clone https://github.com/salesforce/BLIP.git repositories/BLIP

RUN pip install --upgrade pip \
 && pip install xformers \
 && pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu

RUN rm -rf /root/.cache/pip

RUN useradd -m sduser \
 && mkdir -p /home/sduser/.cache/pip \
 && chown -R sduser:sduser /app /home/sduser

USER sduser
ENV PIP_CACHE_DIR=/home/sduser/.cache/pip \
    HOME=/home/sduser

RUN bash webui.sh --install-only --skip-torch-cuda-test

RUN rm -rf /home/sduser/.cache/pip

WORKDIR /app

CMD [ "./venv/bin/python", "launch.py", "--listen", "--port", "7860", "--skip-torch-cuda-test", "--precision", "full", "--no-half", "--ckpt-dir", "/app/models/Stable-diffusion" ]