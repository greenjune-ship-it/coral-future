from django.urls import path
from api.views import get_user_status, get_samples

urlpatterns = [
    path('check-authentication/', get_user_status, name='api-view'),
    path('samples/', get_samples, name='get-samples'),
]