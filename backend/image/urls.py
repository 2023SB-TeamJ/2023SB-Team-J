from django.urls import path
from .views import UploadImageView

urlpatterns = [
    path('api/v1/frame/', UploadImageView.as_view(), name='upload_image'),
    # 루트 URL 패턴
    path('', UploadImageView.as_view(), name='root'),
]