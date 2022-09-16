from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    exclude = ['password']


class UserRelationSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserRelation
    fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = '__all__'


class LessonSerializer(serializers.ModelSerializer):
  class Meta:
    model = Lesson
    fields = '__all__'


class UserActivitySerializer(serializers.ModelSerializer):
  class Meta:
    model = UserActivity
    fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Question
    fields = '__all__'


class ChoiceSerializer(serializers.ModelSerializer):
  class Meta:
    model = Choice
    fields = '__all__'


class AnswerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Answer
    fields = '__all__'
