from __future__ import absolute_import, unicode_literals
from celery import Celery
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_project.settings')

app = Celery('config',
             broker='amqp://guest:guest@localhost',
             backend='rpc://',
             include=['image.AiTask'])

app.autodiscover_tasks()