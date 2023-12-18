# views.py

from django.shortcuts import render
from django.conf import settings  # Import Django settings module
from .models import Location

def map_view(request):
    # Delete existing locations
    Location.objects.all().delete()

    # Create example locations
    example_locations = [
        {'name': 'Location A', 'latitude': 37.7749, 'longitude': -122.4194},
        {'name': 'Location B', 'latitude': 34.0522, 'longitude': -118.2437},
        {'name': 'Location C', 'latitude': 40.7128, 'longitude': -74.0060},
    ]

    # Save example locations to the database
    for loc_data in example_locations:
        Location.objects.create(
            name=loc_data['name'],
            latitude=loc_data['latitude'],
            longitude=loc_data['longitude']
        )

    # Retrieve all locations from the database
    locations = Location.objects.all()

    return render(request, 'map.html', {'locations': locations})
