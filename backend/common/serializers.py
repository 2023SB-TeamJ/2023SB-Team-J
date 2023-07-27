from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

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


# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def validate(cls, attrs):
#         token = super().get_token(user)
#
#         user = attrs['users']
#         # Add custom claims to the token's payload
#         token['user_id'] = user.id
#         token['nickname'] = user.nickname
#
#         return token