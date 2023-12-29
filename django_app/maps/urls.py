from django.urls import path
from .views import map_view

urlpatterns = [
    path('', map_view, name='maps'),  # Use /map for the map view
    # Add other URL patterns as needed
]
