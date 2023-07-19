import pickle
import time
import json
from django.http import JsonResponse
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from .models import *
from PIL import Image
import io
from .AiTask import *
from io import BytesIO
from .s3_utils import upload_image_to_s3
from .models import Image_origin
from album.models import Image_collage
from album.serializers import CollageImageSerializer
from rest_framework.permissions import AllowAny
from datetime import datetime


class UploadImageView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            serializer = UploadedImageSerializer(data=request.data)
            if serializer.is_valid():
                # 이미지 저장
                img_files = request.FILES.getlist('img_files')
                img_urls = []

                for img_file in img_files:
                    # S3 버킷에 이미지 업로드
                    with Image.open(img_file) as im:
                        im.convert("RGB")
                        im_jpeg = BytesIO()
                        im.save(im_jpeg, 'JPEG')
                        im_jpeg.seek(0)
                    key = request.data.get("user_id") + str(datetime.now()).replace('.', '').replace(' ', '') + "." + "jpeg"
                    img_url = upload_image_to_s3(im_jpeg, key, ExtraArgs={'ContentType': "image/jpeg"})
                    img_urls.append(img_url)

                # 이미지 URL MySQL에 저장
                data = {
                    'user_id': serializer.validated_data['user_id'],
                    'url_1': img_urls[0] if len(img_urls) > 0 else '',
                    'url_2': img_urls[1] if len(img_urls) > 1 else '',
                    'url_3': img_urls[2] if len(img_urls) > 2 else '',
                    'url_4': img_urls[3] if len(img_urls) > 3 else '',
                }
                uploaded_image = Image_origin.objects.create(**data)
                serializer = UploadedImageSerializer(uploaded_image)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({"error message": str(e)}, status=500)


    def get(self, request, format=None):
        raw_data = request.body.decode('utf-8')
        try:
            data = json.loads(raw_data)
            user_id = data.get('user_id')
            source = data.get('source')

            if user_id is None or source is None:  # request 형식에 맞지 않는 경우
                return Response(status=status.HTTP_400_BAD_REQUEST)

            image_origin = Image_origin.objects.get(id=source, user_id=user_id, deleted_at__isnull=True)

        except:
            # 찾지 못한 경우 HTTP_400
            return Response(status=status.HTTP_400_BAD_REQUEST)


        serializer = UploadedImageSerializer(image_origin)

        picture = {
            'url_1': serializer.data.get('url_1'),
            'url_2': serializer.data.get('url_2'),
            'url_3': serializer.data.get('url_3'),
            'url_4': serializer.data.get('url_4'),
        }
        return Response(picture, status=status.HTTP_200_OK)



class AiExecute(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        url = request.data.get("image")
        id = request.data.get("image_origin_id")
        result = model_execute.delay(url,id)

        while True:

            if result.ready():
                break
            time.sleep(1)
        result1 = result.result
        if result:
            return Response(result1, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

#sudo celery -A backend_project.celery multi start 4 --loglevel=info --pool=threads
#sudo celery multi stop 4 -A backend_project.celery --all

           
class ResultImageView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CollageImageSerializer(data=request.data)
        if serializer.is_valid():
            user_id = request.data.get('user_id')
            img_file = request.FILES.get('img_file')
            im = Image.open(img_file)
            im.convert("RGB")
            im_jpeg = BytesIO()
            im.save(im_jpeg, 'JPEG')
            im_jpeg.seek(0)
            key = request.data.get("user_id") + str(datetime.now()).replace('.', '').replace(' ', '') + "." + "jpeg"
            img_url = upload_image_to_s3(im_jpeg, key, ExtraArgs={'ContentType': "image/jpeg"})

            data = {
                'user_id': user_id,
                "img_origin_id" : request.data.get('img_origin_id'),
                'result_url': img_url
            }
            serializer = CollageImageSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
