from django.urls import path
from django.contrib.auth import views as auth_views

# from .views import LoginAPIView, LogoutAPIView, SignupAPIView
from .views import LoginAPIView, SignupAPIView

app_name = 'common'

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='login'),
    # path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('signup/', SignupAPIView.as_view(), name='signup'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('api/get-csrf-token/', CsrfTokenView.as_view(), name='get-csrf-token'),

]
