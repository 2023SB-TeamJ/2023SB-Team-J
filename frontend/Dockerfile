# 베이스 이미지 설정
FROM node:14-alpine

# 작업 디렉토리 설정
WORKDIR /frontend

# 불필요한 파일 제외한 애플리케이션 파일 복사 (dockerignore 파일 필요)
COPY . ./

# 필요한 파일 복사
#COPY package.json ./
#COPY package-lock.json ./

# 패키지 설치
RUN npm install

# 프론트엔드 애플리케이션 빌드
RUN npm run build