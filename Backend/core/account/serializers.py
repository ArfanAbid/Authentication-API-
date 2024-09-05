from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.password_validation import validate_password

class UserRegistrationSerializer(serializers.ModelSerializer):
    '''
    serializer for RegisterUser
    '''
    confirmPassword = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser # better to use Serializer instead of ModelSerializer
        fields = ["email", "name", "password", "confirmPassword", "tc"]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        if CustomUser.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({'Error': 'Email already exists'})

        if data['password'] != data['confirmPassword']:
            raise serializers.ValidationError({'Error': 'Passwords and confirm Password do not match'})

        return data

    def create(self, data):
        user = CustomUser(
            email=data['email'],
            name=data['name'],
            tc=data['tc']
        )
        user.set_password(data['password']) # for hashing passwords
        user.save()
        return user



class UserLoginSerializer(serializers.Serializer):
    '''
    serializer for LoginUser
    '''
    
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField()
    class Meta:
        model = CustomUser
        fields = ["email","password"]

    def validate(self,data):
        email=data.get('email')
        password=data.get('password')

        if not CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError( {'Error':'Email does not exist'})
        
        user=CustomUser.objects.get(email=email)
        if not user.check_password(password):
            raise serializers.ValidationError({'Error':'Incorrect password!'})
        
        return data
    
class UserProfileSerializer(serializers.ModelSerializer):
    '''
    serializer for User profile
    '''
    class Meta:
        model=CustomUser
        fields=['id', 'name','email']     
        

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        user = self.context['request'].user

        # Validate the old password
        if not user.check_password(data['old_password']):
            raise serializers.ValidationError({"old_password": "Old password is not correct."})

        #validate_password(data['new_password'], user=user)

        # Ensure the new password is not the same as the old password
        if data['old_password'] == data['new_password']:
            raise serializers.ValidationError({"new_password": "The new password cannot be the same as the old password."})

        return data

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user