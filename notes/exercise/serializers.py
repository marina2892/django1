from rest_framework import serializers
from .models import *
from users.serializers import UserSerializer


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
   #authors = serializers.StringRelatedField(many=True)

   class Meta:
       model = Project
       fields = ['name']


class TodoSerializer(serializers.HyperlinkedModelSerializer):
   project = ProjectSerializer()
   user = UserSerializer()

   class Meta:
       model = Todo
       fields = '__all__'




