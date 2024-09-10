from django.urls import path
from .views import CategoriaRevListCreateView, CategoriaRevRetrieveUpdateDestroyView

urlpatterns = [
    path('categorias/', CategoriaRevListCreateView.as_view(), name='categoria-list-create'),
    path('categorias/<int:pk>/', CategoriaRevRetrieveUpdateDestroyView.as_view(), name='categoria-retrieve-update-destroy'),
]