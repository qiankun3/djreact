# todo/serializers.py

from rest_framework import serializers
from .models import todoDB

class todoSerializer(serializers.ModelSerializer):
    class Meta:
        model = todoDB
        fields = ('id', 'title', 'content', 'dateCreated', 'complete')