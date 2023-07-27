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


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def validate(cls, attrs):
        data = super().validate(attrs)

        user = cls.user
        # Add custom claims to the token's payload
        data['user_id'] = user.id
        data['nickname'] = user.nickname

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer