# api/views.py
from api.serializers import BioSampleSerializer, ColonySerializer, \
    ObservationSerializer, ProjectSerializer
# Apps imports
from projects.models import BioSample, Colony, Observation, Project, UserCart
from rest_framework import generics, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


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
        user_cart, _ = UserCart.objects.get_or_create(owner=request.user)
        items = user_cart.items.all()
        serializer = ColonySerializer(items, many=True)
        return Response(serializer.data)

    def put(self, request):
        """
        Replace entire cart with new data.
        Example: {"colony_ids": [1,2]}
        """
        user_cart, _ = UserCart.objects.get_or_create(owner=request.user)
        colony_ids = request.data.get('colony_ids', [])

        user_cart.items.clear()  # Clear existing items

        for colony_id in colony_ids:
            try:
                colony = Colony.objects.get(id=colony_id)
                user_cart.items.add(colony)
            except Colony.DoesNotExist:
                pass

        return Response(
            {'message': 'Cart replaced with new data successfully'})

    def delete(self, request):
        """
        Remove all colonies from cart.
        """
        user_cart, _ = UserCart.objects.get_or_create(owner=request.user)
        user_cart.items.clear()
        return Response(
            {'message': 'All colonies removed from cart successfully'})

    def patch(self, request):
        """
        Remove selected colonies from cart.
        Example: {"colony_ids": [1,2]}
        """
        user_cart, _ = UserCart.objects.get_or_create(owner=request.user)
        colony_ids = request.data.get('colony_ids', [])

        if colony_ids:
            user_cart.items.remove(*colony_ids)
            return Response({
                                'message': f'Colonies {colony_ids} removed from cart successfully'})
        else:
            return Response({'error': 'No colony IDs provided'},
                            status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        """
        Add selected colonies to cart.
        Example: {"colony_ids": [1,2]}
        """
        colony_ids = request.data.get('colony_ids', [])
        added_colonies = []

        for colony_id in colony_ids:
            try:
                colony = Colony.objects.get(id=colony_id)
                user_cart, _ = UserCart.objects.get_or_create(
                    owner=request.user)
                user_cart.items.add(colony)
                added_colonies.append(colony_id)
            except Colony.DoesNotExist:
                pass

        if added_colonies:
            return Response({
                                'message': f'Colonies {added_colonies} added to cart successfully'})
        else:
            return Response({'error': 'No valid colonies found'},
                            status=status.HTTP_404_NOT_FOUND)
