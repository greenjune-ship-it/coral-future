# api/views.py
from rest_framework import generics, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
# Apps imports
from projects.models import BioSample, Observation, UserCart
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
    This endpoint allows users to retrieve a list of BioSamples.
    """

    def get(self, request):
        biosamples = BioSample.objects.all()
        serializer = BioSampleSerializer(biosamples, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ObservationApiView(APIView):
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
        serializer = BioSampleSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Example: {"biosample_ids": [1,2]}
        """
        # Extract sample IDs from request data (assuming they are provided as a list)
        biosample_ids = request.data.get('biosample_ids', [])

        # Initialize an empty list to store successfully added samples
        added_biosamples = []

        for biosample_id in biosample_ids:
            try:
                # Retrieve the BioSamples object with the specified ID
                biosample = BioSample.objects.get(id=biosample_id)
                # Add the sample to the user's cart
                user_cart, created = UserCart.objects.get_or_create(
                    owner=request.user)
                user_cart.items.add(biosample)
                added_biosamples.append(biosample_id)
            except BioSample.DoesNotExist:
                pass  # Ignore samples that don't exist

        if added_biosamples:
            return Response({
                'message': f'Samples {added_biosamples} added to cart successfully'})
        else:
            return Response({'error': 'No valid samples found'},
                            status=status.HTTP_404_NOT_FOUND)

    def delete(self, request):
        user_cart, created = UserCart.objects.get_or_create(owner=request.user)
        user_cart.items.clear()
        return Response({'message': 'Cart cleaned successfully'})
