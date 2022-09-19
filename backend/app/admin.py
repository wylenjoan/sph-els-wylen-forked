from django.contrib import admin
from .models import *

admin.site.register(AppUser)
admin.site.register(UserRelation)
admin.site.register(Category)
admin.site.register(Lesson)
admin.site.register(UserActivity)
admin.site.register(Question)
admin.site.register(Choice)
admin.site.register(Answer)
