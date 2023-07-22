from django.urls import path
from .views import *

urlpatterns = [
    path('ai/', AiExecute.as_view(), name='ai'),
    path('add/', ResultImageView.as_view(), name='resultimage'),
    path('', UploadImageView.as_view(), name='frame'),
    path("ai/select/", SelectImage.as_view(), name="select_image")
]

