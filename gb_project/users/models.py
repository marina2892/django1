from django.db import models


class Users(models.Model):
    firstname = models.CharField(max_length=64)
    lastname = models.CharField(max_length=64)
    email = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return f"{self.firstname} {self.lasввtname} {self.email}"


