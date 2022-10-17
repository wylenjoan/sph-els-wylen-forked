from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, serializers, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.middleware.csrf import get_token

from .models import *
from .serializers import *


@api_view(['GET'])
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


class GetUserProfile(generics.RetrieveAPIView):
  permission_classes = [IsAuthenticated]
  queryset = AppUser.objects.all()
  serializer_class = UserProfileSerializer


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
  permission_classes = [IsAuthenticated]
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
  permission_classes = [IsAuthenticated]
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

  def perform_create(self, serializer):
    instance = serializer.save()
    activity = {
      'user': instance.user.id,
      'lesson': instance.id,
    }
    activity_serializer = UserActivitySerializer(data=activity)
    activity_serializer.is_valid(raise_exception=True)
    activity_serializer.save()


class GetUpdateDeleteLesson(generics.RetrieveUpdateDestroyAPIView):
  permission_classes = [IsAuthenticated]
  queryset = Lesson.objects.all()
  serializer_class = LessonSerializer


class ListLessonByUser(generics.ListAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = LessonSerializer

  def get_queryset(self):
    queryset = Lesson.objects.all()
    user = self.request.query_params.get('user')
    if user:
      queryset = queryset.filter(user_id=user)
    return queryset


class ListCreateAnswer(generics.ListCreateAPIView):
  permission_classes = [IsAuthenticated]
  queryset = Answer.objects.all()
  serializer_class = AnswerSerializer


class GetUpdateDeleteAnswer(generics.RetrieveUpdateDestroyAPIView):
  permission_classes = [IsAuthenticated]
  queryset = Answer.objects.all()
  serializer_class = AnswerSerializer


class ListAnswerByLesson(generics.ListAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = AnswerSerializer

  def get_queryset(self):
    queryset = Answer.objects.all()
    lesson = self.request.query_params.get('lesson')
    if lesson:
      queryset = queryset.filter(lesson_id=lesson)
    return queryset


class FollowUser(generics.ListCreateAPIView):
  permission_classes = [IsAuthenticated]
  queryset = UserRelation.objects.all()
  serializer_class = UserRelationSerializer

  def perform_create(self, serializer):
    serializer.is_valid(raise_exception=True)
    instance = serializer.save()
    activity = {
      'user': instance.follower_user.id,
      'following_relation': instance.id,
    }
    activity_serializer = UserActivitySerializer(data=activity)
    activity_serializer.is_valid(raise_exception=True)
    activity_serializer.save()


class UnfollowUser(generics.DestroyAPIView):
  permission_classes = [IsAuthenticated]
  queryset = UserRelation.objects.all()
  serializer_class = UserRelationSerializer


class ListFollowerByUser(generics.ListAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = FollowerSerializer

  def get_queryset(self):
    queryset = UserRelation.objects.all()
    user = self.request.query_params.get('user')
    if user:
      queryset = queryset.filter(following_user_id=user)
    return queryset


class ListFollowingByUser(generics.ListAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = FollowingSerializer

  def get_queryset(self):
    queryset = UserRelation.objects.all()
    user = self.request.query_params.get('user')
    if user:
      queryset = queryset.filter(follower_user_id=user)
    return queryset


class ListActivity(generics.ListAPIView):
  permission_classes = [IsAuthenticated]
  queryset = UserActivity.objects.all()
  serializer_class = UserActivitySerializer


class ListActivityByUser(generics.ListAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = UserActivitySerializer

  def get_queryset(self):
    queryset = UserActivity.objects.all()
    user = self.request.query_params.get('user')
    if user:
      queryset = queryset.filter(user_id=user)
    return queryset


class ListActivityByUserAndFollowing(generics.ListAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = UserActivitySerializer

  def get_queryset(self):
    all_activities = UserActivity.objects.all()
    all_relations = UserRelation.objects.all()
    user = self.request.query_params.get('user')

    if user:
      filtered_activities = all_activities.filter(user_id=user)
      following_relations = all_relations.filter(follower_user_id=user)

      for item in following_relations:
        activities_by_following = all_activities.filter(user_id=item.following_user)
        filtered_activities = filtered_activities | activities_by_following
      
      all_activities = filtered_activities.order_by('updated_at')

    return all_activities


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_relation_exists(request):
  all_relations = UserRelation.objects.all()
  follower = request.query_params.get('follower')
  following = request.query_params.get('following')
  exists = all_relations.filter(follower_user_id=follower, following_user_id=following).exists()
  return Response({'exists': exists})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_relation(request):
  all_relations = UserRelation.objects.all()
  follower = request.query_params.get('follower')
  following = request.query_params.get('following')
  if follower and following:
    relation = all_relations.get(follower_user=follower, following_user=following)
    relation_serializer = UserRelationSerializer(relation)
    return Response(relation_serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_words_lessons_number(request):
  lessons = Lesson.objects.all()
  user = request.query_params.get('user')
  if user:
    lessons = lessons.filter(user_id=user)
    lessons_learned = lessons.count()
    words_learned = 0
    for item in lessons:
      words_learned += item.answers.count()

  return Response({
    'lessons_learned': lessons_learned,
    'words_learned': words_learned,
  })
