# api/views.py
from rest_framework import status
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
    This endpoint allows authenticated users to retrieve a list of samples.
    """

    def get(self, request, *args, **kwargs):
        biosamples = BioSample.objects.all()
        serializer = BioSampleSerializer(biosamples, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ObservationApiView(APIView):
    """
    This endpoint allows authenticated users to retrieve a list of samples.
    """

    def get(self, request, *args, **kwargs):
        observations = Observation.objects.all()
        serializer = ObservationSerializer(observations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
