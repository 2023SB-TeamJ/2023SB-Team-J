import json
from datetime import timezone

from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Image_collage
from .serializers import AlbumDetailSerializer


class AlbumDetailView(APIView): #album/detail
    def put(self, request, format=None): #결과 이미지 삭제
        try:
            raw_data = request.body.decode('utf-8')

            try:
                data = json.loads(raw_data)
                user_id = data.get('user_id')
                result_image_id = data.get('result_image_id')

                if user_id is None or result_image_id is None:  # request 형식에 맞지 않는 경우
                    return Response(status=status.HTTP_400_BAD_REQUEST)

                image_collage = Image_collage.objects.get(id=result_image_id, user_id=user_id, deleted_at__isnull=True)

                image_collage.deleted_at = timezone.localtime(timezone.now())
                image_collage.save()

                return Response(status=status.HTTP_200_OK)
            except:
                # 해당 객체를 찾지 못한 경우 HTTP_400
                return Response(status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return JsonResponse({"error message": str(e)}, status=500)

    def get(self, request, format=None): #앨범 상세 조회
        try:
            result_image_id = request.data.get('result_image_id')

            try:
                image_collage = Image_collage.objects.get(id=result_image_id, deleted_at__isnull=True)
            except:
                # 찾지 못한 경우
                return Response(status=status.HTTP_400_BAD_REQUEST)
            serializer = AlbumDetailSerializer(image_collage)

            #form data로 어떻게 보내나용..?
            response = {
                "result_image": serializer.data.get('result_url'),
                "create_date": serializer.data.get('created_at')
            }
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return JsonResponse({"error message": str(e)}, status=500)