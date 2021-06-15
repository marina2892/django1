from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


class UserSerializer(HyperlinkedModelSerializer):
   class Meta:
       model = User
       fields = ['id', 'username', 'first_name', 'last_name', 'email']


class UserSerializer2(HyperlinkedModelSerializer):
   class Meta:
       model = User
       fields = ['is_superuser', 'is_staff']