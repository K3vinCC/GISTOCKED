from django.db import models

# create your models here


class Programmer(models.Model):
    fullname = models.CharField(max_length=100)
    nickname = models.CharField(max_length=50)
    age = models.PositiveSmallIntegerField()
    is_active = models.BooleanField(default=True)

#=============Models Base de Datos====================

class Categoria(models.Model):
    nombre_categoria = models.CharField(max_length=50)
    estado = models.CharField(max_length=10, choices=[('activo', 'Activo'), ('inactivo', 'Inactivo')], default='activo')
    descripcion = models.TextField(null=True)

class DetalleVenta(models.Model):
    id_venta = models.ForeignKey('Venta', on_delete=models.CASCADE)
    id_producto = models.ForeignKey('Producto', on_delete=models.CASCADE)
    cantidad_vendida = models.PositiveIntegerField()
    total_detalle = models.DecimalField(max_digits=12, decimal_places=2)

class EstadoPago(models.Model):
    nombre_estado = models.CharField(max_length=50)
    descripcion_estado = models.TextField(null=True)

class FormaPago(models.Model):
    id_metodo_pago = models.ForeignKey('MetodoPago', on_delete=models.CASCADE)
    id_estado_pago = models.ForeignKey('EstadoPago', on_delete=models.CASCADE)

class InfVentas(models.Model):
    id_usuario = models.ForeignKey('Usuario', on_delete=models.CASCADE)
    fecha = models.DateField()
    total_ventas = models.DecimalField(max_digits=12, decimal_places=2)
    productos_mas_vendidos = models.TextField(null=True)

class Inventario(models.Model):
    id_producto = models.ForeignKey('Producto', on_delete=models.CASCADE)
    fecha_entrada = models.DateField()
    fecha_salida = models.DateField(null=True)
    cantidad = models.PositiveIntegerField()
    stock_ajustado = models.PositiveIntegerField(null=True)

class MetodoPago(models.Model):
    nombre_metodo = models.CharField(max_length=50)
    descripcion_metodo = models.TextField(null=True)

class Producto(models.Model):
    nombre_producto = models.CharField(max_length=100)
    descripcion = models.TextField(null=True)
    precio_compra = models.DecimalField(max_digits=12, decimal_places=2)
    porcentaje_ganancia = models.DecimalField(max_digits=5, decimal_places=2)
    precio_neto = models.DecimalField(max_digits=12, decimal_places=2)
    precio_venta = models.DecimalField(max_digits=12, decimal_places=2)
    precio_final = models.DecimalField(max_digits=12, decimal_places=2)
    id_categoria = models.ForeignKey('Categoria', on_delete=models.CASCADE) #on_delete=models.SET_NULL)#,
    stock = models.PositiveIntegerField()

class RolUser(models.Model):
    nombre_rol = models.CharField(max_length=50)
    permisos = models.CharField(max_length=100)

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    contraseña = models.CharField(max_length=255)
    rol = models.ForeignKey('RolUser', on_delete=models.SET_NULL, null=True)

class Venta(models.Model):
    fecha_venta = models.DateField()
    total_venta = models.DecimalField(max_digits=12, decimal_places=2)
    descuento = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    id_usuario = models.ForeignKey('Usuario', on_delete=models.CASCADE)
    id_forma_pago = models.ForeignKey('FormaPago', on_delete=models.CASCADE)