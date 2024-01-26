# api/views.py
from rest_framework import status
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from projects.models import Sample
from api.serializers import SampleSerializer


@api_view(['GET'])
def check_authentication(request):
    user = request.user
    return Response({'authenticated': True, 'username': user.username})


class SamplesApiView(APIView):
    """
    This endpoint allows authenticated users to retrieve a list of samples.
    """
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        samples = Sample.objects.all()
        serializer = SampleSerializer(samples, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
