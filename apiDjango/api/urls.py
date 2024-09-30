from django.urls import path
from .views import login
from .views import add_user

urlpatterns = [
    path('login/', login, name='login'),
    path('api/add_user/', add_user, name='add_user'),
]
