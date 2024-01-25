# api/views.py
from django.http import JsonResponse
from django.views import View
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from projects.models import Sample


@method_decorator(csrf_exempt)
def get_user_status(request, *args, **kwargs):
    # If the code reaches here, the user is authenticated
    user = request.user
    # Your logic for handling the authenticated user goes here
    response_data = {
        'username': user.username,
        'is_authenticated': True,
    }
    return JsonResponse(response_data)


@method_decorator(login_required)
def get_samples(request):
    samples = Sample.objects.values(
        'project_id',  # Use 'project_id' to get the ID of the related Project
        'country',
        'species',
        'latitude',
        'longitude',
        'collection_date'
    )
    return JsonResponse(list(samples), safe=False)
