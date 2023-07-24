# 베이스 이미지 설정
FROM node:14-alpine

# 작업 디렉토리 설정
WORKDIR /frontend
COPY . /frontend

# 필요한 파일 복사
COPY package.json .
COPY package-lock.json .

# 패키지 설치
RUN npm ci --production

# 빌드
COPY . ./
RUN npm run build

# 실행
CMD ["npm", "start"]
        