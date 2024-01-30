from rest_framework import serializers
from projects.models import BioSample, Observation


class BioSampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = BioSample
        fields = [
            'id',
            'project_id',
            'country',
            'species',
            'latitude',
            'longitude',
            'collection_date']
        
class ObservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Observation
        fields = [
            'fragment',
            'condition',
            'temperature',
            'timepoint',
            'pam_value',
            'biosample']
