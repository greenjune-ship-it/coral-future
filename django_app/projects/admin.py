from django.contrib import admin
from projects.models import Project, Sample, Experiment, Observation


class SampleInline(admin.StackedInline):
    model = Sample
    extra = 1


class ExperimentInline(admin.StackedInline):
    model = Experiment
    extra = 1


class ObservationInline(admin.StackedInline):
    model = Observation
    extra = 1


class ProjectAdmin(admin.ModelAdmin):
    inlines = [SampleInline, ExperimentInline]


class SampleAdmin(admin.ModelAdmin):
    inlines = [ObservationInline]


admin.site.register(Project, ProjectAdmin)
admin.site.register(Sample, SampleAdmin)
admin.site.register(Experiment)
admin.site.register(Observation)
