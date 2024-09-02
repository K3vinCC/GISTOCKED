from django.urls import path, include
from rest_framework import routers
from api import views

# creamos un enrutador, para manejar multiples rutas
router = routers.DefaultRouter()

# registramos algo, qque esta relacionado con programers(es la base de la ruta),  views(maneja las rutas, las vistas)
router.register(r'programmers', views.ProgrammerViewSet)

# router.register(r'productost', views.ProductosViewSet)

router.register(r'productos', views.ProductoListCreate)
router.register(r'categorias', views.CategoriaList)


# agragamos todos los procesos, las urls
urlpatterns = [
    path('', include(router.urls))
]
