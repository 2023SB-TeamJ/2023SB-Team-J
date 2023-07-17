from .AiModels import model
import pickle
from datetime import datetime
from io import BytesIO
from backend_project.celery import *
from .s3_utils import upload_image_to_s3
@app.task(name="model1_execute")
def model1_execute(origin_image):
    image = pickle.loads(origin_image)
    result_image = model.model1_face2paint(image)
    with BytesIO() as file:
        result_image.save(file, format='JPEG')
        file.seek(0)
        key = str(datetime.now())
        key = key.replace('.', '')
        key = key+".jpeg"
        img_url = upload_image_to_s3(file, key, ExtraArgs={'ContentType': 'image/jpeg'})

    return {"model2_url": img_url}


@app.task(name="model2_execute")
def model2_execute(origin_image):
    image = pickle.loads(origin_image)
    result_image = model.model2_face2paint(image)
    with BytesIO() as file:
        result_image.save(file, format='JPEG')
        file.seek(0)
        key = str(datetime.now())
        key = key.replace('.', '')
        key = key + ".jpeg"
        img_url = upload_image_to_s3(file, key, ExtraArgs={'ContentType': 'image/jpeg'})

    return {"model2_url": img_url}


@app.task(name="model3_execute")
def model3_execute(origin_image):
    image = pickle.loads(origin_image)
    result_image = model.model3_face2paint(image)
    with BytesIO() as file:
        result_image.save(file, format='JPEG')
        file.seek(0)
        key = str(datetime.now())
        key = key.replace('.', '')
        key = key + ".jpeg"
        img_url = upload_image_to_s3(file, key, ExtraArgs={'ContentType': 'image/jpeg'})

    return {"model2_url": img_url}
