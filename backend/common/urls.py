from django.urls import path
from django.contrib.auth import views as auth_views

from .views import LoginAPIView, LogoutAPIView, SignupAPIView, CsrfTokenView 
# from .views import LoginAPIView, SignupAPIView, CsrfTokenView  # CsrfTokenView를 추가

app_name = 'common'

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='login'),
    path('signup/', SignupAPIView.as_view(), name='signup'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('api/get-csrf-token/', CsrfTokenView.as_view(), name='get-csrf-token'),  # CsrfTokenView에 대한 경로 추가
]
