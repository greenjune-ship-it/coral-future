# maps/views.py
from django.shortcuts import render
from projects.models import BioSample


def map_view(request):
    # Retrieve all samples from the database
    biosamples = BioSample.objects.all()

    # Create a list to store sample data with project_id
    biosample_data = []

    # Fetch project_id for each sample and create a list of dictionaries
    for biosample in biosamples:
        project_id = biosample.project.id if biosample.project else None  # Assuming 'project' is the ForeignKey in Sample model
        biosample_data.append({
            'id': biosample.id,
            'latitude': biosample.latitude,
            'longitude': biosample.longitude,
            'project_id': project_id,
        })

    # Pass sample data to the template
    return render(request, 'map.html', {'sample_data': biosample_data})
