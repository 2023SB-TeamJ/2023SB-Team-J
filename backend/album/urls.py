from django.urls import path
from .views import *

app_name = "album"

urlpatterns = [
    # 루트 URL 패턴
    path('detail/', AlbumDetailView.as_view(), name='detail_root'),
bumView.as_view(), name='album')
]