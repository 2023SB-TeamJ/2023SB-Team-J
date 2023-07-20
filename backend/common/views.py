from django.contrib.auth import get_user_model, logout, login
from django.middleware.csrf import get_token
from django.views.decorators.cache import cache_page
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from .serializers import UserSerializer
from django.middleware.csrf import CsrfViewMiddleware

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



#로그인
@method_decorator(ensure_csrf_cookie, name='dispatch')
class LoginAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        csrf_token = get_token(request)
        print(csrf_token)
        return Response({'csrftoken': csrf_token})

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if email is None or password is None:
            return Response({'error': 'Please provide both email and password.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email=email).first()

        if user and user.check_password(password):
            login(request, user, backend='django.contrib.auth.backends.ModelBackend')

            return Response({'nickname': user.nickname}, status=status.HTTP_200_OK)

        return Response({'message': '이메일 또는 비밀번호가 올바르지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

#로그아웃
class LogoutAPIView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        csrf_token = get_token(request)  # CSRF 토큰 가져오기
        print("Server CSRF Token:", csrf_token)

        received_token = request.META.get('HTTP_X_CSRFTOKEN')  # 클라이언트에서 전달된 토큰 값
        print('Received CSRF token:', received_token)

        # CSRF 토큰 유효성 검사
        csrf_middleware = CsrfViewMiddleware()
        csrf_middleware.process_view(request, None, None, None)
        if not request.META.get('CSRF_COOKIE_USED', False):
            return Response({'error': 'CSRF 토큰 유효성 검사 실패.'}, status=status.HTTP_403_FORBIDDEN)

        request.user.auth_token.delete()  # 토큰 인증을 사용하고 있다고 가정합니다.
        print(">>>> 로그아웃 >>>> ")
        return Response(status=status.HTTP_200_OK)

class CsrfTokenView(APIView):
    def get(self, request, *args, **kwargs):
        csrf_token = get_token(request)
        return Response({'csrftoken': csrf_token})
    
class CsrfCookieToHeader(object):
    def process_request(self, request):
        csrftoken = request.COOKIES.get('csrftoken')
        if csrftoken:
            request.META['HTTP_X_CSRFTOKEN'] = csrftoken