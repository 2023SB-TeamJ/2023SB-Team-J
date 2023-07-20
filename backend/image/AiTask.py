from image.apps import ImgsAppConfig
import pickle
from datetime import datetime
from io import BytesIO
from backend_project.celery import *
from .s3_utils import upload_image_to_s3
from concurrent.futures import ThreadPoolExecutor
from image.serializers import Ai_modelSerializer
from django import db
from image.s3_utils import *
from backend_project.settings import *
@app.task(name="model1_execute")
def model1_execute(url):
    image = download_image_from_s3(url)
    return ImgsAppConfig.model.model1_face2paint(image)


@app.task(name="model2_execute")
def model2_execute(url):
    image = download_image_from_s3(url)
    return ImgsAppConfig.model.model2_face2paint(image)


@app.task(name="model3_execute")
def model3_execute(url):
    image = download_image_from_s3(url)
    return ImgsAppConfig.model.model3_face2paint(image)

"""@app.task(name="model_execute")
def model_execute(url, id):
    image = download_image_from_s3(url)
    executor = ThreadPoolExecutor(max_workers=3)

    future1 = executor.submit(ImgsAppConfig.model.model1_face2paint, image)
    future2 = executor.submit(ImgsAppConfig.model.model2_face2paint, image)
    future3 = executor.submit(ImgsAppConfig.model.model3_face2paint, image)

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
        return False"""

"""@app.task(name="model_execute")
def model_execute(url,id):


    image = download_image_from_s3(url)
    result1 = ImgsAppConfig.model.model1_face2paint(image)
    result2 = ImgsAppConfig.model.model2_face2paint(image)
    result3 = ImgsAppConfig.model.model3_face2paint(image)


    data = {
        "image_origin_id": id,
        "result_url_1": result1,
        "result_url_2": result2,
        "result_url_3": result3
    }

    serializer = Ai_modelSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        db.connections.close_all()
        return data
    else:
        return False"""

