from rest_framework import serializers
from .models import *
from users.serializers import UserSerializer


class ProjectSerializer(serializers.ModelSerializer):
   authors = serializers.StringRelatedField(many=True)

   class Meta:
       model = Project
       fields = ['id','name', 'repo_url','authors']


class TodoSerializer(serializers.ModelSerializer):
   #project = ProjectSerializer()
   #user = UserSerializer()

   class Meta:
       model = Todo
       fields = ['text', 'date_create', 'date_update', 'active', 'project', 'user']




