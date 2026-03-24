from .serializers import UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User


class RegisterView(generics.CreateAPIView):
    queryset = User
    serializer_class = UserSerializer
    permission_classes = []
    