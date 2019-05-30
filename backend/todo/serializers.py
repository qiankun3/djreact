# todo/serializers.py

from rest_framework import serializers
from .models import todoDB

# create serializer for todo app
class todoSerializer(serializers.ModelSerializer):
    class Meta:
        model = todoDB
        fields = ('id', 'title', 'content', 'dateCreated', 'complete')
