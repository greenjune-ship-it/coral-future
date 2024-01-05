from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

def user_list(request):
    print('aFSDF')
    users = User.objects.all()
    print(users)
    return print(users)

# Create your views here.
@api_view(['GET'])
def get_routes(request):
   routes = [
       '/token',
       '/token/refresh'
   ]
   return Response(routes)

