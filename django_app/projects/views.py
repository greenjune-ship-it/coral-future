from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from projects.models import Project, Experiment, Sample, Observation


# @login_required
def project_list(request):
    projects = Project.objects.all()
    return render(request, 'projects/project_list.html',
                  {'projects': projects})


# @login_required
def project_detail(request, project_id):
    project = get_object_or_404(Project, pk=project_id)

    experiments = Experiment.objects.filter(project=project)
    samples = Sample.objects.filter(project=project)
    observations = Observation.objects.filter(sample__project=project)

    context = {'project': project,
               'experiments': experiments,
               'samples': samples,
               'observations': observations}
    return render(request, 'projects/project_detail.html', context)
