from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'is_complete']

    def update(self, instance, validated_data):
        instance.is_complete = validated_data.get('is_complete', instance.is_complete)
        instance.save()
        return instance
