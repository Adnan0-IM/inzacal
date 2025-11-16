# Build the React app
FROM node:22-bookworm-slim AS build
WORKDIR /client
COPY package*.json ./
RUN npm ci
COPY . .
# Optional: set API base at build time (Railway Build Arg)
ARG VITE_SERVER_URL
ENV VITE_SERVER_URL=${VITE_SERVER_URL}
RUN npm run build

# Serve with Nginx (SPA + optional /api proxy)
FROM nginx:alpine
# Static files
COPY --from=build /client/dist /usr/share/nginx/html
# Nginx template with $PORT and $API_URL
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
# Entrypoint uses envsubst to render port and proxy target
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
EXPOSE 80
CMD ["/docker-entrypoint.sh"]