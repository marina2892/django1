from rest_framework import viewsets
from rest_framework import mixins
from .models import *
from .serializers import *
from rest_framework.pagination import LimitOffsetPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response

class ProjectLimitOffsetPagination(LimitOffsetPagination):
   default_limit = 10

class TodoLimitOffsetPagination(LimitOffsetPagination):
   default_limit = 20

class ProjectViewSet(viewsets.ModelViewSet):
   queryset = Project.objects.all()
   serializer_class = ProjectSerializer
   pagination_class = ProjectLimitOffsetPagination
   filter_backends = [DjangoFilterBackend]
   filterset_fields = ['name']

class TodoViewSet(viewsets.ModelViewSet):
   queryset = Todo.objects.all()
   serializer_class = TodoSerializer
   pagination_class = TodoLimitOffsetPagination

   filter_backends = [DjangoFilterBackend]
   filterset_fields = ['project']


   def destroy(self, request, pk=None):
      todo_row = Todo.objects.get(pk=pk)
      todo_row.active = 0
      todo_row.save(update_fields=["active"])
      return Response({'status': 1})







