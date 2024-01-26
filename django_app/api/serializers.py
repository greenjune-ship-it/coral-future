from rest_framework import serializers
from projects.models import BioSample


class BioSampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = BioSample
        fields = [
            'id',
            'project_id',
            # Use 'project_id' to get the ID of the related Project
            'country',
            'species',
            'latitude',
            'longitude',
            'collection_date']
