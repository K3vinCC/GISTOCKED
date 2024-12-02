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
        extra_kwargs = {
            'codigo_vendedor': {'required': True},  # Asegura que sea obligatorio
        }


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

# class UsuarioSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Usuario
#         fields = '__all__'
        
from django.contrib.auth.hashers import make_password

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['codigo_vendedor', 'id_empresa', 'email', 'password','codigo_de_confirmacion']

    def create(self, validated_data):
        # Asignar id_rol=1 por defecto
        validated_data['id_rol'] = 1
        # Encriptar la contraseña
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'
