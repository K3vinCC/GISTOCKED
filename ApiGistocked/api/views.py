from rest_framework import viewsets
# el "." se usar por que esta en la misma carpeta
from .serializer import ProgrammerSerializer,ProductoSerializer,CategoriaSerializer
from .models import Programmer, Producto,Categoria

#  Las vistas definen la lógica de tu API. 


class ProgrammerViewSet(viewsets.ModelViewSet):
    # queryset, la lista de elementos que se acceseda atraves del ORM(Object Relational Mapping)
    queryset = Programmer.objects.all()
    serializer_class = ProgrammerSerializer


# class ProductosViewSet(viewsets.ModelViewSet):
#     queryset = Producto.objects.all()
#     serializer_class = ProductoSerializer
    
    
#=====EJEMPLO VISTA===
# Ejemplo de vista con filtro y ordenamiento
class ProductoListFiltered(viewsets.ModelViewSet):
    queryset = Producto.objects.all().order_by('precio_venta')  # Ordenamos por precio de venta
    serializer_class = ProductoSerializer
    filterset_fields = ['categoria']  # Permitimos filtrar por categoría
    
# =====================

# Vista para listar y crear productos
class ProductoListCreate(viewsets.ModelViewSet):
    queryset = Producto.objects.all()  # Todos los productos
    serializer_class = ProductoSerializer

    def perform_create(self, serializer):
        # Personalización al crear un nuevo producto (opcional)
        serializer.save(creado_por=self.request.user)  # Ejemplo: asociar el producto al usuario que lo creó

# Vista para obtener, actualizar o eliminar un producto específico
class ProductoDetail(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer  


# Vista para listar todas las categorías
class CategoriaList(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer