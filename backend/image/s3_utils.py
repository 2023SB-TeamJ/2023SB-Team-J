import boto3

def upload_image_to_s3(img_file, bucketkubit):
    s3 = boto3.client('s3')
    key = img_file.name
    s3.upload_fileobj(img_file, bucketkubit, key)
    img_url = f'https://{bucketkubit}.s3.amazonaws.com/{key}'
    return img_url