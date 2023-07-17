from __future__ import absolute_import, unicode_literals
from celery import Celery

app = Celery('config',
             broker='amqp://guest:guest@localhost',
             backend='rpc://',
             include=['ai.aiTask'])

app.autodiscover_tasks()