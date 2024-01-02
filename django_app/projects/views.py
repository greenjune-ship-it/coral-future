from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, user_passes_test
from projects.models import Project, Sample, Observation
from projects.forms import ProjectForm


# @login_required
def project_list(request):
    projects = Project.objects.all()
    return render(request, 'projects/project_list.html',
                  {'projects': projects})


# @login_required
def project_detail(request, project_id):
    project = get_object_or_404(Project, pk=project_id)
    # Get the count of samples for the project
    sample_count = Sample.objects.filter(project=project).count()

    # Get the count of observations for the project
    observation_count = Observation.objects.filter(
        sample__project=project).count()

    context = {'project': project, 'sample_count': sample_count,
               'observation_count': observation_count}
    return render(request, 'projects/project_detail.html', context)


@user_passes_test(lambda u: u.is_superuser)
def create_project(request):
    if request.method == 'POST':
        form = ProjectForm(request.POST)
        if form.is_valid():
            project = form.save()
            return redirect('project_detail', project.id)
    else:
        form = ProjectForm()

    return render(request, 'projects/create_project.html', {'form': form})

@user_passes_test(lambda u: u.is_superuser)
def delete_project(request, project_id):
    project = get_object_or_404(Project, id=project_id)

    if request.method == 'POST':
        # If the form is submitted, delete the project
        project.delete()
        return redirect('projects_list')

    # If the form is not submitted, render the confirmation template
    return render(request, 'projects/delete_project_confirmation.html',
                  {'project': project})