from django.urls import path
from projects.views import project_list, project_detail

urlpatterns = [
    path('', project_list, name='projects_list'),
    path('project/<int:project_id>/', project_detail, name='project_detail'),
]
