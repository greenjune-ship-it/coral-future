from django.contrib import admin
from projects.models import Project, Sample, Experiment, Observation, Publication


class SampleInline(admin.TabularInline):
    model = Sample
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
    inlines = [SampleInline, ExperimentInline, PublicationInline]


class SampleAdmin(admin.ModelAdmin):
    inlines = [ObservationInline]


admin.site.register(Project, ProjectAdmin)
admin.site.register(Sample, SampleAdmin)
admin.site.register(Experiment)
admin.site.register(Observation)
admin.site.register(Publication)
