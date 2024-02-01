# api/urls.py
from django.urls import path
from api.views import check_authentication, BioSamplesApiView, \
    ObservationApiView, ObservationsByBioSampleView

urlpatterns = [
    path('auth/status', check_authentication, name='status-view'),
    path('biosamples/', BioSamplesApiView.as_view(), name='biosamples-view'),
    path('observations/', ObservationApiView.as_view(), name='observations-view'),
    path('observations-by-biosamples/', ObservationsByBioSampleView.as_view(), name='observations-by-biosamples'),
]
