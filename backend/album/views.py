import json
from datetime import datetime
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import *

class AlbumView(APIView):
  permission_classes = [AllowAny]
  def get(self, request):
    try:
      user_id = request.GET.get('user_id')
      image_collages = Image_collage.objects.filter(user_id=user_id,deleted_at__isnull=True).order_by('-created_at')
      if image_collages.exists():
        serializer = CollageImageSerializer(image_collages, many=True)
        result_urls = []
        for image_collage in serializer.data:
          data = {
            'result_url': image_collage.get("result_url"),
          }
          result_urls.append(data)
        return Response(result_urls, status=status.HTTP_200_OK)
      else:
        return Response({"error": "No images found for the user."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
      return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
