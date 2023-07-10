from django.urls import path
from .views import LoginAPIView, LogoutAPIView, SignupAPIView

app_name = 'common'

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='login'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('signup/', SignupAPIView.as_view(), name='signup'),
]
