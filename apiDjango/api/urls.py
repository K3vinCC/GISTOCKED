from rest_framework.routers import DefaultRouter
from .views import (
    CategoriaViewSet, DetalleVentaViewSet, FormaPagoViewSet,
    HistorialProductosViewSet, InventarioViewSet, RolUserViewSet,
    UsuarioViewSet, VendedorViewSet, VentaViewSet, login, product_list, actualizar_stock
)
from django.urls import path, include

# Definir las rutas con el router
router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'detalles_venta', DetalleVentaViewSet)
router.register(r'formas_pago', FormaPagoViewSet)
router.register(r'historial_productos', HistorialProductosViewSet)
router.register(r'inventarios', InventarioViewSet)
router.register(r'roles', RolUserViewSet)
router.register(r'usuarios', UsuarioViewSet)
router.register(r'vendedores', VendedorViewSet)
router.register(r'ventas', VentaViewSet)

# Combinar las rutas generadas por el router con tus rutas manuales
urlpatterns = [
    path('login/', login, name='login'),
    path('plist/', product_list, name='plist'),
    path('astock/', actualizar_stock, name='astock'),# Ruta manual para login
      # Ruta manual para crear usuario
]

# Incluir las rutas del router
urlpatterns += router.urls