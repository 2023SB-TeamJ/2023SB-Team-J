import boto3
from backend_project.settings import *

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
