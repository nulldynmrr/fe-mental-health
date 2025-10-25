FROM node:20-alpine AS builder

WORKDIR /app

# 1. Pastikan package-lock.json ada, kalau tidak ganti ke `npm install`
COPY package*.json ./
RUN npm install

# 2. Copy semua source code
COPY . .

# 3. Tambahkan environment variable agar build tidak error
ARG NEXT_PUBLIC_HOST
ENV NEXT_PUBLIC_HOST=$NEXT_PUBLIC_HOST

# 4. Jalankan build
RUN npm run build

# 5. Gunakan image ringan untuk menjalankan
FROM node:20-alpine AS runner

WORKDIR /app
COPY --from=builder /app ./

EXPOSE 3001
CMD ["npm", "start"]
