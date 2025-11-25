#!/bin/bash

# ===========================
# Deploy script cho hệ thống thi trắc nghiệm với Nginx + HTTPS
# Chạy: bash deploy.sh
# ===========================

# 1. Build backend
echo "
=== Build Backend ==="
cd backend
npm install
cd ..

# 2. Build frontend
echo "
=== Build Frontend ==="
cd frontend
npm install
npm run build
cd ..

# 3. Tạo Dockerfile & docker-compose.yml với Nginx + HTTPS
cat > docker-compose.yml <<EOL
version: '3.8'
services:
  mongo:
    image: mongo:7
    container_name: exam_mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  backend:
    build: ./backend
    container_name: exam_backend
    ports:
      - "3000:3000"
    depends_on:
      - mongo

  frontend:
    build: ./frontend
    container_name: exam_frontend_build
    depends_on:
      - backend

  nginx:
    image: nginx:latest
    container_name: exam_nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./frontend/dist:/usr/share/nginx/html
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./certs:/etc/letsencrypt
    depends_on:
      - frontend

volumes:
  mongo_data:
EOL

# 4. Tạo thư mục cấu hình Nginx và SSL
mkdir -p nginx/conf.d
mkdir -p certs

# Tạo file cấu hình Nginx cơ bản
cat > nginx/conf.d/default.conf <<EOL
server {
    listen 80;
    server_name example.com;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files \$uri /index.html;
    }

    location /api/ {
        proxy_pass http://backend:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

# 5. Cài certbot nếu muốn HTTPS tự động (letsencrypt)
echo "
=== Cài đặt Certbot và HTTPS (tuỳ chọn) ==="
# Bạn cần thay đổi example.com thành domain thật
# sudo certbot certonly --standalone -d example.com

# 6. Chạy Docker Compose
echo "
=== Chạy hệ thống bằng Docker Compose ==="
docker-compose up -d

# 7. Hướng dẫn thêm
echo "
Hệ thống đang chạy.
Frontend: http://localhost hoặc https://example.com
Backend: http://localhost:3000
Mongo: localhost:27017
Nginx proxy tất cả request đến frontend và /api đến backend
"
