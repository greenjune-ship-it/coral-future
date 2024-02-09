from projects.models import BioSample, Colony, Observation, Project
from rest_framework import serializers


class BioSampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = BioSample
        fields = '__all__'


class ColonySerializer(serializers.ModelSerializer):
    projects = serializers.SerializerMethodField()

    def get_projects(self, obj):
        # Get the related projects for the colony's biosamples
        biosamples = obj.biosamples.all()
        projects = Project.objects.filter(biosamples__in=biosamples).distinct()
        # Assuming you want to serialize projects' names
        return [project.name for project in projects]

    class Meta:
        model = Colony
        fields = ['id', 'name', 'species', 'country', 'latitude', 'longitude', 'ed50_value', 'projects']

class ObservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Observation
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'description']
