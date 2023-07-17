import pickle
import time

from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from .s3_utils import upload_image_to_s3
from .models import Image_origin
from datetime import datetime
from PIL import Image
import io
from .AiTask import *
from io import BytesIO


class UploadImageView(APIView):
    # permission_classes = [IsAuthenticated] #권한 있는 사람, 로그인 한 사람만 접근 가능
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UploadedImageSerializer(data=request.data)
        if serializer.is_valid():
            # 이미지 저장
            img_files = request.FILES.getlist('img_files')
            img_urls = []

            for img_file in img_files:
                # S3 버킷에 이미지 업로드
                with Image.open(img_file) as im:
                    channels = im.mode
                    if channels == "RGBA":
                        # 알파 채널 제거하고 RGB 형식으로 변환
                        image = image.convert("RGB")
                    im_jpeg = BytesIO()
                    im.save(im_jpeg, 'JPEG')
                    im_jpeg.seek(0)
                key = request.data.get("user_id") + str(datetime.now()).replace('.', '').replace(" ", "") + "." + "jpeg"
                img_url = upload_image_to_s3(im_jpeg, key, ExtraArgs={'ContentType': "image/jpeg"})
                img_urls.append(img_url)

            # 이미지 URL과 닉네임을 RDS MySQL에 저장
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

    def get(self, request, format=None):
        if request.data.get('result_image_id') is not None and request.data.get('user_id') is not None:
            pk = request.data.get('result_image_id')
            fk = request.data.get('user_id')

            try:
                image_origin = Image_origin.objects.get(id=pk,
                                                        user_id=fk,
                                                        deleted_at__isnull=True)
            except:
                # 찾지 못한 경우 HTTP_400
                return Response(status=status.HTTP_400_BAD_REQUEST)
            serializer = UploadedImageSerializer(image_origin)

            picture = {
                'picture1': serializer.data.get('url_1'),
                'picture2': serializer.data.get('url_2'),
                'picture3': serializer.data.get('url_3'),
                'picture4': serializer.data.get('url_4'),
            }
            return Response(picture, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class AiExecute(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        image_origin_id = request.data.get("image_origin_id")
        image_origin_id_picle = pickle.dumps(image_origin_id)

        origin_img = Image.open(io.BytesIO(request.FILES.get("image").read()))
        origin_img_pickle = pickle.dumps(origin_img)

        """result1 = model1_execute.delay(origin_img_pickle)
        result2 = model2_execute.delay(origin_img_pickle)
        result3 = model3_execute.delay(origin_img_pickle)"""

        result = model_execute.apply_async(args=(origin_img_pickle, image_origin_id_picle))

        while True:
            if result.ready():
                break
            time.sleep(1)
        result1 = result.result
        if result:
            return Response(result1, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    """    while True:
            if result1.ready() and result2.ready() and result3.ready():
                break
            time.sleep(1)

        url1 = result1.result
        url2 = result2.result
        url3 = result3.result
        data = {
            "image_origin_id": image_origin_id,
            "result_url_1": url1,
            "result_url_2": url2,
            "result_url_3": url3
        }

        serializer = Ai_modelSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
"""
