from rest_framework import serializers
from .models import ChatModel

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatModel
        fields = '__all__' 
    def create(self, validated_data):
        user = self.context['request'].user
        # Create and return the new ChatModel instance
        return ChatModel.objects.create(user=user, **validated_data)    