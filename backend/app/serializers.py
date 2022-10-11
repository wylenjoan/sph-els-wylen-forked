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
    fields = ['id', 'lesson', 'question', 'question_value', 'choice', 'value', 'is_correct']


class LessonSerializer(serializers.ModelSerializer):
  answers = AnswerSerializer(many=True, read_only=True)
  category_title = serializers.CharField(source="category.title", read_only=True)
  class Meta:
    model = Lesson
    fields = ['id', 'user', 'category', 'category_title', 'answers']


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
  lessons = LessonSerializer(many=True, read_only=True)

  # follower_relation - the user's followers
  follower_relation = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

  # following_relation - who the user follows
  following_relation = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

  activities = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

  class Meta:
    model = AppUser
    exclude= ['is_staff', 'is_active', 'date_joined', 'last_login', 
              'is_superuser', 'groups', 'user_permissions']

  def create(self, validated_data):
      return AppUser.objects.create_user(**validated_data)


class UserRelationSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserRelation
    fields = ['id', 'follower_user', 'following_user']


class UserActivitySerializer(serializers.ModelSerializer):
  class Meta:
    model = UserActivity
    fields = '__all__'
