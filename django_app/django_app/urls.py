from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls')),
    path('user/', include('users.urls')),
    path('maps/', include('maps.urls')),
    path('projects/', include('projects.urls')),
]
