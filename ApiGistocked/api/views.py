from rest_framework import viewsets
from .models import *
from .serializer import *

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class VentaViewSet(viewsets.ModelViewSet):
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer

class DetalleVentaViewSet(viewsets.ModelViewSet):
    queryset = DetalleVenta.objects.all()
    serializer_class = DetalleVentaSerializer

class MetodoPagoViewSet(viewsets.ModelViewSet):
    queryset = MetodoPago.objects.all()
    serializer_class = MetodoPagoSerializer

class EstadoPagoViewSet(viewsets.ModelViewSet):
    queryset = EstadoPago.objects.all()
    serializer_class = EstadoPagoSerializer

class FormaPagoViewSet(viewsets.ModelViewSet):
    queryset = FormaPago.objects.all()
    serializer_class = FormaPagoSerializer

class RolUserViewSet(viewsets.ModelViewSet):
    queryset = RolUser.objects.all()
    serializer_class = RolUserSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
