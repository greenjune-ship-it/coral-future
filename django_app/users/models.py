from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    custom_field =