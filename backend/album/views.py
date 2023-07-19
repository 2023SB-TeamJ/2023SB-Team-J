import json
from django.utils import timezone
from datetime import datetime
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import *

class AlbumView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        try:
            user_id = request.data.get('user_id')  # 변경된 부분: request.GET 대신 request.data 사용
            if not user_id:  # user_id가 제공되지 않았을 경우에 대한 처리
                return Response({"error": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)
            image_collages = Image_collage.objects.filter(user_id=user_id, deleted_at__isnull=True).order_by('-created_at')
            if image_collages.exists():
                serializer = CollageImageSerializer(image_collages, many=True)
                result_urls = []
                for image_collage in serializer.data:
                    data = {
                        'result_url': image_collage.get("result_url"),
                        'result_image_id' :  image_collage.get("result_image_id"),
                    }
                    result_urls.append(data)
                return Response(result_urls, status=status.HTTP_200_OK)
            else:
                return Response({"error": "No images found for the user."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AlbumDetailView(APIView): #album/detail
    permission_classes = [AllowAny]

    def put(self, request, format=None): #결과 이미지 삭제
        raw_data = request.body.decode('utf-8')
        try:
            data = json.loads(raw_data)
            user_id = data.get('user_id')
            result_image_id = data.get('result_image_id')

            if user_id is None or result_image_id is None:  # request 형식에 맞지 않는 경우
                return Response({"error" : "request 형식에 맞지 않습니다."}, status=status.HTTP_400_BAD_REQUEST)

            image_collage = Image_collage.objects.get(id=result_image_id, user_id=user_id, deleted_at__isnull=True)
        except:
            # 해당 객체를 찾지 못한 경우 HTTP_400
            return Response({"error" : "해당되는 객체가 존재하지 않습니다."}, status=status.HTTP_400_BAD_REQUEST)
        # serializer = AlbumDetailSerializer(image_collage)

        image_collage.deleted_at = timezone.localtime(timezone.now())
        image_collage.save()

        return Response(status=status.HTTP_200_OK)


    def get(self, request): #앨범 상세 조회 None

        result_image_id = request.GET.get('result_image_id')
        print(result_image_id)
        try:
            image_collage = Image_collage.objects.get(id=result_image_id, deleted_at__isnull=True)
        except:
            # 찾지 못한 경우
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = AlbumDetailSerializer(image_collage)

        # formdata 형식으로 보내기
        response = {
            "result_image": serializer.data.get('result_url'),
            "create_date": serializer.data.get('created_at')
        }

        return Response(response, status=status.HTTP_200_OK)