from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import *
from django.contrib.auth import authenticate,login
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import update_session_auth_hash

class UserRegistration(APIView):
    """
    API endpoint that allows users to be registered.
    """
    def post(self, request, *args, **kwargs):
        try:
            serializer=UserRegistrationSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':'Account created successfully'}, status=status.HTTP_201_CREATED)
            
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response({'message':str(e)}, status=status.HTTP_400_BAD_REQUEST)    




class UserLogin(APIView):
    """
    API endpoint that allows users to login.
    """

    def post(self, request, *args, **kwargs):
        try:
            serializer=UserLoginSerializer(data=request.data)
            if serializer.is_valid():
                email=serializer.validated_data['email']
                password=serializer.validated_data['password']
                user=authenticate(email=email, password=password)
                if user is not None:

                    #login(request, user)
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        'message': 'Successfully logged in',
                        'refresh': str(refresh),
                        'access': str(refresh.access_token)
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({'Error':'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
            
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response({'Error':str(e)}, status=status.HTTP_400_BAD_REQUEST)    
        


class UserProfile(APIView):
    """
    API endpoint that allows users to get user profile.
    """
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer=UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)   
    

class ChangePasswordView(APIView):
    """
    An endpoint for changing password.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request}) # passing requested user to sereializer so that validation logic can be handeled there

        if serializer.is_valid():
            serializer.save()
            #update_session_auth_hash(request, request.user)  # Keeps the user logged in
            return Response({"detail": "Password has been changed successfully."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)