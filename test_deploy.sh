#!/bin/bash

echo "> project 디렉토리 주소"
REPOSITORY = /home/ec2-user/app/
PROJECT_NAME=this-is-4-you

cd $REPOSITORY/$PROJECT_NAME/

echo "> Git Pull"
git pull


echo "> repository 디렉토리로 이동"
cd $REPOSITORY

echo"> 프로젝트 Build 및 배포 시작"
docker-compose -f docker-compose.yml up -d --build
