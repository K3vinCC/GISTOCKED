from django.contrib import admin
from .models import Programmer,Producto

# Register your models here.

# Programmer sea visible y editable en la interfaz de administración de Django
admin.site.register(Programmer)
admin.site.register(Producto)
