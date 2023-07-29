from django.urls import path
from django.contrib.auth import views as auth_views

from .views import LoginAPIView, LogoutAPIView, SignupAPIView

app_name = 'common'

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='login'),
    path('signup/', SignupAPIView.as_view(), name='signup'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    # path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
]
