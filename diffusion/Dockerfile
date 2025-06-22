FROM debian:bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends wget git python3 python3-venv libgl1 libglib2.0-0 google-perftools bc

RUN useradd -m sduser
USER sduser

WORKDIR /app

RUN git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui .
RUN python3 -m venv venv && \
    ./venv/bin/pip install --upgrade pip && \
    ./venv/bin/pip install -r requirements.txt  && \
    ./venv/bin/pip install git+https://github.com/openai/CLIP.git

ENTRYPOINT ["bash","webui.sh","--listen","--port","7860","--precision","full","--no-half","--use-cpu","all","--skip-torch-cuda-test"]