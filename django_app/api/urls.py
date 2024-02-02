# api/urls.py
from django.urls import path, include
from api.views import CheckAuthenticationApiView, BioSamplesApiView, \
    ObservationApiView

urlpatterns = [
    path('auth/', include([
        path('', include('rest_framework.urls')),
        path('status/', CheckAuthenticationApiView.as_view()),
    ])),
    path('public/', include([
        path('biosamples/', BioSamplesApiView.as_view()),
        path('observations/', ObservationApiView.as_view())
    ]))
]
