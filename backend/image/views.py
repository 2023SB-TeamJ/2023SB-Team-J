import pickle
import time
import json
from datetime import datetime

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

class UploadImageView(APIView):
    permission_classes = [IsAuthenticated] #권한 있는 사람, 로그인 한 사람만 접근 가능

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
                        im_jpeg = BytesIO()
                        im.save(im_jpeg, 'JPEG')
                        im_jpeg.seek(0)
                    key = request.data.get("user_id") + str(datetime.now()).replace('.', '') + "." + "jpeg"
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
        try:
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
        except Exception as e:
            return JsonResponse({"error message": str(e)}, status=500)

class AiExecute(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        image_origin_id = request.data.get("image_origin_id")
        origin_img = Image.open(io.BytesIO(request.FILES.get("image").read()))

        origin_img_pickle = pickle.dumps(origin_img)

        result1 = model1_execute.delay(origin_img_pickle)
        result2 = model2_execute.delay(origin_img_pickle)
        result3 = model3_execute.delay(origin_img_pickle)

        while True:
            if result1.ready() or result2.ready() or result3.ready() == False:
                time.sleep(1)
                continue
            else:
                data = {
                    "image_origin_id": image_origin_id,
                    "result_url_1": result1.result(),
                    "result_url_2": result2.result(),
                    "result_url_3": result3.result()
                }
                serializer = Ai_modelSerializer(data)

                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(status=status.HTTP_400_BAD_REQUEST)

#
class ResultImageView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = ResultImageSerializer(data=request.data)
        if serializer.is_valid():
            img_file = request.FILES.get('img_file')
            im = Image.open(img_file)
            im_jpeg = BytesIO()
            im.save(im_jpeg, 'JPEG')
            im_jpeg.seek(0)
            key = request.data.get("user_id") + str(datetime.now()).replace('.','') + "." + "jpeg"
            img_url = upload_image_to_s3(im_jpeg, key, ExtraArgs={'ContentType': "image/jpeg"})

            data = {
                'user_id': request.data.get("user_id"),
                'result_url': img_url,
            }

            serializer = ResultImageSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
