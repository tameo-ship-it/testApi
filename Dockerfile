# Stage 1: build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json & lockfile
COPY package*.json ./

# Cài dependencies
RUN npm install

# Copy toàn bộ code
COPY . .

# Build project
RUN npm run build

# Stage 2: production image
FROM node:20-alpine

WORKDIR /app

# Copy node_modules và build từ stage trước
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Chạy app
CMD ["node", "dist/main"]
