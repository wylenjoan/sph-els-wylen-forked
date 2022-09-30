from django.urls import path
from . import views

urlpatterns = [
    path('csrf/', views.csrf, name='csrf'),
    path('register/', views.RegisterUser.as_view(), name='register_user'),
    path('users/', views.ListUser.as_view(), name='list_user'),
    path('users/<str:pk>', views.GetUpdateDeleteUser.as_view(), name='get_update_delete_user'),
    path('login/', views.LoginUser.as_view(), name='login_user'),
    path('logout/', views.LogoutUser.as_view(), name='logout_user'),
    path('categories/', views.ListCreateCategory.as_view(), name='list_category'),
    path('categories/<str:pk>', views.GetUpdateDeleteCategory.as_view(), name='get_update_delete_category'),
    path('questions/', views.ListCreateQuestion.as_view(), name='list_question'),
    path('questions', views.ListQuestionByCategory.as_view(), name='list_question_by_category'),
    path('questions/<str:pk>', views.GetUpdateDeleteQuestion.as_view(), name='get_update_delete_question'),
    path('choices/', views.ListCreateChoice.as_view(), name='list_choice'),
    path('choices/<str:pk>', views.GetUpdateDeleteChoice.as_view(), name='get_update_delete_choice'),
    path('lessons/', views.ListCreateLesson.as_view(), name='list_lesson'),
    path('lessons/<str:pk>', views.GetUpdateDeleteLesson.as_view(), name='get_update_delete_lesson'),
    path('answers/', views.ListCreateAnswer.as_view(), name='list_answer'),
    path('answers/<str:pk>', views.GetUpdateDeleteAnswer.as_view(), name='get_update_delete_answer'),
]
