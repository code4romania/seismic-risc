FROM python:3.9-slim

ARG DEVBUILD

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
                    build-essential \
                    postgresql-client \
                    libpq-dev \
                    gettext

RUN pip install pip -U

WORKDIR /code
COPY . /code

RUN pip install -r requirements.txt

# The dev requirements should be installed only if a DEVBUILD variable is
# passed to the docker build command. This should allow easy building of
# the production container image.
RUN if [ ! -z "${DEVBUILD}" ]; then pip install -r requirements-dev.txt; fi

ENTRYPOINT ["bash", "-c"]

CMD ["./start_gunicorn.sh"]
