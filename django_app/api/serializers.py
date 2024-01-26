from rest_framework import serializers
from projects.models import Sample


class SampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sample
        fields = [
            'id',
            'project_id',
            # Use 'project_id' to get the ID of the related Project
            'country',
            'species',
            'latitude',
            'longitude',
            'collection_date']
