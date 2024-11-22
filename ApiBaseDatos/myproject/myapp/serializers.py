from rest_framework import serializers

from .models import *

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'


class VentaGeneralSerializer(serializers.ModelSerializer):
    class Meta:
        model = VentaGeneral
        fields = '__all__'


class VentaProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VentaProducto
        fields = '__all__'

class FormaPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormaPago
        fields = '__all__'

class HistorialProductosSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialProducto
        fields = '__all__'

class InventarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventario
        fields = '__all__'

class RolUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolUser
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'
