from django.contrib import admin
from projects.models import Project, BioSample, Experiment, Observation, Publication


class BioSampleInline(admin.TabularInline):
    model = BioSample
    extra = 1


class ExperimentInline(admin.TabularInline):
    model = Experiment
    extra = 1


class ObservationInline(admin.TabularInline):
    model = Observation
    extra = 1


class PublicationInline(admin.TabularInline):
    model = Publication
    extra = 1


class ProjectAdmin(admin.ModelAdmin):
    inlines = [BioSampleInline, ExperimentInline, PublicationInline]


class BioSampleAdmin(admin.ModelAdmin):
    inlines = [ObservationInline]


admin.site.register(Project, ProjectAdmin)
admin.site.register(BioSample, BioSampleAdmin)
admin.site.register(Experiment)
admin.site.register(Observation)
admin.site.register(Publication)
