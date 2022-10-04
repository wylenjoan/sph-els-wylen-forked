from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, serializers, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
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
  permission_classes = [IsAuthenticated]
  queryset = AppUser.objects.all()
  serializer_class = UserSerializer


class GetUpdateDeleteUser(generics.RetrieveUpdateDestroyAPIView):
  permission_classes = [IsAuthenticated]
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
          "id": user.id,
          "first_name": user.first_name,
          "last_name": user.last_name,
          "email": user.email,
          "is_admin": user.is_admin,
          "avatar_url": user.avatar_url
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


class ListCreateCategory(generics.ListCreateAPIView):
  permission_classes = [IsAuthenticated]
  queryset = Category.objects.all()
  serializer_class = CategorySerializer


class GetUpdateDeleteCategory(generics.RetrieveUpdateDestroyAPIView):
  permission_classes = [IsAuthenticated]
  queryset = Category.objects.all()
  serializer_class = CategorySerializer


class ListCreateQuestion(generics.ListCreateAPIView):
  permission_classes = [IsAuthenticated]
  queryset = Question.objects.all()
  serializer_class = QuestionSerializer


class GetUpdateDeleteQuestion(generics.RetrieveUpdateDestroyAPIView):
  permission_classes = [IsAuthenticated]
  queryset = Question.objects.all()
  serializer_class = QuestionSerializer


class ListQuestionByCategory(generics.ListAPIView):
  serializer_class = QuestionSerializer

  def get_queryset(self):
    queryset = Question.objects.all()
    category = self.request.query_params.get('category')
    if category:
      queryset = queryset.filter(category_id=category)
    return queryset


class ListCreateChoice(generics.ListCreateAPIView):
  permission_classes = [IsAuthenticated]
  queryset = Choice.objects.all()
  serializer_class = ChoiceSerializer


class GetUpdateDeleteChoice(generics.RetrieveUpdateDestroyAPIView):
  permission_classes = [IsAuthenticated]
  queryset = Choice.objects.all()
  serializer_class = ChoiceSerializer


class ListChoiceByQuestion(generics.ListAPIView):
  serializer_class = ChoiceSerializer

  def get_queryset(self):
    queryset = Choice.objects.all()
    question = self.request.query_params.get('question')
    if question:
      queryset = queryset.filter(question_id=question)
    return queryset


class ListCreateLesson(generics.ListCreateAPIView):
  permission_classes = [IsAuthenticated]
  queryset = Lesson.objects.all()
  serializer_class = LessonSerializer


class GetUpdateDeleteLesson(generics.RetrieveUpdateDestroyAPIView):
  permission_classes = [IsAuthenticated]
  queryset = Lesson.objects.all()
  serializer_class = LessonSerializer


class ListCreateAnswer(generics.ListCreateAPIView):
  permission_classes = [IsAuthenticated]
  queryset = Answer.objects.all()
  serializer_class = AnswerSerializer


class GetUpdateDeleteAnswer(generics.RetrieveUpdateDestroyAPIView):
  permission_classes = [IsAuthenticated]
  queryset = Answer.objects.all()
  serializer_class = AnswerSerializer


class ListAnswerByLesson(generics.ListAPIView):
  serializer_class = AnswerSerializer

  def get_queryset(self):
    queryset = Answer.objects.all()
    lesson = self.request.query_params.get('lesson')
    if lesson:
      queryset = queryset.filter(lesson_id=lesson)
    return queryset
