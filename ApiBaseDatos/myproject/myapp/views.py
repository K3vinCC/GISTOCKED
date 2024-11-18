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

# from rest_framework import viewsets
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

# from .models import (
#     AuthGroup, AuthGroupPermissions, AuthPermission, AuthUser, AuthUserGroups, AuthUserUserPermissions,
#     Categoria, DetalleVenta, DjangoAdminLog, DjangoContentType, DjangoMigrations, DjangoSession,
#     FormaPago, HistorialProductos, Inventario, RolUser, Usuario, Vendedores, Ventas
# )
# from .serializers import (
#     AuthGroupSerializer, AuthGroupPermissionsSerializer, AuthPermissionSerializer, AuthUserSerializer,
#     AuthUserGroupsSerializer, AuthUserUserPermissionsSerializer, CategoriaSerializer, DetalleVentaSerializer,
#     DjangoAdminLogSerializer, DjangoContentTypeSerializer, DjangoMigrationsSerializer, DjangoSessionSerializer,
#     FormaPagoSerializer, HistorialProductosSerializer, InventarioSerializer, RolUserSerializer, UsuarioSerializer,
#     VendedoresSerializer, VentasSerializer
# )
from .models import *
from .serializers import *

# class AuthGroupViewSet(viewsets.ModelViewSet):
#     queryset = AuthGroup.objects.all()
#     serializer_class = AuthGroupSerializer

# class AuthGroupPermissionsViewSet(viewsets.ModelViewSet):
#     queryset = AuthGroupPermissions.objects.all()
#     serializer_class = AuthGroupPermissionsSerializer

# class AuthPermissionViewSet(viewsets.ModelViewSet):
#     queryset = AuthPermission.objects.all()
#     serializer_class = AuthPermissionSerializer

# class AuthUserViewSet(viewsets.ModelViewSet):
#     queryset = AuthUser.objects.all()
#     serializer_class = AuthUserSerializer

# class AuthUserGroupsViewSet(viewsets.ModelViewSet):
#     queryset = AuthUserGroups.objects.all()
#     serializer_class = AuthUserGroupsSerializer

# class AuthUserUserPermissionsViewSet(viewsets.ModelViewSet):
#     queryset = AuthUserUserPermissions.objects.all()
#     serializer_class = AuthUserUserPermissionsSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

# class DetalleVentaViewSet(viewsets.ModelViewSet):
#     queryset = DetalleVenta.objects.all()
#     serializer_class = DetalleVentaSerializer

# class DjangoAdminLogViewSet(viewsets.ModelViewSet):
#     queryset = DjangoAdminLog.objects.all()
#     serializer_class = DjangoAdminLogSerializer

# class DjangoContentTypeViewSet(viewsets.ModelViewSet):
#     queryset = DjangoContentType.objects.all()
#     serializer_class = DjangoContentTypeSerializer

# class DjangoMigrationsViewSet(viewsets.ModelViewSet):
#     queryset = DjangoMigrations.objects.all()
#     serializer_class = DjangoMigrationsSerializer

# class DjangoSessionViewSet(viewsets.ModelViewSet):
#     queryset = DjangoSession.objects.all()
#     serializer_class = DjangoSessionSerializer

class FormaPagoViewSet(viewsets.ModelViewSet):
    queryset = FormaPago.objects.all()
    serializer_class = FormaPagoSerializer

class HistorialProductosViewSet(viewsets.ModelViewSet):
    queryset = HistorialProducto.objects.all()
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

# class VendedoresViewSet(viewsets.ModelViewSet):
#     queryset = Vendedores.objects.all()
#     serializer_class = VendedoresSerializer

# class VentasGeneralViewSet(viewsets.ModelViewSet):
#     queryset = VentaGeneral.objects.all()
#     serializer_class = DetalleVentaGeneralSerializer
    
# class VentasProductoViewSet(viewsets.ModelViewSet):
#     queryset = VentaProducto.objects.all()
#     serializer_class = DetalleVentaProductoSerializer
class VentaGeneralViewSet(viewsets.ModelViewSet):
    queryset = VentaGeneral.objects.all()
    serializer_class = VentaGeneralSerializer


class VentaProductoViewSet(viewsets.ModelViewSet):
    queryset = VentaProducto.objects.all()
    serializer_class = VentaProductoSerializer


@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        nombre = data.get('nombre_usuario')
        passw = data.get('password')
	
        try:
            user = Usuario.objects.get(nombre_usuario=nombre)
            if passw == user.password:  
                rdata = {'codigo_vendedor': str(user.codigo_vendedor),'id_rol': int(user.id_rol.id_rol),'nombre_empresa': str(user.nombre_empresa),'nombre_usuario': str(user.nombre_usuario),'email': str(user.email),'password': str(user.password)}
                return JsonResponse(rdata, status=200)
            else:
                return JsonResponse({'error': 'Invalid password'}, status=401)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

from rest_framework import status

@csrf_exempt
def registrar_usuario(request):
    if request.method == 'POST':
        try:
            # Cargamos los datos del cuerpo de la petici n
            data = json.loads(request.body)

            # Asignamos id_rol = 1 para todos los usuarios
            data['id_rol'] = 1
            data['id_admin'] = None
            # Inicializamos el serializer
            usuario_serializer = UsuarioSerializer(data=data)

            # Validamos los datos
            if usuario_serializer.is_valid():
                # Guardamos el usuario sin asignar id_admin (el c digo vendedor es autoincremental)
                usuario = usuario_serializer.save()

                # Asignamos el id_admin igual al codigo_vendedor autoincrementado
                
                usuario.save()

                # Devolvemos una respuesta exitosa
                return JsonResponse(usuario_serializer.data, status=status.HTTP_201_CREATED)
            else:
                # Si los datos no son v lidos, devolvemos los errores
                return JsonResponse(usuario_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return JsonResponse({'error': 'Metodo no permitido'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

class InventarioListView(APIView):
    def get(self, request, *args, **kwargs):
        nombre_empresa = request.query_params.get('nombre_empresa')
        if not nombre_empresa:
            return Response({"error": "nombre_empresa is required in the query parameters."}, status=400)
        inventario_items = Inventario.objects.filter(id_empresa=0)
        serializer = InventarioSerializer(inventario_items, many=True)
        return Response(serializer.data)
