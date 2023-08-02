#!/bin/bash

# 만약 docker-compose 명령어가 설치되어 있지 않다면 오류 메시지를 출력하고 종료합니다.
if ! [ -x "$(command -v docker-compose)" ]; then
  echo '오류: docker-compose가 설치되어 있지 않습니다.' >&2
  exit 1
fi

# 도메인, RSA 키 크기, 인증서 데이터 경로, 이메일 주소, 스테이징 여부를 설정합니다.
domains=(thiss4u.site)
rsa_key_size=4096
data_path="./certbot"
email="dkfud2121@gmail.com" # 유효한 이메일 주소를 추가하는 것이 좋습니다.
staging=0 # 테스트를 위해 스테이징 모드를 사용할 경우 1로 설정합니다.

# 인증서 데이터 경로에 이미 존재하는 데이터가 있는지 확인합니다.
if [ -d "$data_path" ]; then
  read -p "$domains 도메인에 대해 기존 데이터가 발견되었습니다. 계속하고 기존 인증서를 대체하시겠습니까? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi

# TLS 설정을 위한 필요한 파일들을 인증서 데이터 경로에 다운로드합니다.
if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
  echo "### 권장 TLS 매개변수를 다운로드 중입니다..."
  mkdir -p "$data_path/conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
  echo
fi

# 임시로 사용할 더미 인증서를 생성합니다.
echo "### $domains 도메인을 위한 더미 인증서를 생성합니다..."
path="/etc/letsencrypt/live/$domains"
mkdir -p "$data_path/conf/live/$domains"
docker-compose -f docker-compose.prod.yml run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1\
    -keyout '$path/privkey.pem' \
    -out '$path/fullchain.pem' \
    -subj '/CN=localhost'" certbot
echo

# Nginx 서버를 시작합니다.
echo "### Nginx 서버를 시작합니다..."
docker-compose -f docker-compose.prod.yml up --force-recreate -d nginx
echo

# 더미 인증서를 삭제합니다.
echo "### $domains 도메인에 대한 더미 인증서를 삭제합니다..."
docker-compose -f docker-compose.prod.yml run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/$domains && \
  rm -Rf /etc/letsencrypt/archive/$domains && \
  rm -Rf /etc/letsencrypt/renewal/$domains.conf" certbot
echo

# Let's Encrypt 인증서를 요청합니다.
echo "### $domains 도메인을 위한 Let's Encrypt 인증서를 요청합니다..."
# 여러 도메인이 있을 경우 -d 인자에 도메인들을 연결합니다.
domain_args=""
for domain in "${domains[@]}"; do
  domain_args="$domain_args -d $domain"
done

# 이메일 주소를 적절하게 선택합니다.
case "$email" in
  "") email_arg="--register-unsafely-without-email" ;;
  *) email_arg="--email $email" ;;
esac

# 스테이징 모드를 사용하려면 스테이징 인자를 추가합니다.
if [ $staging != "0" ]; then staging_arg="--staging"; fi

docker-compose -f docker-compose.prod.yml run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    $email_arg \
    $domain_args \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal" certbot
echo

# Nginx를 다시 불러와서 인증서를 적용합니다.
echo "### Nginx를 다시 불러와서 인증서를 적용합니다..."
docker-compose -f docker-compose.prod.yml exec nginx nginx -s reload
