import graphene
from graphene_django import DjangoObjectType
from exercise.models import Project, Todo
from users.models import User


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todo = graphene.List(TodoType)


    def resolve_all_todo(root, info):
        return Todo.objects.all()

schema = graphene.Schema(query=Query)
