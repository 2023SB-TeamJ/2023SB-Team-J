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
    source = serializers.IntegerField()

SwaggerFramePost = [
            openapi.Parameter(
                name='Authorization',
                in_=openapi.IN_HEADER,
                type=openapi.TYPE_STRING,
                required=True,
                description='Bearer {data}'
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

class SwaggerResponseFramePost(serializers.Serializer):
    origin_img_id1=serializers.IntegerField()
    url1=serializers.CharField()
    origin_img_id2 = serializers.IntegerField()
    url2 = serializers.CharField()
    origin_img_id3 = serializers.IntegerField()
    url3 = serializers.CharField()
    origin_img_id4 = serializers.IntegerField()
    url4 = serializers.CharField()

class SwaggerFrameAddPostSerializer(serializers.Serializer):
    result_image = serializers.FileField()

class SwaggerAiSelectPatchSerializer(serializers.Serializer):
    select = serializers.ListField(child=serializers.IntegerField())
    select_id = serializers.ListField(child=serializers.IntegerField())

class SwaggerResponseAiSelectPatchSerializer(serializers.Serializer):
    url1 = serializers.CharField()
    url2 = serializers.CharField()
    url3 = serializers.CharField()
    url4 = serializers.CharField()

class SwaggerFrameAiPostSerializer(serializers.Serializer):
    image_origin_id = serializers.CharField()
    image = serializers.CharField()

class SwaggerResponseFrameAiPostSerializer(serializers.Serializer):
    model1_id = serializers.IntegerField()
    model1_url = serializers.CharField()
    model2_id = serializers.IntegerField()
    model2_url = serializers.CharField()
    model3_id = serializers.IntegerField()
    model3_url = serializers.CharField()
    model4_id = serializers.IntegerField()
    model4_url = serializers.CharField()