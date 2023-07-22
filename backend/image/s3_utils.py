import hashlib

import boto3

from backend_project.settings import *
import requests
from io import BytesIO
from PIL import Image


def upload_image_to_s3(img_file, key, ExtraArgs):
    s3 = boto3.client(
        "s3",
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY
    )
    bucket_name = "t4y-bucket"
    s3.upload_fileobj(img_file, bucket_name, key, ExtraArgs)
    img_url = f"https://{bucket_name}.s3.amazonaws.com/{key}"
    return img_url


def download_image_from_s3(s3_url):
    try:
        response = requests.get(s3_url)
        response.raise_for_status()
        image_data = BytesIO(response.content)
        image = Image.open(image_data)
        return image
    except requests.exceptions.RequestException as e:
        print(f"Failed to download image: {e}")
        return None


def generate_unique_filename(image_data):
    # 이미지 데이터의 해시값을 계산합니다.
    hasher = hashlib.md5()
    hasher.update(image_data)
    hash_value = hasher.hexdigest()

    # 해시값을 파일 이름에 추가하여 고유한 파일 이름을 생성합니다.
    filename = hash_value
    return filename