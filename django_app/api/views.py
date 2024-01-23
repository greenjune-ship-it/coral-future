# api/views.py
from django.http import JsonResponse
from django.views import View
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

class CustomApiView(View):
    @method_decorator(csrf_exempt)
    @method_decorator(login_required)
    def get(self, request, *args, **kwargs):
        # If the code reaches here, the user is authenticated
        user = request.user
        # Your logic for handling the authenticated user goes here
        response_data = {
            'username': user.username,
            'is_authenticated': True,
        }
        return JsonResponse(response_data)
