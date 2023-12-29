from django.shortcuts import render
from projects.models import Sample


def map_view(request):
    # Retrieve all samples from the database
    samples = Sample.objects.all()

    # Create a dictionary to store sample data with project_id
    sample_data = []

    # Fetch project_id for each sample and create a list of dictionaries
    for sample in samples:
        project_id = sample.project.id if sample.project else None  # Assuming 'project' is the ForeignKey in Sample model
        sample_data.append({
            'id': sample.id,
            'latitude': sample.latitude,
            'longitude': sample.longitude,
            'project_id': project_id,
        })

    # Pass sample data to the template
    return render(request, 'map.html', {'samples': samples})
