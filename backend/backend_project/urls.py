
from django.contrib import admin
from django.urls import path, include, re_path

# swagger 용
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from django.conf.urls.static import static
from django.conf import settings

# swagger 관련 함수
schema_view = get_schema_view(
    openapi.Info(
        title="ThisIs4You-teamj",
        default_version="project_version: v1",
        description="ThisIs4You API 문서",
        terms_of_service="https://www.google.com/policies/terms/",
        license=openapi.License(name="teamj"),  # 부가정보
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)


urlpatterns = [
    # swagger 관련 url
    path('swagger.json', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('admin/', admin.site.urls),
    path('api/v1/frame/', include('image.urls')),
    path('api/v1/', include('common.urls')),
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
