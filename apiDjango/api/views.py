import json
from rest_framework import viewsets
from .models import Usuario
from .serializers import UsuarioSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.hashers import check_password, make_password
from rest_framework import viewsets
from .models import Categoria, DetalleVenta, FormaPago, HistorialProductos, Inventario, RolUser, Usuario, Vendedor, Venta
from .serializers import CategoriaSerializer, DetalleVentaSerializer, FormaPagoSerializer, HistorialProductosSerializer, InventarioSerializer, RolUserSerializer, UsuarioSerializer, VendedorSerializer, VentaSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class DetalleVentaViewSet(viewsets.ModelViewSet):
    queryset = DetalleVenta.objects.all()
    serializer_class = DetalleVentaSerializer

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

class VendedorViewSet(viewsets.ModelViewSet):
    queryset = Vendedor.objects.all()
    serializer_class = VendedorSerializer

class VentaViewSet(viewsets.ModelViewSet):
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        nombre = data.get('nombre_usuario')
        passw = data.get('password')

        try:
            user = Usuario.objects.get(nombre_usuario=nombre)
            if passw == user.password:  # Sin hashear
                return JsonResponse({'message': 'Login successful role'}, status=200)
            else:
                return JsonResponse({'error': 'Invalid password'}, status=401)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

@csrf_exempt
def product_list(request):
    if request.method == 'GET':
        try:
            # Fetch all products
            products = Inventario.objects.all().values(
                'id_producto', 'nombre_producto', 'descripcion', 'precio_venta_final', 'cantidad', 'img'
            )

            # Optionally build full image URLs (if images are stored on the server)
            product_list = []
            for product in products:
                # Verifica que el campo 'imagen' no sea nulo o vacío
                if product['img']:
                    # Si 'imagen' es una URL válida o una ruta relativa, se convierte a URL absoluta
                    product['img'] = request.build_absolute_uri(product['img'])
                else:
                    product['img'] = None  # Si no hay imagen, dejamos el campo como None o algún valor por defecto

                product_list.append(product)

            # Return product data as a JSON response
            return JsonResponse(product_list, safe=False, status=200)

        except Exception as e:
            # Devuelve un error detallado si ocurre una excepción
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def actualizar_stock(request):
    if request.method == 'POST':
        id_producto = request.POST.get('id_producto')
        cantidad_vendida = int(request.POST.get('cantidad_vendida', 0))

        try:
            producto = Inventario.objects.get(id_producto=id_producto)
            if producto.cantidad >= cantidad_vendida:
                producto.cantidad -= cantidad_vendida
                producto.save()
                return JsonResponse({
                    'message': 'Stock actualizado',
                    'producto': producto.nombre_producto,
                    'cantidad': producto.cantidad,
                    'precio_venta_final': producto.precio_venta_final
                })
            else:
                return JsonResponse({'error': 'No hay suficiente stock'}, status=400)
        except Inventario.DoesNotExist:
            return JsonResponse({'error': 'Producto no encontrado'}, status=404)
    return JsonResponse({'error': 'Método no permitido'}, status=405)