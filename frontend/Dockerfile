# 베이스 이미지 설정
FROM node:14-alpine

# 작업 디렉토리 설정
WORKDIR /frontend
COPY . /frontend


RUN npm install --legacy-peer-deps

RUN npm run build