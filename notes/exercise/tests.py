import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import TodoViewSet
from .models import *
from users.models import User as user_cust

class TestTodoViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = TodoViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        todo = mixer.blend(Todo)
        client = APIClient()
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        client.login(username='admin', password='admin123456')
        response = client.put(f'/api/todo/{todo.id}/', {'text': 'put_text'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = Todo.objects.get(id=todo.id)
        self.assertEqual(todo.text, 'put_text')
        client.logout()

class TestTodo2ViewSet(APITestCase):

    def test_edit_todo(self):
        user = mixer.blend(user_cust)
        todo = mixer.blend(Todo)
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/todo/{todo.id}/', {'text': 'put_text2', 'user': user.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = Todo.objects.get(id=todo.id)
        self.assertEqual(todo.text, 'put_text2')
        self.assertEqual(todo.user, user.id)





