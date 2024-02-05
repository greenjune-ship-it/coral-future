# api/urls.py
from django.urls import path, include
from api.views import BioSamplesApiView, CheckAuthenticationApiView, \
    ObservationApiView, UserCartApiView

urlpatterns = [
    path('auth/', include([
        path('', include('rest_framework.urls')),
        path('cart/', UserCartApiView.as_view()),
        path('status/', CheckAuthenticationApiView.as_view()),
    ])),
    path('public/', include([
        path('biosamples/', BioSamplesApiView.as_view()),
        path('observations/', ObservationApiView.as_view())
    ]))
]
