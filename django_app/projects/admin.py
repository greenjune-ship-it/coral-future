# projects/admin.py
from django.contrib import admin
from projects.models import Project, Experiment, Colony, BioSample, Observation, \
    Publication, UserCart


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'registration_date')
    filter_horizontal = ('members',)


@admin.register(Experiment)
class ExperimentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'project', 'date')
    list_filter = ('project',)


@admin.register(Colony)
class ColonyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'species', 'country', 'latitude', 'longitude')
    list_filter = ('species', 'country')


@admin.register(BioSample)
class BioSampleAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'collection_date', 'colony')
    list_filter = ('colony__species', 'colony__country')


@admin.register(Observation)
class ObservationAdmin(admin.ModelAdmin):
    list_display = (
    'id', 'biosample', 'experiment', 'condition', 'temperature', 'timepoint',
    'pam_value')
    list_filter = (
    'experiment__project', 'biosample__colony__species', 'condition')


@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'year', 'doi')
    filter_horizontal = ('observations', 'projects')


@admin.register(UserCart)
class UserCartAdmin(admin.ModelAdmin):
    list_display = ('id', 'owner', 'get_items_count')

    def get_items_count(self, obj):
        return obj.items.count()

    get_items_count.short_description = 'Items Count'
