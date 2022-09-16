from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import *

class AppUserInline(admin.StackedInline):
  model = AppUser
  can_delete = False
  verbose_name_plural = 'App Users'

class CustomUserAdmin (UserAdmin):
  inlines = (AppUserInline, )

admin.site.unregister(User)

admin.site.register(User, CustomUserAdmin)
admin.site.register(UserRelation)
admin.site.register(Category)
admin.site.register(Lesson)
admin.site.register(UserActivity)
admin.site.register(Question)
admin.site.register(Choice)
admin.site.register(Answer)
