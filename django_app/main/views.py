from django.conf import settings
from django.shortcuts import render


def home(request):
    context = {
        'CONTACT_EMAIL_ADDRESS': settings.CONTACT_EMAIL_ADDRESS,
        # Add other variables as needed
    }
    return render(request, "main/home.html", context)


def redirect_to_react(request):
    hostname = settings.ALLOWED_HOSTS[0]
    if hostname == 'localhost':
        react_host = f'http://{hostname}:3000'
    else:
        react_host = f'https://{hostname}:3000'
    return render(request, 'main/redirect_to_react.html',
                  {'react_host': react_host})
