# api/views.py
from django.db.models import Max, Min
from rest_framework import generics, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers import BioSampleSerializer, \
    ColonySerializer, ThermalToleranceSerializer, \
    ObservationSerializer, ProjectSerializer
# Apps imports
from projects.models import BioSample, Observation, Colony, \
    ThermalTolerance, Project, UserCart


class CheckAuthenticationApiView(APIView):
    """
    This endpoint allows to check if user is authenticated.
    """

    def get(self, request):
        return Response({
            'authenticated': request.user.is_authenticated,
            'username': request.user.username})


class ProjectsApiView(APIView):
    """
    This endpoint allows users to retrieve a list of available Projects.
    """

    def get(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BioSamplesApiView(APIView):
    """
    This endpoint allows users to retrieve a list of BioSamples.
    """

    def get(self, request):
        biosamples = BioSample.objects.all()
        serializer = BioSampleSerializer(biosamples, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ColoniesApiView(APIView):
    """
    This endpoint allows users to retrieve a list of Colonies.
    """

    def get(self, request):
        colonies = Colony.objects.all()
        serializer = ColonySerializer(colonies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ThermalToleranceApiView(APIView):
    """
    This endpoint allows users to retriev a list of ThermalTolerance objects.
    """

    def get(self, request):
        thermal_tolerances = ThermalTolerance.objects.all()
        serializer = ThermalToleranceSerializer(thermal_tolerances, many=True)
        return Response(serializer.data)


class ThermalToleranceMinMaxView(APIView):
    def get(self, request):
        max_abs_thermal_tolerance = ThermalTolerance.objects.exclude(
            abs_thermal_tolerance__isnull=True).aggregate(
            Max('abs_thermal_tolerance'))['abs_thermal_tolerance__max']

        min_abs_thermal_tolerance = ThermalTolerance.objects.exclude(
            abs_thermal_tolerance__isnull=True).aggregate(
            Min('abs_thermal_tolerance'))['abs_thermal_tolerance__min']

        max_rel_thermal_tolerance = ThermalTolerance.objects.exclude(
            rel_thermal_tolerance__isnull=True).aggregate(
            Max('rel_thermal_tolerance'))['rel_thermal_tolerance__max']

        min_rel_thermal_tolerance = ThermalTolerance.objects.exclude(
            rel_thermal_tolerance__isnull=True).aggregate(
            Min('rel_thermal_tolerance'))['rel_thermal_tolerance__min']

        # Construct the response data
        response_data = {
            'max_abs_thermal_tolerance': max_abs_thermal_tolerance,
            'min_abs_thermal_tolerance': min_abs_thermal_tolerance,
            'max_rel_thermal_tolerance': max_rel_thermal_tolerance,
            'min_rel_thermal_tolerance': min_rel_thermal_tolerance
        }

        # Return the response
        return Response(response_data)


class ObservationsApiView(APIView):
    """
    This endpoint allows users to retrieve a list of Observations.
    """

    def get(self, request):
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


class UserCartApiView(APIView):
    """
    This endpoint allows to operate with user cart.
    """

    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_cart, created = UserCart.objects.get_or_create(owner=request.user)
        items = user_cart.items.all()
        serializer = ColonySerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Example: {"colony_ids": [1,2]}
        """
        # Extract colony IDs from request data (assuming they are provided as a list)
        colony_ids = request.data.get('colony_ids', [])

        # Initialize an empty list to store successfully added colonies
        added_colonies = []

        for colony_id in colony_ids:
            try:
                # Retrieve the Colonies object with the specified ID
                colony = Colony.objects.get(id=colony_id)
                # Add the colony to the user's cart
                user_cart, created = UserCart.objects.get_or_create(
                    owner=request.user)
                user_cart.items.add(colony)
                added_colonies.append(colony_id)
            except Colony.DoesNotExist:
                pass  # Ignore samples that don't exist

        if added_colonies:
            return Response({
                'message': f'Colonies {added_colonies} added to cart successfully'})
        else:
            return Response({'error': 'No valid colonies found'},
                            status=status.HTTP_404_NOT_FOUND)

    def delete(self, request):
        user_cart, created = UserCart.objects.get_or_create(owner=request.user)
        user_cart.items.clear()
        return Response({'message': 'Cart cleaned successfully'})
