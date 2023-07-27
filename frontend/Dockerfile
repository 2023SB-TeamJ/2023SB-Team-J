# 베이스 이미지 설정
FROM node:14-alpine

# 작업 디렉토리 설정
WORKDIR /frontend

# 필요한 파일 복사
COPY package.json ./
COPY package-lock.json ./

# 패키지 설치
RUN npm install

# # 빌드
# RUN npm run build


# 불필요한 파일 제외한 애플리케이션 파일 복사 (dockerignore 파일 필요)
COPY . .

# 웹 서버 실행 (실제 배포 시에는 nginx 등을 사용하는 것이 좋음)
CMD ["npm", "start"]