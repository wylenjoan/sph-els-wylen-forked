from rest_framework import serializers
from .models import *


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

  class Meta:
    model = AppUser
    exclude= ['is_staff', 'is_active', 'date_joined', 'last_login', 
              'is_superuser', 'groups', 'user_permissions']

  def create(self, validated_data):
      return AppUser.objects.create_user(**validated_data)


class UserRelationSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserRelation
    fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
  questions = serializers.SlugRelatedField(
    many=True,
    read_only=True,
    slug_field='value'
  )
  class Meta:
    model = Category
    fields = ['id', 'title', 'description', 'questions']


class LessonSerializer(serializers.ModelSerializer):
  class Meta:
    model = Lesson
    fields = '__all__'


class UserActivitySerializer(serializers.ModelSerializer):
  class Meta:
    model = UserActivity
    fields = '__all__'


class ChoiceSerializer(serializers.ModelSerializer):
  class Meta:
    model = Choice
    fields = ['id', 'question', 'value', 'is_correct_answer']


class QuestionSerializer(serializers.ModelSerializer):
  choices = serializers.SlugRelatedField(
    many=True,
    read_only=True,
    slug_field='value'
  )
  class Meta:
    model = Question
    fields = ['id', 'category', 'value', 'choices']


class AnswerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Answer
    fields = '__all__'
