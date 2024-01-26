# api/urls.py
from django.urls import path
from api.views import check_authentication, BioSamplesApiView

urlpatterns = [
    path('auth/status', check_authentication, name='status-view'),
    path('biosamples/', BioSamplesApiView.as_view(), name='biosamples-view')
]