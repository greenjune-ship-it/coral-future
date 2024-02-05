from rest_framework import serializers
from projects.models import BioSample, Observation, UserCart


class BioSampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = BioSample
        fields = '__all__'


class ObservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Observation
        fields = '__all__'
