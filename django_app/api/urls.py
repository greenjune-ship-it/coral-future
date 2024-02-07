# api/urls.py
from django.urls import path, include
from api.views import CheckAuthenticationApiView, UserCartApiView
from api.views import BioSamplesApiView, ColoniesApiView, ObservationsApiView

urlpatterns = [
    path('auth/', include([
        path('', include('rest_framework.urls')),
        path('cart/', UserCartApiView.as_view()),
        path('status/', CheckAuthenticationApiView.as_view()),
    ])),
    path('public/', include([
        path('biosamples/', BioSamplesApiView.as_view()),
        path('colonies/', ColoniesApiView.as_view()),
        path('observations/', ObservationsApiView.as_view())
    ]))
]
