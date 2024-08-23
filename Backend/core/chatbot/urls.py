from django.urls import path
from .views import *

urlpatterns = [
    path('chat/', ChatbotView.as_view(), name='chat'),
]