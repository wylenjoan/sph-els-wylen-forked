from rest_framework import serializers
from .models import *


class ChoiceSerializer(serializers.ModelSerializer):
  class Meta:
    model = Choice
    fields = ['id', 'question', 'value', 'is_correct_answer']


class QuestionSerializer(serializers.ModelSerializer):
  choices = ChoiceSerializer(many=True, read_only=True)
  class Meta:
    model = Question
    fields = ['id', 'category', 'value', 'choices']


class CategorySerializer(serializers.ModelSerializer):
  questions = QuestionSerializer(many=True, read_only=True)
  class Meta:
    model = Category
    fields = ['id', 'title', 'description', 'questions']


class AnswerSerializer(serializers.ModelSerializer):
  question_value = serializers.CharField(source='question.value', read_only=True)
  class Meta:
    model = Answer
    fields = [
      'id', 
      'lesson', 
      'question', 
      'question_value', 
      'choice', 
      'value', 
      'is_correct'
    ]


class LessonSerializer(serializers.ModelSerializer):
  answers = AnswerSerializer(many=True, read_only=True)
  category_title = serializers.CharField(source="category.title", read_only=True)
  score = serializers.SerializerMethodField('get_score')
  total = serializers.SerializerMethodField('get_total')
  class Meta:
    model = Lesson
    fields = [
      'id', 
      'user', 
      'category', 
      'category_title', 
      'score', 
      'total', 
      'answers',
    ]
  
  def get_score(self, obj):
    return obj.answers.filter(is_correct=True).count()

  def get_total(self, obj):
    return obj.answers.count()


class UserSerializer(serializers.ModelSerializer):
  first_name = serializers.CharField(max_length=150, required=True)
  last_name = serializers.CharField(max_length=150, required=True)
  email = serializers.CharField(max_length=150, required=True)
  is_admin = serializers.BooleanField(required=False)
  password = serializers.CharField(
    min_length=8,
    max_length=32, 
    required=True, 
    write_only=True,
    style={'input_type': 'password'},
  )
  lessons = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

  # follower_relation - the user's followers
  follower_relation = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

  # following_relation - who the user follows
  following_relation = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

  activities = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

  class Meta:
    model = AppUser
    exclude= [
      'is_staff', 
      'is_active', 
      'date_joined', 
      'last_login', 
      'is_superuser', 
      'groups', 
      'user_permissions',
    ]

  def create(self, validated_data):
      return AppUser.objects.create_user(**validated_data)


class UserRelationSerializer(serializers.ModelSerializer):
  follower_user_name = serializers.SerializerMethodField('get_follower_name')
  following_user_name = serializers.SerializerMethodField('get_following_name')
  class Meta:
    model = UserRelation
    fields = [
      'id', 
      'follower_user', 
      'follower_user_name', 
      'following_user', 
      'following_user_name',
    ]

  def get_follower_name(self, obj):
    return f'{obj.follower_user.first_name} {obj.follower_user.last_name}'
  
  def get_following_name(self, obj):
    return f'{obj.following_user.first_name} {obj.following_user.last_name}'


class FollowingSerializer(serializers.ModelSerializer):
  following_user_name = serializers.SerializerMethodField('get_following_name')
  class Meta:
    model = UserRelation
    fields = ['id', 'following_user', 'following_user_name']
  
  def get_following_name(self, obj):
    return f'{obj.following_user.first_name} {obj.following_user.last_name}'


class FollowerSerializer(serializers.ModelSerializer):
  follower_user_name = serializers.SerializerMethodField('get_follower_name')

  class Meta:
    model = UserRelation
    fields = ['id', 'follower_user', 'follower_user_name']
  
  def get_follower_name(self, obj):
    return f'{obj.follower_user.first_name} {obj.follower_user.last_name}'


class UserActivitySerializer(serializers.ModelSerializer):
  user_name = serializers.SerializerMethodField('get_full_name')
  user_avatar_url = serializers.CharField(source='user.avatar_url', read_only=True)
  following_user_name = serializers.SerializerMethodField('get_following_user_full_name')
  lesson_title = serializers.CharField(source='lesson.category.title', read_only=True)
  lesson_score = serializers.SerializerMethodField('get_score')
  lesson_total = serializers.SerializerMethodField('get_total')

  class Meta:
    model = UserActivity
    fields = [
      'id',
      'user',  
      'user_name',
      'user_avatar_url',
      'following_relation', 
      'following_user_name',
      'lesson', 
      'lesson_title',
      'lesson_score',
      'lesson_total',
      'updated_at'
    ]
  
  def get_full_name(self, obj):
    return f'{obj.user.first_name} {obj.user.last_name}'

  def get_following_user_full_name(self, obj):
    full_name = None
    if obj.following_relation:
      full_name = f'{obj.following_relation.following_user.first_name} {obj.following_relation.following_user.last_name}'
    return full_name

  def get_score(self, obj):
    score = None
    if obj.lesson:
      score = obj.lesson.answers.filter(is_correct=True).count()
    return score

  def get_total(self, obj):
    total = None
    if obj.lesson:
      total = obj.lesson.answers.count()
    return total


class UserProfileSerializer(serializers.ModelSerializer):
  full_name = serializers.SerializerMethodField('get_full_name')

  # following - who the user follows
  following_number = serializers.SerializerMethodField('get_following_number')
  following_relation = FollowingSerializer(many=True, read_only=True)

  # follower - the user's followers
  follower_number = serializers.SerializerMethodField('get_follower_number')
  follower_relation = FollowerSerializer(many=True, read_only=True)

  class Meta:
    model = AppUser
    fields = [
      'id', 
      'full_name', 
      'avatar_url',
      'following_number',
      'following_relation',
      'follower_number',
      'follower_relation',
    ]

  def get_full_name(self, obj):
    return f'{obj.first_name} {obj.last_name}'

  def get_following_number(self, obj):
    return obj.following_relation.count()

  def get_follower_number(self, obj):
    return obj.follower_relation.count()
