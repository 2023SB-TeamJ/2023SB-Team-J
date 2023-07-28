from datetime import datetime, timedelta

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

# def user_generate_access_token(user_data):
#     return jwt.encode(
#         {'id': str(user_data.id), 'type': 'access_token', 'exp': datetime.utcnow() + timedelta(minutes=30)},
#         SECRET_KEY,
#         'HS256'
#     ).decode('utf-8')