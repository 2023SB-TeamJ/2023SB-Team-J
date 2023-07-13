from django.conf import settings
from drf_yasg import openapi
from rest_framework import serializers
from .models import Image_origin
from django.db.models import ForeignKey, CASCADE


class UploadedImageSerializer(serializers.ModelSerializer):
    url_1 = serializers.URLField(required=False)
    url_2 = serializers.URLField(required=False)
    url_3 = serializers.URLField(required=False)
    url_4 = serializers.URLField(required=False)
    user = ForeignKey(settings.AUTH_USER_MODEL, on_delete=CASCADE)


    class Meta:
        model = Image_origin
        fields = ('user_id', 'url_1', 'url_2', 'url_3', 'url_4', 'created_at', 'deleted_at')

#     def to_representation(self, instance):
#         self.fields['user_id'] =  UserRepresentationSerializer(read_only=True)
#         return super(UserRepresentationSerializer, self).to_representation(instance)
#
#
# class UserRepresentationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ("id")


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