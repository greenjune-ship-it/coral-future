# projects/admin.py
from django.contrib import admin
from projects.models import Project, Experiment, Colony, BioSample, Observation, \
    Publication, UserCart


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'registration_date', 'owner')
    search_fields = ('name', 'owner__username')


@admin.register(Experiment)
class ExperimentAdmin(admin.ModelAdmin):
    list_display = ('name', 'project', 'date')
    search_fields = ('name', 'project__name')


@admin.register(Colony)
class ColonyAdmin(admin.ModelAdmin):
    list_display = ('name', 'species', 'country', 'latitude', 'longitude')
    search_fields = ('name', 'species', 'country')


@admin.register(BioSample)
class BioSampleAdmin(admin.ModelAdmin):
    list_display = ('name', 'collection_date', 'colony')
    search_fields = ('name', 'colony__name')


@admin.register(Observation)
class ObservationAdmin(admin.ModelAdmin):
    list_display = ('experiment', 'biosample', 'condition', 'temperature', 'timepoint', 'pam_value')
    search_fields = ('experiment__name', 'biosample__name')


@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'doi')
    search_fields = ('title', 'doi')


@admin.register(UserCart)
class UserCartAdmin(admin.ModelAdmin):
    list_display = ('owner',)
