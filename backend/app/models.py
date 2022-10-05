from django.db import models
from django.contrib.auth import models as auth_models


class UserManager(auth_models.BaseUserManager):
    def create_user(
        self,
        first_name: str,
        last_name: str,
        email: str,
        password: str = None,
        is_admin=False,
        is_staff=False,
        is_superuser=False,
    ) -> "AppUser":
        if not email:
            raise ValueError("User must have an email")
        if not first_name:
            raise ValueError("User must have a first name")
        if not last_name:
            raise ValueError("User must have a last name")

        user = self.model(email=self.normalize_email(email))
        user.first_name = first_name
        user.last_name = last_name
        user.set_password(password)
        user.is_admin = is_admin
        user.is_active = True
        user.is_staff = is_staff
        user.is_superuser = is_superuser
        user.save()

        return user

    def create_superuser(
        self, first_name: str, last_name: str, email: str, password: str
    ) -> "AppUser":
        user = self.create_user(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
            is_staff=True,
            is_superuser=True,
        )
        user.save()

        return user


class AppUser(auth_models.AbstractUser):
  first_name = models.CharField(verbose_name="first name", max_length=150, default="")
  last_name = models.CharField(verbose_name="last name", max_length=150, default="")
  email = models.EmailField(verbose_name="email address", unique=True, default="")
  password = models.CharField(max_length=255, default="")
  username = None
  avatar_url = models.URLField(blank=True)
  is_admin = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)

  objects = UserManager()

  USERNAME_FIELD = "email"
  REQUIRED_FIELDS = ["first_name", "last_name"]


class UserRelation(models.Model):
  follower_user = models.ForeignKey(AppUser, on_delete=models.CASCADE, blank=True, related_name="following_relation")
  following_user = models.ForeignKey(AppUser, on_delete=models.CASCADE, blank=True, related_name="follower_relation")
  created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)


class Category(models.Model):
  title = models.CharField(max_length=100, blank=False)
  description = models.CharField(max_length=200, blank=False)
  created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)


class Lesson(models.Model):
  user = models.ForeignKey(AppUser, on_delete=models.CASCADE, blank=False, related_name="lessons")
  category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=False)
  created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)


class UserActivity(models.Model):
  user = models.ForeignKey(AppUser, on_delete=models.CASCADE, blank=False, related_name="relation_user")
  following_user = models.OneToOneField(AppUser, on_delete=models.CASCADE, blank=True, related_name="activity_following")
  lesson = models.OneToOneField(Lesson, on_delete=models.CASCADE, blank=False)
  created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)


class Question(models.Model):
  category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=False, related_name="questions")
  value = models.CharField(max_length=100, blank=False)
  created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)


class Choice(models.Model):
  question = models.ForeignKey(Question, on_delete=models.CASCADE, blank=False, related_name="choices")
  value = models.CharField(max_length=100, blank=False)
  is_correct_answer = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)


class Answer(models.Model):
  lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, blank=False, related_name="answers")
  question = models.ForeignKey(Question, on_delete=models.CASCADE, blank=False)
  choice = models.ForeignKey(Choice, on_delete=models.CASCADE)
  value = models.CharField(max_length=100, blank=False)
  is_correct = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)

