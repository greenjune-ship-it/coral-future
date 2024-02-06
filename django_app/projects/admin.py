# projects/admin.py
from django.contrib import admin

from .models import Project, Experiment, Colony, BioSample, Observation, \
    Publication, UserCart


class ExperimentInline(admin.TabularInline):
    model = Experiment
    extra = 0


class BioSampleInline(admin.TabularInline):
    model = BioSample
    extra = 0


class ObservationInline(admin.TabularInline):
    model = Observation
    extra = 0


class UserCartInline(admin.TabularInline):
    model = UserCart.items.through
    extra = 0


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'registration_date', 'owner')
    search_fields = ('name', 'owner__username')
    inlines = [ExperimentInline]


@admin.register(Colony)
class ColonyAdmin(admin.ModelAdmin):
    list_display = ('species', 'latitude', 'longitude', 'country')
    search_fields = ('species', 'country')
    inlines = [BioSampleInline]


@admin.register(BioSample)
class BioSampleAdmin(admin.ModelAdmin):
    list_display = ('colony',)
    search_fields = ('colony__species', 'colony__country')
    inlines = [ObservationInline]


@admin.register(Observation)
class ObservationAdmin(admin.ModelAdmin):
    list_display = (
        'biosample', 'condition', 'temperature', 'timepoint', 'pam_value')
    list_filter = ('biosample__colony',)


@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'display_projects')

    def display_projects(self, obj):
        return ", ".join([project.name for project in
                          obj.observations.all().values_list(
                              'experiment__project', flat=True)])

    display_projects.short_description = 'Associated Projects'


@admin.register(UserCart)
class UserCartAdmin(admin.ModelAdmin):
    list_display = ('owner',)
    filter_horizontal = ('items',)
    inlines = [UserCartInline]
