from rest_framework import serializers
from .models import Image_collage

class AlbumDetailSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    class Meta:
        model = Image_collage
        fields = ('result_url', 'created_at', 'state', 'user_id')


class CollageImageSerializer(serializers.ModelSerializer):
    result_url = serializers.URLField(required=False)
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Image_collage
        fields = ('user_id', 'result_url', 'created_at')