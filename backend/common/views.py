import jwt
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status

from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken

from backend_project.settings import SECRET_KEY
from drf_yasg.utils import swagger_auto_schema

User = get_user_model()

# 회원가입
class SignupAPIView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(request_body=SwaggerSignupPostSerializer, responses={"201": "", "400": SwaggerBadResponseSignupPostSerializer})
    def post(self, request):
        serializer = UserSerializer(data=request.data) #직렬화

        # email 중복여부 판단
        #   중복 확인 시 return {'email': user.email, error 400 번대} -> 언젠가 추가

        if serializer.is_valid(): #유효한 지 확인
            user = serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(request_body=SwaggerLoginPostSerializer, responses={"200": SwaggerResponseLoginPostSerializer})
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if email is None or password is None:
            return Response({'error': 'Please provide both email and password.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email=email).first()

        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)

            return Response({
                'message': 'success',
                'nickname': user.nickname,
                'refresh': str(refresh),  # Refresh 토큰을 응답 본문에 추가합니다.
                'access': str(refresh.access_token),  # Access 토큰을 응답 본문에 추가합니다.
            }, status=status.HTTP_200_OK)

        return Response({'message': 'Invalid email or password.'}, status=status.HTTP_400_BAD_REQUEST)

# 로그아웃
class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema( request_body=SwaggerLogoutPostSerializer,
                          manual_parameters= SwaggerHeader,
                          responses={"200": "", "400": ""})
    def post(self, request):
        try:
            # Blacklist the refresh token to invalidate it
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_200_OK)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)
