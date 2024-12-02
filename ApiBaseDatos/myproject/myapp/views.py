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

from django.contrib.auth.hashers import check_password

class CrearUsuarioView(APIView):
    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Usuario creado exitosamente"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if not email:
            return Response({'error': 'email es requerido'}, status=status.HTTP_400_BAD_REQUEST)
        if not password:
            return Response({'error': 'password  es requerido'}, status = status.HTTP_400_BAD_REQUEST)
        try:
            usuario = Usuario.objects.get(email=email)
            if usuario and check_password(password, usuario.password):
                return Response({"message": "Inicio sesion exitoso"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        
        
class CategoriaView(APIView):
    def post(self, request):
        id_empresa = request.data.get('id_empresa')
        if not id_empresa:
            return Response({'error': 'id_empresa es requerido'}, status=status.HTTP_400_BAD_REQUEST)

        categorias = Categoria.objects.filter(id_empresa=id_empresa)
        serializer = CategoriaSerializer(categorias, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class HistorialProductoView(APIView):
    def post(self, request):
        id_empresa = request.data.get('id_empresa')
        id_producto = request.data.get('id_producto')

        if not id_empresa:
            return Response({'error': 'id_empresa es requerido'}, status=status.HTTP_400_BAD_REQUEST)

        historial = HistorialProducto.objects.filter(id_empresa=id_empresa)
        if id_producto:
            historial = historial.filter(id_producto=id_producto)

        serializer = HistorialProductosSerializer(historial, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class InventarioView(APIView):
    def post(self, request):
        id_empresa = request.data.get('id_empresa')
        id_producto = request.data.get('id_producto')

        if not id_empresa:
            return Response({'error': 'id_empresa es requerido'}, status=status.HTTP_400_BAD_REQUEST)

        inventarios = Inventario.objects.filter(id_empresa=id_empresa)
        if id_producto:
            inventarios = inventarios.filter(id_producto=id_producto)

        serializer = InventarioSerializer(inventarios, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UsuarioView(APIView):
    def post(self, request):
        id_empresa = request.data.get('id_empresa')

        if not id_empresa:
            return Response({'error': 'id_empresa es requerido'}, status=status.HTTP_400_BAD_REQUEST)

        usuarios = Usuario.objects.filter(id_empresa=id_empresa)
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
from django.utils.timezone import now, timedelta
   
   
# # Vista para crear una venta general y sus productos asociados
# class CrearVentaView(APIView):
#     def post(self, request):
#         # Extrae los datos de la venta general del cuerpo de la solicitud
#         venta_general_data = {
#             "codigo_vendedor": request.data.get("codigo_vendedor"),  # Código del vendedor
#             "id_empresa": request.data.get("id_empresa"),  # ID de la empresa
#             "total": request.data.get("total"),  # Total de la venta
#             "fecha_venta": now(),  # Fecha actual como fecha de venta
#         }
        
#         # Serializa los datos de la venta general para validarlos y guardarlos
#         venta_general_serializer = VentaGeneralSerializer(data=venta_general_data)
#         if venta_general_serializer.is_valid():  # Verifica si los datos son válidos
#             venta_general = venta_general_serializer.save()  # Guarda la venta general
            
#             # Itera sobre los productos enviados en el cuerpo de la solicitud
#             productos = request.data.get("productos", [])
#             for producto_data in productos:
#                 # Añade la referencia a la venta general y la empresa
#                 producto_data["id_venta_general"] = venta_general.id_venta_total
#                 producto_data["id_empresa"] = venta_general.id_empresa
                
#                 # Serializa los datos de cada producto para validarlos y guardarlos
#                 producto_serializer = VentaProductoSerializer(data=producto_data)
#                 if producto_serializer.is_valid():  # Verifica si los datos son válidos
#                     producto_serializer.save()  # Guarda el producto
#                 else:
#                     # Si algún producto tiene errores, responde con el detalle del error
#                     return Response(producto_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#             # Devuelve la venta general junto con los productos creados
#             return Response(VentaGeneralSerializer(venta_general).data, status=status.HTTP_201_CREATED)
#         else:
#             # Responde con errores de validación si los datos de la venta general no son válidos
#             return Response(venta_general_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CrearVentaView(APIView):
    def post(self, request):
        # Extrae los datos de la venta general del cuerpo de la solicitud
        venta_general_data = {
            "codigo_vendedor": request.data.get("codigo_vendedor"),  # Código del vendedor
            "id_empresa": request.data.get("id_empresa"),  # ID de la empresa
            "total": request.data.get("total"),  # Total de la venta
            "fecha_venta": now(),  # Fecha actual como fecha de venta
        }

        # Serializa los datos de la venta general para validarlos y guardarlos
        venta_general_serializer = VentaGeneralSerializer(data=venta_general_data)
        if venta_general_serializer.is_valid():  # Verifica si los datos son válidos
            venta_general = venta_general_serializer.save()  # Guarda la venta general
            
            # Itera sobre los productos enviados en el cuerpo de la solicitud
            productos = request.data.get("productos", [])
            for producto_data in productos:
                # Recupera el producto del inventario usando el ID proporcionado
                field_id_producto = producto_data.get("field_id_producto")
                try:
                    inventario = Inventario.objects.get(id_producto=field_id_producto)
                except Inventario.DoesNotExist:
                    return Response(
                        {"error": f"El producto con id {field_id_producto} no existe en el inventario."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                
                # Completa los datos del producto usando la información del inventario
                producto_data["id_venta_general"] = venta_general.id_venta_total
                producto_data["id_empresa"] = venta_general.id_empresa
                producto_data["nombre_producto"] = inventario.nombre_producto
                producto_data["precio_unitario"] = inventario.precio_venta_final

                # Serializa los datos de cada producto para validarlos y guardarlos
                producto_serializer = VentaProductoSerializer(data=producto_data)
                if producto_serializer.is_valid():  # Verifica si los datos son válidos
                    producto_serializer.save()  # Guarda el producto
                else:
                    # Si algún producto tiene errores, responde con el detalle del error
                    return Response(producto_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # Devuelve la venta general junto con los productos creados
            return Response(VentaGeneralSerializer(venta_general).data, status=status.HTTP_201_CREATED)
        else:
            # Responde con errores de validación si los datos de la venta general no son válidos
            return Response(venta_general_serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# Vista para obtener detalles de ventas generales y sus productos
class DetalleVentaView(APIView):
    def post(self, request):
        # Extrae los parámetros enviados en el cuerpo de la solicitud
        id_empresa = request.data.get("id_empresa")  # ID de la empresa
        dias_atras = request.data.get("dias_atras", 0)  # Número de días atrás para filtrar las ventas

        # Verifica que se haya enviado el id_empresa
        if not id_empresa:
            return Response({'error': 'id_empresa es requerido'}, status=status.HTTP_400_BAD_REQUEST)

        # Calcula la fecha inicial según los días atrás
        fecha_inicio = now() - timedelta(days=dias_atras)

        # Filtra las ventas generales por ID de empresa y fecha de venta mayor o igual a la fecha calculada
        ventas = VentaGeneral.objects.filter(id_empresa=id_empresa, fecha_venta__gte=fecha_inicio)

        # Serializa las ventas generales, incluyendo sus productos relacionados
        serializer = VentaGeneralSerializer(ventas, many=True)

        # Devuelve las ventas serializadas como respuesta
        return Response(serializer.data, status=status.HTTP_200_OK)