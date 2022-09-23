from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, serializers, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.middleware.csrf import get_token

from .models import *
from .serializers import *


@api_view()
def csrf(request):
  return Response({'csrfToken': get_token(request)})


class RegisterUser(APIView):
  def post(self, request, format=None):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)


class ListUser(generics.ListAPIView):
  queryset = AppUser.objects.all()
  serializer_class = UserSerializer


class GetUpdateDeleteUser(generics.RetrieveUpdateDestroyAPIView):
  queryset = AppUser.objects.all()
  serializer_class = UserSerializer


class LoginUser(APIView):
  def post(self, request):
    email = request.data["email"]
    password = request.data["password"]

    if email and password:
      authenticated_user = authenticate(request=request, username=email, password=password)

      response = None

      if authenticated_user:
        login(request, authenticated_user)
        user = AppUser.objects.get(email=email)

        user_dict = {
          "first_name": user.first_name,
          "last_name": user.last_name,
          "email": user.email,
          "is_admin": user.is_admin
        }

        response = Response({'user': user_dict}, status=status.HTTP_200_OK)
      else:
        response = Response(None, status=status.HTTP_401_UNAUTHORIZED)

      return response

    else:
      raise serializers.ValidationError()


class LogoutUser(APIView):
  def post(self, request):
    logout(request)
    return Response(None, status=status.HTTP_200_OK)
