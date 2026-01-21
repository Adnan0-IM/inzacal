FROM node:22-bookworm-slim AS builder
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# 1. Copy package files
COPY package*.json ./

# 2. FIX: Copy prisma directory BEFORE 'npm ci' so the postinstall script finds the schema
COPY prisma ./prisma

# 3. Install dependencies (runs 'prisma generate' automatically)
RUN npm ci

# 4. Copy the rest of the source code
COPY . .

# Provide DATABASE_URL dummy for generate during build (it doesn't connect, just validates)
ARG DATABASE_URL="postgresql://user:pass@localhost:5432/db?schema=public"
ENV DATABASE_URL=${DATABASE_URL}

RUN npx prisma generate
RUN npm run build

FROM node:22-bookworm-slim
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production

# Copy built app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["sh","-c","npx prisma migrate deploy && node dist/src/index.js"]