from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterUser.as_view(), name='register_user'),
    path('users/', views.ListUser.as_view(), name='list_user'),
    path('users/<str:pk>', views.GetUpdateDeleteUser.as_view(), name='get_update_delete_user'),
]
