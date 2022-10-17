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
    path('choices', views.ListChoiceByQuestion.as_view(), name='list_choice_by_question'),

    path('lessons/', views.ListCreateLesson.as_view(), name='list_lesson'),
    path('lessons/<str:pk>', views.GetUpdateDeleteLesson.as_view(), name='get_update_delete_lesson'),
    path('lessons', views.ListLessonByUser.as_view(), name='list_lesson_by_user'),

    path('answers/', views.ListCreateAnswer.as_view(), name='list_answer'),
    path('answers/<str:pk>', views.GetUpdateDeleteAnswer.as_view(), name='get_update_delete_answer'),
    path('answers', views.ListAnswerByLesson.as_view(), name='list_answer_by_lesson'),

    path('follow/', views.FollowUser.as_view(), name='follow_user'),
    path('unfollow/<str:pk>', views.UnfollowUser.as_view(), name='unfollow_user'),
    path('followers', views.ListFollowerByUser.as_view(), name='list_follower_by_user'),
    path('following', views.ListFollowingByUser.as_view(), name='list_following_by_user'),

    path('activities/', views.ListActivity.as_view(), name='list_create_activity'),
    path('activities', views.ListActivityByUser.as_view(), name='list_activity_by_user'),
    path('dashboard', views.ListActivityByUserAndFollowing.as_view(), name='list_activity_dashboard'),

    path('profile/<str:pk>', views.GetUserProfile.as_view(), name='get_user_profile'),

    path('relation_exists', views.check_relation_exists, name='check_relation_exists'),
    path('get_relation', views.get_relation, name='get_relation'),
    path('get_lessons_words_learned', views.get_words_lessons_number, name='get_lessons_words_learned'),

]
