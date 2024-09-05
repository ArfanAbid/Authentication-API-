from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import ChatModel
from chatbot.serializers import ChatSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()
# Create your views here.

class ChatbotView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChatSerializer(data=request.data, context={'request': request})
        try:
            if serializer.is_valid():
                # Save the user message
                chat_message = serializer.save()

                # Initialize Groq client
                client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

                # Send message to Groq API
                chat_completion = client.chat.completions.create(
                    messages=[
                        {
                            "role": "user",
                            "content": chat_message.message,
                        }
                    ],
                    model="llama3-8b-8192",
                )

                # Get the response and update the ChatModel instance
                bot_response = chat_completion.choices[0].message.content
                chat_message.response = bot_response
                chat_message.save()

                # Return the updated ChatModel instance
                return Response(ChatSerializer(chat_message).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)