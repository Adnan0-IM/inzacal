FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci || npm install

ENV NODE_ENV=development

COPY . .

EXPOSE 5173

CMD ["npm","run","dev"]


