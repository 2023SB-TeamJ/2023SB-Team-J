import json
from datetime import datetime

from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Image_collage
from .serializers import AlbumDetailSerializer


class AlbumDetailView(APIView): #album/detail

    def put(self, request, format=None):
        try:
            raw_data = request.body.decode('utf-8')

            try:
                data = json.loads(raw_data)
                user_id = data.get('user_id')
                result_image_id = data.get('result_image_id')

                if user_id is None or result_image_id is None:  # request 형식에 맞지 않는 경우
                    return Response(status=status.HTTP_400_BAD_REQUEST)

                image_origin = Image_collage.objects.get(id=result_image_id, user_id=user_id, deleted_at__isnull=True)

                image_origin.deleted_at = datetime.now() # time 에 관해서 물어보기!!
                image_origin.save()

                return Response(status=status.HTTP_200_OK)
            except:
                # 해당 객체를 찾지 못한 경우 HTTP_400
                return Response(status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return JsonResponse({"error message": str(e)}, status=500)
