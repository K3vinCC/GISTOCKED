from rest_framework import serializers
from .models import Programmer,Categoria, Producto, DetalleVenta, EstadoPago, FormaPago, InfVentas, Inventario, MetodoPago, RolUser, Usuario, Venta


# Un serializador define cómo se convertirán los objetos de tu modelo en representaciones JSON o similares.
class ProgrammerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programmer
        # fields = ('fullname','nickname')
        fields = '__all__'  # todo los campos

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'  # Incluye todos los campos

class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer(read_only=True)  # Anida el serializador de categoría

    class Meta:
        model = Producto
        fields = '__all__'

class DetalleVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleVenta
        fields = '__all__'

class EstadoPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoPago
        fields = '__all__'

class FormaPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormaPago
        fields = '__all__'

class InfVentasSerializer(serializers.ModelSerializer):
    class Meta:
        model = InfVentas
        fields = '__all__'

class InventarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventario
        fields = '__all__'

class MetodoPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetodoPago
        fields = '__all__'

class RolUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolUser
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class VentaSerializer(serializers.ModelSerializer):
    detalle_venta = DetalleVentaSerializer(many=True, read_only=True)  # Relacion muchos a uno

    class Meta:
        model = Venta
        fields = '__all__'