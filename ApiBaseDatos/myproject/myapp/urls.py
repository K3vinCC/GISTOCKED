from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path, include
# from .views import (login, registrar_usuario, InventarioListView)
from .views import *

# router = DefaultRouter()
# router.register(r'categorias', views.CategoriaViewSet)
# router.register(r'venta-general', views.VentaGeneralViewSet, basename='venta-general')
# router.register(r'venta-producto', views.VentaProductoViewSet, basename='venta-producto')
# router.register(r'formas-pago', views.FormaPagoViewSet)
# router.register(r'historial-productos', views.HistorialProductosViewSet)
# router.register(r'inventarios', views.InventarioViewSet)
# router.register(r'rol-users', views.RolUserViewSet)
# router.register(r'usuarios', views.UsuarioViewSet)
# router.register(r'empresas', views.EmpresaViewset)




router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'empresas', EmpresaViewSet)
router.register(r'formas-pago', FormaPagoViewSet)
router.register(r'historial-productos', HistorialProductoViewSet)
router.register(r'inventarios', InventarioViewSet)
router.register(r'roles', RolViewSet)
router.register(r'usuarios', UsuarioViewSet)
router.register(r'ventas-generales', VentaGeneralViewSet)
router.register(r'ventas-productos', VentaProductoViewSet)

urlpatterns = [
#     path('login/', login, name='login'),
#     path('registrar/', registrar_usuario, name='registrar_usuario'),
#     # path('inventario/', InventarioListView.as_view(), name='inventario'),
#     # path('vendedoreslog/', vendedores_login, name='vendedores_login'),
    
    
    path('crear-usuario/', CrearUsuarioView.as_view(), name='crear_usuario'),
    path('login-usuario/', LoginView.as_view(), name='login'),
    path('categoria-empresa/', CategoriaView.as_view(), name='categoria'),
    path('historial-producto-empresa/', HistorialProductoView.as_view(), name='historial_producto'),
    path('inventario-empresa/', InventarioView.as_view(), name='inventario'),
    path('usuario-empresa/', UsuarioView.as_view(), name='usuario'),
    
    path('crear-venta/', CrearVentaView.as_view(), name='crear_venta'),
    path('detalle-venta/', DetalleVentaView.as_view(), name='detalle_venta'),
]


urlpatterns += router.urls