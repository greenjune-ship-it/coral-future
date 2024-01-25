# api/urls.py
from django.urls import path
from api.views import check_authentication, SamplesApiView

urlpatterns = [
    path('auth/status', check_authentication, name='status-view'),
    path('samples/', SamplesApiView.as_view(), name='samples-view')
]