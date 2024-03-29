# projects/views.py
from django.shortcuts import render, get_object_or_404
from projects.models import BioSample, Colony, Experiment, Observation, Project, Publication


def project_list(request):
    projects = Project.objects.prefetch_related('publications')
    return render(request, 'projects/project_list.html',
                  {'projects': projects})


from django.shortcuts import render
from .models import Project, Observation

def project_detail(request, project_id):
    # Get the project object
    project = Project.objects.get(id=project_id)

    # Retrieve all experiments for the project
    experiments = project.experiments.all()

    # Retrieve all observations for the project's experiments
    observations = Observation.objects.filter(experiment__in=experiments)

    # Retrieve all colonies for the project's biosamples
    colonies = Colony.objects.filter(biosamples__observations__in=observations).distinct()

    context = {
        'project': project,
        'colonies': colonies,
        'experiments': experiments,
        'observations': observations,
    }

    return render(request, 'projects/project_detail.html', context)


