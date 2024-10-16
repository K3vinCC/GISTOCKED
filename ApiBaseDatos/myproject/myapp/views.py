# from rest_framework.views import APIView
# from rest_framework.response import Response
# from django.db import connection

# class TableListView(APIView):
#     def get(self, request):
#         with connection.cursor() as cursor:
#             cursor.execute("SHOW TABLES;")
#             tables = cursor.fetchall()
#         return Response({'tables': [table[0] for table in tables]})

# class TableDataView(APIView):
#     def get(self, request, table_name):
#         with connection.cursor() as cursor:
#             cursor.execute(f"SELECT * FROM {table_name};")
#             rows = cursor.fetchall()
#             columns = [col[0] for col in cursor.description]
#         return Response({ 'table': table_name, 'data': [dict(zip(columns, row)) for row in rows] })


#============================================= 

# from rest_framework import viewsets
# from .models import Categoria  # uno de los modelos generados
# from .serializers import CategoriaSerializer

# class CategoriaViewSet(viewsets.ModelViewSet):
#     queryset = Categoria.objects.all()
#     serializer_class = CategoriaSerializer
# ====================================================

from rest_framework import viewsets
from .models import (
    AuthGroup, AuthGroupPermissions, AuthPermission, AuthUser, AuthUserGroups, AuthUserUserPermissions,
    Categoria, DetalleVenta, DjangoAdminLog, DjangoContentType, DjangoMigrations, DjangoSession,
    FormaPago, HistorialProductos, Inventario, RolUser, Usuario, Vendedores, Ventas
)
from .serializers import (
    AuthGroupSerializer, AuthGroupPermissionsSerializer, AuthPermissionSerializer, AuthUserSerializer,
    AuthUserGroupsSerializer, AuthUserUserPermissionsSerializer, CategoriaSerializer, DetalleVentaSerializer,
    DjangoAdminLogSerializer, DjangoContentTypeSerializer, DjangoMigrationsSerializer, DjangoSessionSerializer,
    FormaPagoSerializer, HistorialProductosSerializer, InventarioSerializer, RolUserSerializer, UsuarioSerializer,
    VendedoresSerializer, VentasSerializer
)

class AuthGroupViewSet(viewsets.ModelViewSet):
    queryset = AuthGroup.objects.all()
    serializer_class = AuthGroupSerializer

class AuthGroupPermissionsViewSet(viewsets.ModelViewSet):
    queryset = AuthGroupPermissions.objects.all()
    serializer_class = AuthGroupPermissionsSerializer

class AuthPermissionViewSet(viewsets.ModelViewSet):
    queryset = AuthPermission.objects.all()
    serializer_class = AuthPermissionSerializer

class AuthUserViewSet(viewsets.ModelViewSet):
    queryset = AuthUser.objects.all()
    serializer_class = AuthUserSerializer

class AuthUserGroupsViewSet(viewsets.ModelViewSet):
    queryset = AuthUserGroups.objects.all()
    serializer_class = AuthUserGroupsSerializer

class AuthUserUserPermissionsViewSet(viewsets.ModelViewSet):
    queryset = AuthUserUserPermissions.objects.all()
    serializer_class = AuthUserUserPermissionsSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class DetalleVentaViewSet(viewsets.ModelViewSet):
    queryset = DetalleVenta.objects.all()
    serializer_class = DetalleVentaSerializer

class DjangoAdminLogViewSet(viewsets.ModelViewSet):
    queryset = DjangoAdminLog.objects.all()
    serializer_class = DjangoAdminLogSerializer

class DjangoContentTypeViewSet(viewsets.ModelViewSet):
    queryset = DjangoContentType.objects.all()
    serializer_class = DjangoContentTypeSerializer

class DjangoMigrationsViewSet(viewsets.ModelViewSet):
    queryset = DjangoMigrations.objects.all()
    serializer_class = DjangoMigrationsSerializer

class DjangoSessionViewSet(viewsets.ModelViewSet):
    queryset = DjangoSession.objects.all()
    serializer_class = DjangoSessionSerializer

class FormaPagoViewSet(viewsets.ModelViewSet):
    queryset = FormaPago.objects.all()
    serializer_class = FormaPagoSerializer

class HistorialProductosViewSet(viewsets.ModelViewSet):
    queryset = HistorialProductos.objects.all()
    serializer_class = HistorialProductosSerializer

class InventarioViewSet(viewsets.ModelViewSet):
    queryset = Inventario.objects.all()
    serializer_class = InventarioSerializer

class RolUserViewSet(viewsets.ModelViewSet):
    queryset = RolUser.objects.all()
    serializer_class = RolUserSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class VendedoresViewSet(viewsets.ModelViewSet):
    queryset = Vendedores.objects.all()
    serializer_class = VendedoresSerializer

class VentasViewSet(viewsets.ModelViewSet):
    queryset = Ventas.objects.all()
    serializer_class = VentasSerializer
