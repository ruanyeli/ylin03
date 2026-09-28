FROM node:22-bookworm-slim AS build
WORKDIR /app

# Build-time choices (all optional): evaluation views, share-card host, media CDN.
ARG VITE_EVAL_VIEWS
ARG VITE_EVAL_EXPORTS
ARG SITE_URL
ARG VITE_MEDIA_BASE
ENV VITE_EVAL_VIEWS=$VITE_EVAL_VIEWS VITE_EVAL_EXPORTS=$VITE_EVAL_EXPORTS SITE_URL=$SITE_URL VITE_MEDIA_BASE=$VITE_MEDIA_BASE

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY index.html vite.config.js ./
COPY scripts ./scripts
COPY src ./src
COPY public ./public
RUN npm run build

FROM nginx:1.27-alpine
RUN apk add --no-cache bash python3 && ln -sf /usr/bin/python3 /usr/bin/python
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
