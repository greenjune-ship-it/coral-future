from rest_framework import serializers
from projects.models import BioSample, Colony, Observation


class BioSampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = BioSample
        fields = '__all__'


class ColonySerializer(serializers.ModelSerializer):
    class Meta:
        model = Colony
        fields = '__all__'


class ObservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Observation
        fields = '__all__'
