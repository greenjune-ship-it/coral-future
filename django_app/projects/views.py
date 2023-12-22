# projects/views.py
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from projects.models import Project

@login_required
def project_list(request):
    projects = Project.objects.all()
    return render(request, 'projects/project_list.html', {'projects': projects})