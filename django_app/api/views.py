# api/views.py
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from projects.models import BioSample, Observation
from api.serializers import BioSampleSerializer, ObservationSerializer


@api_view(['GET'])
def check_authentication(request):
    user = request.user
    return Response({'authenticated': True, 'username': user.username})


class BioSamplesApiView(APIView):
    """
    This endpoint allows users to retrieve a list of BioSamples.
    """

    def get(self, request, *args, **kwargs):
        biosamples = BioSample.objects.all()
        serializer = BioSampleSerializer(biosamples, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ObservationApiView(APIView):
    """
    This endpoint allows users to retrieve a list of Observations.
    """

    def get(self, request, *args, **kwargs):
        observations = Observation.objects.all()
        serializer = ObservationSerializer(observations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ObservationsByBioSampleView(generics.GenericAPIView):
    """
    This endpoint allows user to retrieve Observations by list of BioSamples.
    """
    queryset = Observation.objects.all()
    serializer_class = ObservationSerializer

    def get(self, request, *args, **kwargs):
        biosample_ids = request.query_params.get('biosample_ids', None)
        if biosample_ids is not None:
            biosample_ids = [int(id) for id in biosample_ids.split(',')]
            observations = self.get_queryset().filter(
                biosample_id__in=biosample_ids)
            serializer = self.get_serializer(observations, many=True)
            return Response(serializer.data)
        else:
            return Response({"error": "No biosample_ids provided"}, status=400)
