# Stage 1: Build
FROM node:20 AS builder

WORKDIR /app

# 1. Copy package.json & package-lock.json dan install dependencies
COPY package*.json ./
RUN npm install

# 2. Copy semua source code termasuk tsconfig/json/jsconfig
COPY . .

# 3. Tambahkan environment variable agar build tidak error
ARG NEXT_PUBLIC_HOST
ENV NEXT_PUBLIC_HOST=$NEXT_PUBLIC_HOST

# 4. Jalankan build
RUN npm run build

# Stage 2: Runner
FROM node:20 AS runner

WORKDIR /app

# Copy hasil build dan node_modules
COPY --from=builder /app ./

EXPOSE 3001

CMD ["npm", "start"]
