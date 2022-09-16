from django.db import models
from django.contrib.auth.models import User


class AppUser(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  avatar_url = models.URLField(blank=True)
  is_admin = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)


class UserRelation(models.Model):
  follower_user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, related_name='relation_followers')
  following_user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, related_name='relation_following')
  created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)


class Category(models.Model):
  title = models.CharField(max_length=100, blank=False)
  description = models.CharField(max_length=200, blank=False)
  created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)


class Lesson(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False)
  category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=False)
  created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)


class UserActivity(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, related_name='relation_user')
  following_user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, related_name='activity_following')
  lesson = models.OneToOneField(Lesson, on_delete=models.CASCADE, blank=False)
  created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)


class Question(models.Model):
  category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=False)
  value = models.CharField(max_length=100, blank=False)
  created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)


class Choice(models.Model):
  question = models.ForeignKey(Question, on_delete=models.CASCADE, blank=False)
  value = models.CharField(max_length=100, blank=False)
  is_correct_answer = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)


class Answer(models.Model):
  lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, blank=False)
  question = models.ForeignKey(Question, on_delete=models.CASCADE, blank=False)
  choice = models.OneToOneField(Choice, on_delete=models.CASCADE)
  value = models.CharField(max_length=100, blank=False)
  is_correct = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)

