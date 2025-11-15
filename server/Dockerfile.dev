FROM node:22-bookworm-slim

WORKDIR /app

# Install OpenSSL CLI so Prisma can detect OpenSSL 3 on Debian Bookworm
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci || npm install

ENV NODE_ENV=development

# copy source (including prisma/)
COPY . .

# ensure Prisma Client is generated in the image (after openssl is installed)
RUN npx prisma generate

EXPOSE 3000

# apply migrations at start, then run dev
CMD ["sh","-c","npx prisma migrate deploy && npm run dev"]

