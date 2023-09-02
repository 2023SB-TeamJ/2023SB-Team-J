from image.apps import ImgsAppConfig
from backend_project.celery import *
from image.s3_utils import *
from backend_project.settings import *
from image.serializers import Ai_modelSerializer

@app.task(name="model1_execute")
def model1_execute(url, id):
    image = download_image_from_s3(url)
    result = ImgsAppConfig.model.model1_face2paint(image)
    data = {
        "image_upload_id": id,
        "model_name": "face_paint_512_v2",
        "model_result_url": result,
    }
    serializer = Ai_modelSerializer(data=data)
    try:
        if serializer.is_valid():
            serializer.save()
            response = {
                "model1_id": serializer.data["id"],
                "model1_url": serializer.data["model_result_url"]
            }
            return response
        else:
            # Handle validation errors
            errors = serializer.errors
            # Log the validation errors
            print("-----Validation Errors:", errors)
            # You can raise a custom APIException or return an appropriate response here
            # For example, raise APIException(errors) to return a 400 Bad Request response
    except ValidationError as validation_error:
        # Handle validation error exceptions
        print("---Validation Error:", validation_error)
        # You can raise a custom APIException or return an appropriate response here
        # For example, raise APIException(str(validation_error)) to return a 400 Bad Request response
    except Exception as e:
        # Handle other exceptions
        print("----Error:", e)

@app.task(name="model2_execute")
def model2_execute(url, id):
    image = download_image_from_s3(url)
    result = ImgsAppConfig.model.model2_face2paint(image)
    data = {
        "image_upload_id": id,
        "model_name": "paprika",
        "model_result_url": result,
    }
    serializer = Ai_modelSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        response = {
            "model2_id": serializer.data["id"],
            "model2_url": serializer.data["model_result_url"]
        }
        return response
    else:
        return False


@app.task(name="model3_execute")
def model3_execute(url, id):
    image = download_image_from_s3(url)
    result = ImgsAppConfig.model.model3_face2paint(image)
    data = {
        "image_upload_id": id,
        "model_name": "celeba_distill",
        "model_result_url": result,
    }
    serializer = Ai_modelSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        response = {
            "model3_id": serializer.data["id"],
            "model3_url": serializer.data["model_result_url"]
        }
        return response
    else:
        return False
