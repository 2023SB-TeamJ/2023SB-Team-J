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
