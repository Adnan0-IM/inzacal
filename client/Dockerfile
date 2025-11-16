# Build the React app
FROM node:22-bookworm-slim AS build
WORKDIR /client
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_SERVER_URL
ENV VITE_SERVER_URL=${VITE_SERVER_URL}
RUN npm run build

# Serve with Nginx (SPA + /api proxy via templates)
FROM nginx:alpine
# Static files
COPY --from=build /client/dist /usr/share/nginx/html
# Nginx template (the official image will envsubst this at startup)
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
EXPOSE 80
# Keep the default ENTRYPOINT; just run nginx
CMD ["nginx", "-g", "daemon off;"]