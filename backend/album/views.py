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
            user_id = request.data.get('user_id')
            if not user_id:  # user_id가 제공되지 않았을 경우에 대한 처리
                return Response({"error": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)
            image_collages = Image_collage.objects.filter(user_id=user_id, state=True).order_by('-created_at')
            if image_collages.exists():
                serializer = CollageImageSerializer(image_collages, many=True)
                results = []
                for image_collage in serializer.data:
                    data = {
                        'result_image_id': image_collage.get("result_image_id"),
                        'result_url': image_collage.get("result_url"),
                    }
                    results.append(data)
                return Response(results, status=status.HTTP_200_OK)
            else:
                return Response({"error": "No images found for the user."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": e}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AlbumDetailView(APIView): #album/detail
    permission_classes = [AllowAny]

    def put(self, request, format=None): #결과 이미지 삭제
        raw_data = request.body.decode('utf-8')
        try:
            data = json.loads(raw_data)
            user_id = data.get('user_id')
            result_image_id = data.get('result_image_id')
            print(user_id, result_image_id)

            if user_id is None or result_image_id is None:  # request 형식에 맞지 않는 경우
                return Response({"error" : "request 형식에 맞지 않습니다."}, status=status.HTTP_400_BAD_REQUEST)

            image_collage = Image_collage.objects.get(id=result_image_id, user_id=user_id, state=1)
<<<<<<< HEAD
        except:
            # 해당 객체를 찾지 못한 경우 HTTP_400
            return Response({"error" : "해당되는 객체가 존재하지 않습니다."}, status=status.HTTP_400_BAD_REQUEST)
        # serializer = AlbumDetailSerializer(image_collage)
=======

        except Image_collage.DoesNotExist:
            # 찾지 못한 경우
            return Response({"error": "해당되는 객체가 존재하지 않습니다."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
>>>>>>> 867651a (feat : 결과 이미지 삭제 api 연동)

        image_collage.state = 0
        image_collage.save()

        return Response(status=status.HTTP_200_OK)


    def get(self, request): #앨범 상세 조회 None
        result_image_id = request.GET.get('result_image_id')
        if result_image_id is None:  # request 형식에 맞지 않는 경우
            return Response({"error": "request 형식에 맞지 않습니다."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            image_collage = Image_collage.objects.get(id=result_image_id, state=1)
        except Image_collage.DoesNotExist:
            # 찾지 못한 경우
            return Response({"error": "해당되는 객체가 존재하지 않습니다."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        serializer = AlbumDetailSerializer(image_collage)

        # 날짜만 추출. 시간 데이터는 반환하지 않음
        date_customed = serializer.data.get('created_at').split('T')
        date_customed = date_customed[0]

        response = {
            "result_image": serializer.data.get('result_url'),
            "create_date": date_customed
        }

        return Response(response, status=status.HTTP_200_OK)
