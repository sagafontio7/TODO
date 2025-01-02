from rest_framework import serializers
from .models import Todo,User
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

User = get_user_model()
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'is_complete']

    def update(self, instance, validated_data):
        instance.is_complete = validated_data.get('is_complete', instance.is_complete)
        instance.save()
        return instance
    

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Ensure password is write-only

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def validate_email(self, value):
        """
        Validate that the email is unique and properly formatted.
        """
        if User.objects.filter(email=value).exists():
            raise ValidationError("Email is already in use.")
        return value

    def create(self, validated_data):
        """
        Override the create method to hash the password.
        """
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
