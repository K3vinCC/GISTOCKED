# from django.urls import path
# from .views import TableListView, TableDataView

# # urlpatterns = [
# #     path('tables/', TableListView.as_view(), name='table-list'),
# # ]

# urlpatterns = [
#     path('tables/', TableListView.as_view(), name='table-list'),
#     path('tablesd/<str:table_name>/', TableDataView.as_view(), name='table-data'),
# ]

# ============================================
# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import CategoriaViewSet

# router = DefaultRouter()
# router.register(r'categorias', CategoriaViewSet)

# urlpatterns = [
#     path('', include(router.urls)),
# ]

#================================================
from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path, include
from .views import (login, registrar_usuario, InventarioListView)

router = DefaultRouter()
# router.register(r'auth-groups', views.AuthGroupViewSet)
# router.register(r'auth-group-permissions', views.AuthGroupPermissionsViewSet)
# router.register(r'auth-permissions', views.AuthPermissionViewSet)
# router.register(r'auth-users', views.AuthUserViewSet)
# router.register(r'auth-user-groups', views.AuthUserGroupsViewSet)
# router.register(r'auth-user-permissions', views.AuthUserUserPermissionsViewSet)
router.register(r'categorias', views.CategoriaViewSet)
# # router.register(r'detalle-ventas', views.DetalleVentaGeneralSerializer)
# router.register(r'detalle-ventas-general', views.DetalleVentaGeneralSerializer, basename='detalle-ventas-general')
# router.register(r'detalle-ventas-producto', views.DetalleVentaProductoSerializer, basename='datalle')
router.register(r'venta-general', views.VentaGeneralViewSet, basename='venta-general')
router.register(r'venta-producto', views.VentaProductoViewSet, basename='venta-producto')
# router.register(r'django-admin-logs', views.DjangoAdminLogViewSet)
# router.register(r'django-content-types', views.DjangoContentTypeViewSet)
# router.register(r'django-migrations', views.DjangoMigrationsViewSet)
# router.register(r'django-sessions', views.DjangoSessionViewSet)
router.register(r'formas-pago', views.FormaPagoViewSet)
router.register(r'historial-productos', views.HistorialProductosViewSet)
router.register(r'inventarios', views.InventarioViewSet)
router.register(r'rol-users', views.RolUserViewSet)
router.register(r'usuarios', views.UsuarioViewSet)
router.register(r'empresas', views.EmpresaViewset)
# router.register(r'vendedores', views.VendedoresViewSet)

# urlpatterns = router.urls

urlpatterns = [
    path('login/', login, name='login'),
    path('registrar/', registrar_usuario, name='registrar_usuario'),
    path('inventario/', InventarioListView.as_view(), name='inventario'),
    # path('vendedoreslog/', vendedores_login, name='vendedores_login'),
]
urlpatterns += router.urls
