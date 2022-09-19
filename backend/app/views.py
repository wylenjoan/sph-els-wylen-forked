from rest_framework import generics
from .models import *
from .serializers import *


class RegisterUser(generics.CreateAPIView):
  queryset = AppUser.objects.all()
  serializer_class = UserSerializer


class ListUser(generics.ListAPIView):
  queryset = AppUser.objects.all()
  serializer_class = UserSerializer


class GetUpdateDeleteUser(generics.RetrieveUpdateDestroyAPIView):
  queryset = AppUser.objects.all()
  serializer_class = UserSerializer
