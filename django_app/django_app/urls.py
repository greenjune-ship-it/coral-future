from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('main.urls')),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('api.urls')),
    path('maps/', include('maps.urls')),
    path('projects/', include('projects.urls')),
    path('user/', include('users.urls')),
]
