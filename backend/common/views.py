from django.contrib.auth import get_user_model, logout, login
# from django.middleware.csrf import get_token
from django.views.decorators.cache import cache_page
# from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from .serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import OutstandingToken, BlacklistedToken
from rest_framework_simplejwt.exceptions import TokenError
# from django.middleware.csrf import CsrfViewMiddleware

from rest_framework.authentication import SessionAuthentication, TokenAuthentication

User = get_user_model()

# 회원가입
class SignupAPIView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserSerializer(data=request.data) #직렬화

        # email 중복여부 판단
        #   중복 확인 시 return {'email': user.email, error 400 번대} -> 언젠가 추가

        if serializer.is_valid(): #유효한 지 확인
            user = serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 로그인
class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # 이메일 또는 비밀번호가 제공되지 않은 경우 오류 메시지를 반환합니다.
        if email is None or password is None:
            return Response({'error': 'Please provide both email and password.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email=email).first()

        # 사용자가 있는 경우 비밀번호를 확인하고 JWT 토큰을 생성합니다.
        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                'message': 'success',
                'jwt': str(refresh.access_token), # JWT 토큰을 응답 본문에 추가합니다.
            }, status=status.HTTP_200_OK)

        # 잘못된 이메일 또는 비밀번호를 입력한 경우 오류 메시지를 반환합니다.
        return Response({'message': 'Invalid email or password.'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutAPIView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        access_token = request.data.get('token')

        # 토큰이 제공되지 않은 경우 오류 메시지를 반환합니다.
        if not access_token:
            return Response({'error': 'Access token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # 제공된 토큰을 블랙리스트에 추가합니다.
            token = OutstandingToken.objects.get(token=access_token)
            token.blacklist()
            return Response({'message': 'success'}, status=status.HTTP_200_OK)

        except (OutstandingToken.DoesNotExist, TokenError):
            # 토큰이 유효하지 않은 경우나 이미 블랙리스트에 있는 경우에도 성공 메시지를 반환합니다.
            return Response({'message': 'success'}, status=status.HTTP_200_OK)

# class CsrfTokenView(APIView):
#     def get(self, request, *args, **kwargs):
#         csrf_token = get_token(request)
#         return Response({'csrftoken': csrf_token})
    
# class CsrfCookieToHeader(object):
#     def process_request(self, request):
#         csrftoken = request.COOKIES.get('csrftoken')
#         if csrftoken:
#             request.META['HTTP_X_CSRFTOKEN'] = csrftoken