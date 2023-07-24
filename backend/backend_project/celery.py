from __future__ import absolute_import, unicode_literals
from celery import Celery
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_project.settings')

app = Celery('config',
            broker='pyamqp://guest:guest@t4yhost',
            backend='rpc://',
            broker_connection_retry_on_startup=True,  # Add this line to enable connection retries on startup
            include=['image.AiTask'])

# app.config_from_object('django.config:settings', namespace='CELERY')

app.autodiscover_tasks()

