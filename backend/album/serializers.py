from rest_framework import serializers
from .models import Image_collage

class AlbumDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image_collage
        fields = ('user_id', 'result_url', 'created_at', 'deleted_at')
