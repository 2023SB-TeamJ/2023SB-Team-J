from django.db import models


class Image_collage(models.Model):
    user_id = models.ForeignKey('common.User', on_delete=models.RESTRICT)
    result_url = models.URLField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)  # 생성일 필드 추가
    updated_at = models.DateTimeField(auto_now=True, null=True)  # 수정일 필드 추가
    state = models.BooleanField(default=True, null=False)
    
    
# from django.db import models
#
# # Create your models here.deleted_at
# class Image_chosen(models.Model):
#     img_origin_id = models.ForeignKey('image.Image_origin', on_delete=models.RESTRICT)
#     url_1 = models.URLField(null=False)
#     url_2 = models.URLField(null=False)
#     url_3 = models.URLField(null=False)
#     url_4 = models.URLField(null=False)
#     model_chosen_1 = models.URLField(null=False)
#     model_chosen_2 = models.URLField(null=False)
#     model_chosen_3 = models.URLField(null=False)
#     model_chosen_4 = models.URLField(null=False)
#     created_at = models.DateTimeField(auto_now_add=True)  # 생성일 필드 추가
#     updated_at = models.DateTimeField(null=True, auto_now=True)  # 수정일 필드 추가
#     deleted_at = models.DateTimeField(null=True)
#
# class Image_collage(models.Model):
#     user_id = models.ForeignKey('common.User', on_delete=models.RESTRICT)
#     img_origin_id = models.ForeignKey('image.Image_origin', on_delete=models.RESTRICT)
#     result_url = models.URLField(null=False)
#     created_at = models.DateTimeField(auto_now_add=True)  # 생성일 필드 추가
#     updated_at = models.DateTimeField(auto_now=True, null=True)  # 수정일 필드 추가
#     deleted_at = models.DateTimeField(null=True)  # 삭제일 필드 추가
