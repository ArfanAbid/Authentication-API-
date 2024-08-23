from django.db import models
from account.models import CustomUser

# Create your models here.

class ChatModel(models.Model):
    user=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    message = models.TextField()
    response=models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message