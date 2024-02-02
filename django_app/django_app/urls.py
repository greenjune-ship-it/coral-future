from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('main.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('projects/', include('projects.urls')),
    path('user/', include('users.urls')),
]
