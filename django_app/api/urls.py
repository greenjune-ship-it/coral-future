from django.urls import path
from api.views import CustomApiView

urlpatterns = [
    path('check-authentication/', CustomApiView.as_view(), name='api-view'),
]