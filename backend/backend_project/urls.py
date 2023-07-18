
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/frame/', include('image.urls')),
    path('api/v1/', include('common.urls')),
    path('api/v1/album/', include('album.urls')),
]