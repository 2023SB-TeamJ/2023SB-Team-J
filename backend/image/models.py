from django.db import models
from django_prometheus.models import ExportModelOperationsMixin


# from backend.common.models import User
# from ..common.models import User

class Image_upload(ExportModelOperationsMixin('Image_upload'), models.Model):
    user_id = models.ForeignKey('common.User', on_delete=models.RESTRICT)
    url = models.URLField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)  # 생성일 필드 추가
    updated_at = models.DateTimeField(auto_now=True, null=True)  # 수정일 필드 추가
    state = models.BooleanField(default=1, null=False)
    is_selected = models.BooleanField(default=0, null=False)

class Ai_model(ExportModelOperationsMixin('Ai_model'), models.Model):
    image_upload_id = models.ForeignKey(Image_upload, on_delete=models.RESTRICT)
    model_name = models.CharField(max_length=20)
    model_result_url = models.URLField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)  # 생성일 필드 추가
    updated_at = models.DateTimeField(auto_now=True, null=True)  # 수정일 필드 추가
    state = models.BooleanField(default=True, null=False)
    is_selected = models.BooleanField(default=False, null=False)
