from rest_framework import serializers
from .models import *


class UploadedImageSerializer(serializers.ModelSerializer):
    url = serializers.URLField(required=False)
    class Meta:
        model = Image_upload
        fields = ('user_id', 'url', 'created_at','state','is_selected')


class Ai_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ai_model
        fields = '__all__'