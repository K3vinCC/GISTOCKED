from rest_framework import serializers
from .models import Categoria, Empresa, FormaPago, HistorialProducto, Inventario, Rol, Usuario, VentaGeneral, VentaProducto

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'

class FormaPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormaPago
        fields = '__all__'

class HistorialProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialProducto
        fields = '__all__'

class InventarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventario
        fields = '__all__'

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class VentaGeneralSerializer(serializers.ModelSerializer):
    class Meta:
        model = VentaGeneral
        fields = '__all__'

class VentaProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VentaProducto
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
