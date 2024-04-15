# api/urls.py
from django.urls import path, include
from api.views import CheckAuthenticationApiView, UserCartApiView
from api.views import BioSamplesApiView, ObservationsApiView, \
    ColoniesApiView, ThermalToleranceApiView, ThermalToleranceMinMaxView, \
    ProjectsApiView

urlpatterns = [
    path('auth/', include([
        path('', include('rest_framework.urls')),
        path('cart/', UserCartApiView.as_view()),
        path('status/', CheckAuthenticationApiView.as_view()),
    ])),
    path('public/', include([
        path('biosamples/', BioSamplesApiView.as_view()),
        path('colonies/', ColoniesApiView.as_view()),
        path('observations/', ObservationsApiView.as_view()),
        path('projects/', ProjectsApiView.as_view()),
        path('thermal-tolerances/', include([
            path('', ThermalToleranceApiView.as_view()),
            # Main API view for thermal tolerances
            path('max-min/', ThermalToleranceMinMaxView.as_view()),
            # Nested URL for max-min values
        ])),
    ]))
]
