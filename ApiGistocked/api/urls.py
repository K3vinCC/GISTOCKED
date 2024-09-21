from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import *

router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'ventas', VentaViewSet)
router.register(r'detalle-ventas', DetalleVentaViewSet)
router.register(r'metodo-pagos', MetodoPagoViewSet)
router.register(r'estado-pagos', EstadoPagoViewSet)
router.register(r'forma-pagos', FormaPagoViewSet)
router.register(r'roles', RolUserViewSet)
router.register(r'usuarios', UsuarioViewSet)



# agragamos todos los procesos, las urls
urlpatterns = [
    path('', include(router.urls))
]

