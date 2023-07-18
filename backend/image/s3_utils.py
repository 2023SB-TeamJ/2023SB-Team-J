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
