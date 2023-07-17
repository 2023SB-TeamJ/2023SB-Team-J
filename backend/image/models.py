from django.db import models

# from backend.common.models import User
# from ..common.models import User

class Image_origin(models.Model):
    user_id = models.ForeignKey('common.User', on_delete=models.RESTRICT)
    url_1 = models.URLField(null=False)
    url_2 = models.URLField(null=False)
    url_3 = models.URLField(null=False)
    url_4 = models.URLField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)  # 생성일 필드 추가
    updated_at = models.DateTimeField(auto_now=True, null=True)  # 수정일 필드 추가
    deleted_at = models.DateTimeField(null=True)  # 삭제일 필드 추가

class Ai_model(models.Model):
    image_origin_id = models.ForeignKey(Image_origin,on_delete=models.RESTRICT)
    result_url_1 = models.URLField(null=False)
    result_url_2 = models.URLField(null=False)
    result_url_3 = models.URLField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)  # 생성일 필드 추가
    updated_at = models.DateTimeField(auto_now=True, null=True)  # 수정일 필드 추가
    deleted_at = models.DateTimeField(null=True)  # 삭제일 필드 추가

