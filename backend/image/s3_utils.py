import boto3

import boto3

def upload_image_to_s3(img_file, bucket_name):
    s3 = boto3.client('s3')
    key = img_file.name
    s3.upload_fileobj(img_file, bucket_name, key)
    img_url = f'https://{bucket_name}.s3.amazonaws.com/{key}'
    return img_url
