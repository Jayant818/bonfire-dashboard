# Multi-stage Dockerfile for Bonfire Dashboard (NestJS API + Vite React client)

# ----------------------
# Builder: install deps and build client + server
# ----------------------
FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies first for better layer caching
COPY package.json ./
RUN npm install

# Copy the rest of the project and build
COPY . .
RUN npm run build

# ----------------------
# Runner: production image with only prod deps and build outputs
# ----------------------
FROM node:22-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && rm -rf ~/.npm

# Copy built artifacts from builder
COPY --from=builder /app/dist ./dist

# Optionally drop privileges to the non-root 'node' user
USER node

# The NestJS server listens on 3002 (default, can be overridden by PORT env)
EXPOSE 3002

CMD ["node", "dist/src/main.js"]
