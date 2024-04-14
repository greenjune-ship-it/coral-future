from projects.models import BioSample, Colony, ThermalTolerance,\
    Observation, Project
from rest_framework import serializers


class BioSampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = BioSample
        fields = '__all__'


class ThermalToleranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThermalTolerance
        fields = ['abs_thermal_tolerance', 'rel_thermal_tolerance',
                  'condition', 'timepoint']


class ColonySerializer(serializers.ModelSerializer):
    projects = serializers.SerializerMethodField()
    thermal_tolerances = serializers.SerializerMethodField()

    def get_projects(self, obj):
        # Get the related projects for the colony's biosamples
        biosamples = obj.biosamples.all()
        projects = Project.objects.filter(biosamples__in=biosamples).distinct()
        # Assuming you want to serialize projects' names
        return [project.name for project in projects]

    def get_thermal_tolerances(self, obj):
        # Get all thermal tolerances associated with the colony
        thermal_tolerances = ThermalTolerance.objects.filter(colony=obj)
        # Serialize the thermal tolerance objects
        serializer = ThermalToleranceSerializer(thermal_tolerances, many=True)
        return serializer.data

    class Meta:
        model = Colony
        fields = ['id', 'name', 'species', 'country', 'latitude', 'longitude', 'thermal_tolerances', 'projects']


class ObservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Observation
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'description']
