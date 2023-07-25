from rest_framework import serializers
from .models import Image_collage

class AlbumDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image_collage
        fields = ('user_id', 'result_url', 'created_at', 'state')


class CollageImageSerializer(serializers.ModelSerializer):
    result_image_id = serializers.IntegerField(source='id')
    result_url = serializers.URLField(required=False)
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Image_collage

        fields = ('user_id', 'result_image_id', 'result_url', 'created_at', 'state')

class ResultImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image_collage
        fields = "__all__"

class SwaggerAlbumDetailGetSerializer(serializers.Serializer):
    result_image_id = serializers.IntegerField()

class SwaggerResponseAlbumDetailGetSerializer(serializers.Serializer):
    result_image = serializers.CharField()
    create_date = serializers.DateTimeField()

class SwaggerAlbumPostSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()

class SwaggerResponseAlbumPostSerializer(serializers.Serializer):
    result_url = serializers.CharField()
    result_img_id = serializers.IntegerField()

class SwaggerAlbumDetailPutSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    result_image_id = serializers.IntegerField()
