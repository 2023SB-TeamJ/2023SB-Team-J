from rest_framework import serializers
from .models import *


class UploadedImageSerializer(serializers.ModelSerializer):
    url_1 = serializers.URLField(required=False)
    url_2 = serializers.URLField(required=False)
    url_3 = serializers.URLField(required=False)
    url_4 = serializers.URLField(required=False)

    class Meta:
        model = Image_origin
        fields = ('user_id', 'url_1', 'url_2', 'url_3', 'url_4', 'created_at', 'deleted_at')


class Ai_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ai_model
        fields = '__all__'
