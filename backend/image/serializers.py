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
                in_=openapi.IN_FORM,
                type=openapi.TYPE_INTEGER,
                description='user_id 입력',
            ),
            openapi.Parameter(
                name='image1',
                in_=openapi.IN_FORM,
                type=openapi.TYPE_FILE,
                description='원본 이미지 입력'
            ),
            openapi.Parameter(
                name='image2',
                in_=openapi.IN_FORM,
                type=openapi.TYPE_FILE,
                description='원본 이미지 입력'
            ),
            openapi.Parameter(
                name='image3',
                in_=openapi.IN_FORM,
                type=openapi.TYPE_FILE,
                description='원본 이미지 입력'
            ),
            openapi.Parameter(
                name='image4',
                in_=openapi.IN_FORM,
                type=openapi.TYPE_FILE,
                description='원본 이미지 입력'
            ),

        ]

SwaggerFrameAddPost = [
            openapi.Parameter(
                name='user_id',
                in_=openapi.IN_FORM,
                type=openapi.TYPE_INTEGER,
                description='user_id 입력',
            ),
            openapi.Parameter(
                name='result_image',
                in_=openapi.IN_FORM,
                type=openapi.TYPE_FILE,
                description='결과 이미지 입력'
            )
        ]

class SwaggerAiSelectPatchSerializer(serializers.Serializer):
    select = serializers.ListField()
    select_id = serializers.ListField()

class SwaggerFrameAiPostSerializer(serializers.Serializer):
    image_origin_ids = serializers.ListField()
    image = serializers.ListField()