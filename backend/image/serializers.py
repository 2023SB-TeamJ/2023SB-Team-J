from django.conf import settings
from drf_yasg import openapi
from rest_framework import serializers

from .models import *


class UploadedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image_upload
        fields = "__all__"


class Ai_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ai_model
        fields = '__all__'

class SwaggerFrameGetSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    source = serializers.IntegerField()

SwaggerFramePost = [
            openapi.Parameter(
                name='user_id',
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_INTEGER,
                description='user_id 입력',
            ),
            openapi.Parameter(
                name='url_1',
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_FILE,
                description='원본 이미지1 입력'
            ),
            openapi.Parameter(
                name='url_2',
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_FILE,
                description='원본 이미지2 입력'
            ),
            openapi.Parameter(
                name='url_3',
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_FILE,
                description='원본 이미지3 입력'
            ),
            openapi.Parameter(
                name='url_4',
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_FILE,
                description='원본 이미지4 입력'
            ),
        ]
