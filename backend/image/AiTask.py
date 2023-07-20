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

