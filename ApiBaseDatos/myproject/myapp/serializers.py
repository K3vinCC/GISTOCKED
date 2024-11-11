# from rest_framework import serializers
# from .models import Categoria

# class CategoriaSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Categoria
#         fields = '__all__'  # Todos los campos


from rest_framework import serializers
# from .models import (
#     AuthGroup, AuthGroupPermissions, AuthPermission, AuthUser, AuthUserGroups, AuthUserUserPermissions,
#     Categoria, DetalleVenta, DjangoAdminLog, DjangoContentType, DjangoMigrations, DjangoSession,
#     FormaPago, HistorialProductos, Inventario, RolUser, Usuario, Vendedores, Ventas
# )
from .models import *
# class AuthGroupSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AuthGroup
#         fields = '__all__'

# class AuthGroupPermissionsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AuthGroupPermissions
#         fields = '__all__'

# class AuthPermissionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AuthPermission
#         fields = '__all__'

# class AuthUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AuthUser
#         fields = '__all__'

# class AuthUserGroupsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AuthUserGroups
#         fields = '__all__'

# class AuthUserUserPermissionsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AuthUserUserPermissions
#         fields = '__all__'

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class DetalleVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleVenta
        fields = '__all__'

# class DjangoAdminLogSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DjangoAdminLog
#         fields = '__all__'

# class DjangoContentTypeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DjangoContentType
#         fields = '__all__'

# class DjangoMigrationsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DjangoMigrations
#         fields = '__all__'

# class DjangoSessionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DjangoSession
#         fields = '__all__'

class FormaPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormaPago
        fields = '__all__'

class HistorialProductosSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialProductos
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

# class VendedoresSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Vendedores
#         fields = '__all__'

class VentasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ventas
        fields = '__all__'
