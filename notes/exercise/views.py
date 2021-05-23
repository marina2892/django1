from rest_framework.viewsets import ModelViewSet
from .models import *
from .serializers import *

class ProjectViewSet(ModelViewSet):
   queryset = Project.objects.all()
   serializer_class = ProjectSerializer

class TodoViewSet(ModelViewSet):
   queryset = Todo.objects.all()
   serializer_class = TodoSerializer
