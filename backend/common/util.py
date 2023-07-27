import jwt

from backend_project.settings import SECRET_KEY
from .models import User as user

def user_token_to_data(token):
    payload = jwt.decode(token, SECRET_KEY, algorithms='HS256')
    return payload["user_id"]

def user_find_by_id(user_id):
    return user.objects.filter(id=user_id)

def user_find_by_email(email):
    return user.objects.filter(email=email)