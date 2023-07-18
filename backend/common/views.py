from django.contrib.auth import get_user_model, logout, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from .serializers import UserSerializer

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
class LoginAPIView(APIView):
    permission_classes = [AllowAny]

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
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({'success': 'Successfully logged out.'}, status=status.HTTP_200_OK)
