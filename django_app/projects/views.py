# projects/views.py
from django.shortcuts import render, get_object_or_404
from projects.models import Project, Experiment, BioSample, Observation


# @login_required
def project_list(request):
    projects = Project.objects.all()
    return render(request, 'projects/project_list.html',
                  {'projects': projects})


# @login_required
def project_detail(request, project_id):
    project = get_object_or_404(Project, pk=project_id)

    experiments = Experiment.objects.filter(project=project)
    biosamples = BioSample.objects.filter(project=project)
    observations = Observation.objects.filter(biosample__project=project)

    context = {'project': project,
               'experiments': experiments,
               'biosamples': biosamples,
               'observations': observations}
    return render(request, 'projects/project_detail.html', context)
