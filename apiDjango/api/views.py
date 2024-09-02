from rest_framework import generics
from .models import CategoriaRev
from .serializers import CategoriaRevSerializer

# Vista para listar y crear categorías
class CategoriaRevListCreateView(generics.ListCreateAPIView):
    queryset = CategoriaRev.objects.all()
    serializer_class = CategoriaRevSerializer

# Vista para recuperar, actualizar y eliminar una categoría específica
class CategoriaRevRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CategoriaRev.objects.all()
    serializer_class = CategoriaRevSerializer