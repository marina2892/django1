from django.db import models
from users.models import User

class Project(models.Model):
    name = models.CharField(max_length=32)
    repo_url = models.URLField(max_length=200, null=True)
    authors = models.ManyToManyField(User)

class Todo(models.Model):
    text = models.TextField()
    date_create = models.DateTimeField()
    date_update = models.DateTimeField()
    active = models.BooleanField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)



