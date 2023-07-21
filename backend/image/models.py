from django.db import models


# from backend.common.models import User
# from ..common.models import User

class Image_upload(models.Model):
    user_id = models.ForeignKey('common.User', on_delete=models.RESTRICT)
    url = models.URLField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)  # 생성일 필드 추가
    updated_at = models.DateTimeField(auto_now=True, null=True)  # 수정일 필드 추가
    state = models.BooleanField(default=True, null=False)
    is_selected = models.BooleanField(default=False, null=False)

class Ai_model(models.Model):
    image_upload_id = models.ForeignKey("image.Image_upload", on_delete=models.RESTRICT)
    model_name = models.CharField(max_length=10)
    model_result_url = models.URLField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)  # 생성일 필드 추가
    updated_at = models.DateTimeField(auto_now=True, null=True)  # 수정일 필드 추가
    state = models.BooleanField(default=True, null=False)
    is_selected = models.BooleanField(default=False, null=False)