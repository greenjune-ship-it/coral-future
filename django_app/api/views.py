# api/views.py
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from projects.models import BioSample, Observation
from api.serializers import BioSampleSerializer, ObservationSerializer


class CheckAuthenticationApiView(APIView):
    """
    This endpoint allows to check if user is authenticated.
    """

    def get(self, request):
        return Response({
            'authenticated': request.user.is_authenticated,
            'username': request.user.username})


class BioSamplesApiView(APIView):
    """
    This endpoint allows authenticated users to retrieve a list of samples.
    """

    def get(self):
        biosamples = BioSample.objects.all()
        serializer = BioSampleSerializer(biosamples, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ObservationApiView(APIView):
    """
    This endpoint allows authenticated users to retrieve a list of samples.
    """

    def get(self):
        observations = Observation.objects.all()
        serializer = ObservationSerializer(observations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
