import pickle
import time

from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
from rest_framework.views import APIView

from drf_yasg.utils import swagger_auto_schema
from .serializers import *

from .AiTask import *
from .s3_utils import *
from .models import *
from rest_framework.permissions import AllowAny


from rest_framework.parsers import MultiPartParser

from album.serializers import *

from common.utils import user_token_to_data
from common.serializers import SwaggerHeader


class UploadImageView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]
    @swagger_auto_schema(manual_parameters=SwaggerFramePost, responses={"201":SwaggerResponseFramePost})
    def post(self, request):
        print(">>> 1. in api v1 frame >>>")
        image = request.data.get("image")
        authorization_header = request.META.get('HTTP_AUTHORIZATION')
        if authorization_header and authorization_header.startswith('Bearer '):
            token = authorization_header.split(' ')[1]
            user_id = user_token_to_data(token)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if not user_id:  # user_id가 제공되지 않았을 경우에 대한 처리
            return Response({"error": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        with Image.open(image) as im:
            im = im.convert("RGB")
            im_jpeg = BytesIO()
            im.save(im_jpeg, 'JPEG')
            im_jpeg.seek(0)
        key = "image_upload/" + generate_unique_filename(im_jpeg.getvalue()) + ".jpeg"
        img_url = upload_image_to_s3(im_jpeg, key, ExtraArgs={'ContentType': "image/jpeg"})
        data ={
            "user_id": user_id,
            "url": img_url
        }
        print(">>> 2. data >>> ", data)
        serializer = UploadedImageSerializer(data=data)
        print(">>> 3. after serializer >>>", serializer)
        if serializer.is_valid():
            serializer.save()
            response = {
                "origin_img_id": serializer.data["id"],
                "url": serializer.data["url"]
            }
            return Response(response, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

#     def get(self, request, format=None):
#         raw_data = request.body.decode('utf-8')
#         try:
#             data = json.loads(raw_data)
#             user_id = data.get('user_id')
#             source = data.get('source')

#             if user_id is None or source is None:  # request 형식에 맞지 않는 경우
#                 return Response(status=status.HTTP_400_BAD_REQUEST)

#             image_origin = Image_upload.objects.get(id=source, user_id=user_id, deleted_at__isnull=True)

#         except:
#             # 찾지 못한 경우 HTTP_400
#             return Response(status=status.HTTP_400_BAD_REQUEST)


#         serializer = UploadedImageSerializer(image_origin)

#         picture = {
#             'url_1': serializer.data.get('url_1'),
#             'url_2': serializer.data.get('url_2'),
#             'url_3': serializer.data.get('url_3'),
#             'url_4': serializer.data.get('url_4'),
#         }
#         return Response(picture, status=status.HTTP_200_OK)

class AiExecute(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(manual_parameters= SwaggerHeader, request_body=SwaggerFrameAiPostSerializer, responses={"200":SwaggerResponseFrameAiPostSerializer})
    def post(self, request):
        url = request.data.get("image")
        id = request.data.get("image_origin_id")
        task1 = model1_execute.delay(url, id)
        task2 = model2_execute.delay(url, id)
        task3 = model3_execute.delay(url, id)

        while True:
            if task1.ready() and task2.ready() and task3.ready():
                break
            time.sleep(1)
        if task1.result and task2.result and task3.result:
            response = {**task1.result, **task2.result, **task3.result}

            return Response(response, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

#sudo celery -A backend_project.celery multi start 4 --loglevel=info --pool=threads
#sudo celery multi stop 4 -A backend_project.celery --all

    @swagger_auto_schema(manual_parameters= SwaggerHeader, request_body=SwaggerAiSelectPatchSerializer, responses={"201":SwaggerResponseAiSelectPatchSerializer })
    def patch(self, request):
        select = request.data.get("select", [])
        select_id = request.data.get("select_id", [])
        change = {
            "is_selected": True
        }
        urls = []

        for i, id in zip(select, select_id):
            if i == 1:
                model = Image_upload.objects.get(id=id)
                serializer = UploadedImageSerializer(model, data=change, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    urls.append(serializer.data.get("url"))
                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
            else:
                model = Ai_model.objects.get(id=id)
                serializer = Ai_modelSerializer(model, data=change, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    urls.append(serializer.data.get("model_result_url"))
                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)

        # 모든 업데이트된 URL을 사용하여 urls 리스트를 data 딕셔너리로 생성
        data = {}
        for i, url in enumerate(urls, start=1):
            data[f"url{i}"] = url

        return Response(data, status=status.HTTP_201_CREATED)


class ResultImageView(APIView):
    permission_classes = [IsAuthenticated]

    parser_classes = [MultiPartParser]
    @swagger_auto_schema(manual_parameters= SwaggerHeader, request_body=SwaggerFrameAddPostSerializer, responses={"201" : SwaggerFrameAddPostSerializer})
    def post(self, request):
        authorization_header = request.META.get('HTTP_AUTHORIZATION')
        if authorization_header and authorization_header.startswith('Bearer '):
            token = authorization_header.split(' ')[1]
            user_id=user_token_to_data(token)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        result_image = request.data.get("result_image")
        im = Image.open(result_image)
        im = im.convert("RGB")
        im_jpeg = BytesIO()
        im.save(im_jpeg, 'JPEG')
        im_jpeg.seek(0)
        key = "Result_image/" + generate_unique_filename(im_jpeg.getvalue()) + ".jpeg"
        img_url = upload_image_to_s3(im_jpeg, key, ExtraArgs={'ContentType': "image/jpeg"})

        data = {
            "user_id": user_id,
            "result_url": img_url
        }

        serializer = ResultImageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)