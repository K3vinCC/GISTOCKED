from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path, include
# from .views import (login, registrar_usuario, InventarioListView)
from .views import (login, registrar_usuario)

router = DefaultRouter()
router.register(r'categorias', views.CategoriaViewSet)
router.register(r'venta-general', views.VentaGeneralViewSet, basename='venta-general')
router.register(r'venta-producto', views.VentaProductoViewSet, basename='venta-producto')
router.register(r'formas-pago', views.FormaPagoViewSet)
router.register(r'historial-productos', views.HistorialProductosViewSet)
router.register(r'inventarios', views.InventarioViewSet)
router.register(r'rol-users', views.RolUserViewSet)
router.register(r'usuarios', views.UsuarioViewSet)
router.register(r'empresas', views.EmpresaViewset)

urlpatterns = [
    path('login/', login, name='login'),
    path('registrar/', registrar_usuario, name='registrar_usuario'),
    # path('inventario/', InventarioListView.as_view(), name='inventario'),
    # path('vendedoreslog/', vendedores_login, name='vendedores_login'),
]
urlpatterns += router.urls
