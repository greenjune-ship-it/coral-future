from django.urls import path
from .views import project_list

urlpatterns = [
    path('', project_list, name='projects'),
]
