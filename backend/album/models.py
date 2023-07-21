from django.db import models


# Create your models here.

class Image_collage(models.Model):
    user_id = models.ForeignKey('common.User', on_delete=models.RESTRICT)
    result_url = models.URLField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)  # 생성일 필드 추가
    updated_at = models.DateTimeField(auto_now=True, null=True)  # 수정일 필드 추가
    state = models.BooleanField(default=True, null=False)
