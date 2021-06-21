from rest_framework import viewsets
from rest_framework import mixins
from .models import User
from .serializers import UserSerializer, UserSerializer2
from rest_framework.pagination import LimitOffsetPagination

class UserLimitOffsetPagination(LimitOffsetPagination):
   default_limit = 3


#нет create - viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin,mixins.UpdateModelMixin
class UserModelViewSet(viewsets.ModelViewSet):
   queryset = User.objects.all()
   serializer_class = UserSerializer
   pagination_class = UserLimitOffsetPagination

   def get_serializer_class(self):
      if self.request.version == '0.2':
         return UserSerializer2
      return UserSerializer

