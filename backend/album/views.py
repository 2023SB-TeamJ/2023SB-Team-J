import json
from django.utils import timezone
from datetime import datetime

from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Image_collage
from .serializers import AlbumDetailSerializer


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

            image_collage = Image_collage.objects.get(id=result_image_id, user_id=user_id, state=1)
        except:
            # 해당 객체를 찾지 못한 경우 HTTP_400
            return Response({"error" : "해당되는 객체가 존재하지 않습니다."}, status=status.HTTP_400_BAD_REQUEST)
        # serializer = AlbumDetailSerializer(image_collage)

        image_collage.state = 0
        image_collage.save()

        return Response(status=status.HTTP_200_OK)


    def get(self, request, format=None): #앨범 상세 조회

        result_image_id = request.GET.get('result_image_id')
        try:
            image_collage = Image_collage.objects.get(id=result_image_id, state=1)
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
