FROM node:18.18-bookworm-slim as frontend

ARG REACT_APP_DJANGO_SITE_URL
ARG REACT_APP_DJANGO_PORT
ARG REACT_APP_DJANGO_API_ENDPOINT

ENV ENVIRONMENT="development"
ENV NODE_ENV="development"

ENV REACT_APP_DJANGO_SITE_URL ${REACT_APP_DJANGO_SITE_URL}
ENV REACT_APP_DJANGO_PORT ${REACT_APP_DJANGO_PORT}
ENV REACT_APP_DJANGO_API_ENDPOINT ${REACT_APP_DJANGO_API_ENDPOINT}

WORKDIR /var/www/seismic/frontend

COPY ./ .

# install the frontend libraries:
RUN npm ci && \
    npm run build


FROM nginx:1.25.2-bookworm

ENV ENVIRONMENT="production"
ENV NODE_ENV="production"

COPY --from=frontend /var/www/seismic/frontend/build/ /usr/share/nginx/html/

WORKDIR /usr/share/nginx/html/

EXPOSE 80

# start app
CMD [ "nginx", "-g", "daemon off;" ]
