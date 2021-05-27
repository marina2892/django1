from rest_framework import viewsets
from rest_framework import mixins
from .models import User
from .serializers import UserSerializer
from rest_framework.pagination import LimitOffsetPagination

class UserLimitOffsetPagination(LimitOffsetPagination):
   default_limit = 3



class UserModelViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin,mixins.UpdateModelMixin):
   queryset = User.objects.all()
   serializer_class = UserSerializer
   pagination_class = UserLimitOffsetPagination
