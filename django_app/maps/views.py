from django.shortcuts import render
from projects.models import Sample


def map_view(request):
    # Retrieve all samples from the database
    samples = Sample.objects.all()

    # Pass sample data to the template
    return render(request, 'map.html', {'samples': samples})
