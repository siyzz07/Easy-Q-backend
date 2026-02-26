# ──────────────────────────────────────────────
# Stage 1 — Install dependencies
# ──────────────────────────────────────────────
FROM node:20-alpine AS deps

# bcrypt needs native build tools
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# ──────────────────────────────────────────────
# Stage 2 — Build TypeScript
# ──────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ──────────────────────────────────────────────
# Stage 3 — Production image
# ──────────────────────────────────────────────
FROM node:20-alpine AS production

# Add dumb-init for proper PID 1 signal handling
RUN apk add --no-cache dumb-init

# bcrypt needs native C++ runtime libs (not the full build toolchain)
RUN apk add --no-cache libstdc++ libgcc

ENV NODE_ENV=production
WORKDIR /app

# Copy package files and install production-only deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled JS from builder stage
COPY --from=builder /app/build ./build

# Create logs directory and give the node user permissions
RUN mkdir -p logs && chown -R node:node /app

# Use non-root user for security
USER node

EXPOSE 7004

CMD ["dumb-init", "node", "build/server.js"]
