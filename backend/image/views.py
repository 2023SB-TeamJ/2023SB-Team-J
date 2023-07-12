import json

from django.http import JsonResponse
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UploadedImageSerializer
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
                    bucket_name = 't4y-bucket'  # S3 버킷 이름 입력
                    img_url = upload_image_to_s3(img_file, bucket_name)
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

                serializer = UploadedImageSerializer(image_origin)

                picture = {
                    'picture1': serializer.data.get('url_1'),
                    'picture2': serializer.data.get('url_2'),
                    'picture3': serializer.data.get('url_3'),
                    'picture4': serializer.data.get('url_4'),
                }
                return Response(picture, status=status.HTTP_200_OK)

            except:
                # 찾지 못한 경우 HTTP_400
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({"error message": str(e)}, status=500)
