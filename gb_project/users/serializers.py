from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Users

class UserSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Users
        fields = ['lastname','firstname','email']