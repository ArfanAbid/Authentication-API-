from rest_framework import serializers
from .models import CustomUser

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
            raise serializers.ValidationError({'email': 'Email already exists'})

        if data['password'] != data['confirmPassword']:
            raise serializers.ValidationError({'password': 'Passwords and confirm Password do not match'})

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