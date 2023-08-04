from rest_framework import serializers
from django.contrib.auth import get_user_model

from drf_yasg import openapi


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "nickname", "password", "created_at", "updated_at", "state")
        extra_kwargs = {
            "nickname": {"write_only": True},
            "password": {"write_only": True},
            "created_at": {"read_only": True},
            "updated_at": {"read_only": True},
            "state":{"read_only": True}
        }

    def create(self, validated_data):
        nickname = validated_data.pop('nickname', "이름없음")
        user = User.objects.create_user(nickname=nickname, state=True, **validated_data)
        return user


class SwaggerLoginPostSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

class SwaggerResponseLoginPostSerializer(serializers.Serializer):
    message = serializers.CharField()
    nickname = serializers.CharField()
    refresh = serializers.CharField()
    access = serializers.CharField()

class SwaggerLogoutPostSerializer(serializers.Serializer):
    refresh = serializers.CharField()

SwaggerHeader = [
        openapi.Parameter(
          name='Authorization',
          in_=openapi.IN_HEADER,
          type=openapi.TYPE_STRING,
          required=True,
          description='Bearer {data}'
      )
    ]

class SwaggerSignupPostSerializer(serializers.Serializer):
    email = serializers.CharField()
    nickname = serializers.CharField()
    password = serializers.CharField()

class SwaggerBadResponseSignupPostSerializer(serializers.Serializer):
    detail = serializers.CharField(default="invalid credentials")
