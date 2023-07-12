from django.conf import settings
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
