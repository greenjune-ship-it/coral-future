from django.urls import path
from projects.views import project_list, project_detail, create_project

urlpatterns = [
    path('', project_list, name='projects'),
    path('project/<int:project_id>/', project_detail, name='project_detail'),
    path('create/', create_project, name='project_create'),
]
