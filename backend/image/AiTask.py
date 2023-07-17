from .AiModels import model
import pickle
from datetime import datetime
from io import BytesIO
from backend_project.celery import *
from .s3_utils import upload_image_to_s3
from concurrent.futures import ThreadPoolExecutor
from image.serializers import Ai_modelSerializer
from django import db
"""@app.task(name="model1_execute")
def model1_execute(origin_image):
    image = pickle.loads(origin_image)
    result_image = model.model1_face2paint(image)
    with BytesIO() as file:
        result_image.save(file, format='JPEG')
        file.seek(0)
        key = str(datetime.now()).replace('.', '').replace(" ", "") + "." + "jpeg"
        img_url = upload_image_to_s3(file, key, ExtraArgs={'ContentType': 'image/jpeg'})

    return img_url


@app.task(name="model2_execute")
def model2_execute(origin_image):
    image = pickle.loads(origin_image)
    result_image = model.model2_face2paint(image)
    with BytesIO() as file:
        result_image.save(file, format='JPEG')
        file.seek(0)
        key = str(datetime.now()).replace('.', '').replace(" ", "") + "." + "jpeg"
        img_url = upload_image_to_s3(file, key, ExtraArgs={'ContentType': 'image/jpeg'})

    return img_url


@app.task(name="model3_execute")
def model3_execute(origin_image):
    image = pickle.loads(origin_image)
    result_image = model.model3_face2paint(image)
    with BytesIO() as file:
        result_image.save(file, format='JPEG')
        file.seek(0)
        key = str(datetime.now()).replace('.', '').replace(" ", "") + "." + "jpeg"
        img_url = upload_image_to_s3(file, key, ExtraArgs={'ContentType': 'image/jpeg'})
        print(img_url)
    return img_url"""


"""@app.task(name="model_execute")
def model_execute(origin_image, origin_img_id):
    image = pickle.loads(origin_image)
    id = pickle.loads(origin_img_id)

   # executor = ThreadPoolExecutor(max_workers=3)

    # future1 = executor.submit(model.model1_face2paint, image)
    # future2 = executor.submit(model.model2_face2paint, image)
    # future3 = executor.submit(model.model3_face2paint, image)

    data = {
        "image_origin_id": id,
        "result_url_1": future1.result(),
        "result_url_2": future2.result(),
        "result_url_3": future3.result()
    }

    serializer = Ai_modelSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        db.connections.close_all()
        return data
    else:
        return False
"""
@app.task(name="model_execute")
def model_execute(origin_image, origin_img_id):
    image = pickle.loads(origin_image)
    id = pickle.loads(origin_img_id)

    future1 = model.model1_face2paint(image)
    future2 = model.model2_face2paint(image)
    future3 = model.model3_face2paint(image)

    data = {
        "image_origin_id": id,
        "result_url_1": future1,
        "result_url_2": future2,
        "result_url_3": future3,
    }

    serializer = Ai_modelSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        db.connections.close_all()
        return data
    else:
        return False