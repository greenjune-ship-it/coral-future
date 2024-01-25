from django.conf import settings
from django.shortcuts import render


def home(request):
    context = {
        'CONTACT_EMAIL_ADDRESS': settings.CONTACT_EMAIL_ADDRESS,
        # Add other variables as needed
    }
    return render(request, "main/home.html", context)


def redirect_to_react(request):
    return render(request, 'main/redirect_to_react.html',
                  {'react_host': f'http://{settings.ALLOWED_HOSTS[0]}:3000'})
