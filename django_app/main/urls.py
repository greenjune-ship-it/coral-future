from django.urls import path
from main.views import home, redirect_to_react

urlpatterns = [
    path('', home, name='home'),
    path('redirect-to-react/', redirect_to_react, name='redirect_to_react'),
]
