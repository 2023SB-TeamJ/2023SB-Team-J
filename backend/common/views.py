from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, SwaggerLoginPostSerializer, SwaggerLogoutPostSerializer, SwaggerSignupPostSerializer
from drf_yasg.utils import swagger_auto_schema

# 회원가입
class SignupAPIView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(query_serializer=SwaggerSignupPostSerializer, responses={"200": SwaggerSignupPostSerializer})
    def post(self, request):
        serializer = UserSerializer(data=request.data) #직렬화
        if serializer.is_valid(): #유효한 지 확인
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#로그인
class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(query_serializer=SwaggerLoginPostSerializer, responses={"200": SwaggerLoginPostSerializer})
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password) #회원 검증
        if user:
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                status=status.HTTP_200_OK
            )
        return Response(
            {'detail': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED
        )


#로그아웃
class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated] #권한 있는 사람, 로그인 한 사람만 접근 가능

    @swagger_auto_schema(query_serializer=SwaggerLogoutPostSerializer, responses={"200": SwaggerLogoutPostSerializer})
    def post(self, request):
        try:
            # Blacklist the refresh token to invalidate it
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist() #refresh 토큰 삭제

            return Response(status=status.HTTP_200_OK)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)