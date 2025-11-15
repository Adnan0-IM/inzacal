# 1) Build the React client
FROM node:22-bookworm-slim AS client-builder
WORKDIR /client
COPY client/package*.json ./
RUN npm ci
COPY client .
RUN npm run build

# 2) Build the server (TypeScript -> JS + Prisma client)
FROM node:22-bookworm-slim AS server-builder
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
COPY server/package*.json ./
RUN npm ci
COPY server .
RUN npx prisma generate
RUN npm run build

# 3) Runtime image
FROM node:22-bookworm-slim AS production
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production

# Copy built server and deps
COPY --from=server-builder /app/dist ./dist
COPY --from=server-builder /app/package*.json ./
COPY --from=server-builder /app/node_modules ./node_modules
# Optional: slim down dev deps; Prisma client stays generated
RUN npm prune --omit=dev

# Prisma schema/migrations (optional if you run migrations on start)
COPY --from=server-builder /app/prisma ./prisma

# Copy client build into both locations (compat)
COPY --from=client-builder /client/dist ./client/dist
COPY --from=client-builder /client/dist /client/dist

EXPOSE 3000
# Run migrations then start the server
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/api/index.js"]