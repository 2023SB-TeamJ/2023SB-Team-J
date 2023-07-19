from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "nickname", "password", "created_at", "deleted_at", "updated_at")
        extra_kwargs = {
            "nickname": {"write_only": True},
            "password": {"write_only": True},
            "created_at": {"read_only": True},
            "deleted_at": {"read_only": True},
            "updated_at": {"read_only": True},
            # "is_active":{"read_only": True}
        }

    def create(self, validated_data):
        nickname = validated_data.pop('nickname', "이름없음")
        user = User.objects.create_user(nickname=nickname, is_active=True, **validated_data)
        return user
