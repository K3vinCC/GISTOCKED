from django.contrib import admin
from .models import Categoria, Producto, Venta, DetalleVenta, MetodoPago, EstadoPago, FormaPago, RolUser, Usuario

# Registramos cada modelo en el administrador de Django para que sean visibles y editables
# en la interfaz administrativa.

admin.site.register(Categoria)  # Registramos el modelo Categoria
admin.site.register(Producto)  # Registramos el modelo Producto
admin.site.register(Venta)      # Registramos el modelo Venta
admin.site.register(DetalleVenta)  # Registramos el modelo DetalleVenta
admin.site.register(MetodoPago)  # Registramos el modelo MetodoPago
admin.site.register(EstadoPago)  # Registramos el modelo EstadoPago
admin.site.register(FormaPago)  # Registramos el modelo FormaPago
admin.site.register(RolUser)    # Registramos el modelo RolUser
admin.site.register(Usuario)    # Registramos el modelo Usuario