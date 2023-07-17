from django.urls import path
from .views import *

urlpatterns = [
    path('ai/', AiExecute.as_view()),
    path('', UploadImageView.as_view(), name='upload_image'),
]
