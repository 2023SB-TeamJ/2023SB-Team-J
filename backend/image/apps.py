from django.apps import AppConfig
from image.AiModels import Models


class ImgsAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'image'
    model = Models()
