from rest_framework import status
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import *
from .serializers import *

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

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



class VentaGeneralViewSet(viewsets.ModelViewSet):
    queryset = VentaGeneral.objects.all()
    serializer_class = VentaGeneralSerializer


class VentaProductoViewSet(viewsets.ModelViewSet):
    queryset = VentaProducto.objects.all()
    serializer_class = VentaProductoSerializer


class EmpresaViewset(viewsets.ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer


@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # nombre = data.get('Email')
        # passw = data.get('Password')

        # Cambiado a minúsculas para coincidir con el frontend
        email = data.get('email')
        # Cambiado a minúsculas para coincidir con el frontend
        password = data.get('password')

        # print(f"nombre: {nombre}, passw:{passw}")
        try:
            user = Usuario.objects.get(email=email)
            empresa = Empresa.objects.get(id_empresa=user.id_empresa)
            if password == user.password:
                rdata = {'codigo_vendedor': str(user.codigo_vendedor), 'id_rol': int(
                    user.id_rol), 'email': str(user.email), 'password': str(user.password) , 'empresa':str(empresa.nombre_empresa)}

                return JsonResponse(rdata, status=200)
            else:
                return JsonResponse({'error': 'Invalid password'}, status=401)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)


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
