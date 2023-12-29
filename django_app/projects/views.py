# projects/views.py
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from projects.models import Project, Sample, Observation

@login_required
def project_list(request):
    projects = Project.objects.all()
    return render(request, 'projects/project_list.html', {'projects': projects})

@login_required
def project_detail(request, project_id):
    project = get_object_or_404(Project, pk=project_id)
    # Get the count of samples for the project
    sample_count = Sample.objects.filter(project=project).count()

    # Get the count of observations for the project
    observation_count = Observation.objects.filter(sample__project=project).count()

    context = {'project': project, 'sample_count': sample_count, 'observation_count': observation_count}
    return render(request, 'projects/project_detail.html', context)