from django.urls import path
from image.views import UploadImageView

urlpatterns = [
    # 루트 URL 패턴
    path('', UploadImageView.as_view(), name='upload_root'),
]