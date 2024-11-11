# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre_categoria = models.CharField(max_length=50)
    id_empresa = models.ForeignKey('Empresa', models.DO_NOTHING, db_column='id_empresa')

    class Meta:
        db_table = 'categoria'


class DetalleVenta(models.Model):
    id_detalle_venta = models.AutoField(primary_key=True)
    id_venta = models.ForeignKey('Ventas', models.DO_NOTHING, db_column='id_venta')
    id_producto = models.ForeignKey('Inventario', models.DO_NOTHING, db_column='id_producto')
    cantidad = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    precio_total = models.DecimalField(max_digits=10, decimal_places=2)
    id_empresa = models.ForeignKey('Empresa', models.DO_NOTHING, db_column='id_empresa')
    nombre_producto = models.CharField(max_length=100)

    class Meta:
        db_table = 'detalle_venta'


class Empresa(models.Model):
    id_empresa = models.AutoField(primary_key=True)
    nombre_empresa = models.CharField(max_length=100)

    class Meta:
        db_table = 'empresa'


class FormaPago(models.Model):
    id_forma_pago = models.AutoField(primary_key=True)
    nombre_forma = models.CharField(max_length=50)

    class Meta:
        db_table = 'forma_pago'


class HistorialProductos(models.Model):
    id_historial = models.AutoField(primary_key=True)
    id_producto = models.IntegerField(blank=True, null=True)
    accion = models.CharField(max_length=8)
    fecha_modificacion = models.DateTimeField()
    detalles_modificacion = models.TextField(blank=True, null=True)
    id_usuario = models.IntegerField()
    nombre_producto = models.CharField(max_length=255, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    precio_compra = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    precio_neto = models.DecimalField(max_digits=10, decimal_places=2)
    precio_venta = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    precio_venta_final = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad = models.IntegerField(blank=True, null=True)
    id_empresa = models.IntegerField()
    descuento = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    precio_descuento = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    porcentaje_ganancia = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    class Meta:
        db_table = 'historial_productos'


class Inventario(models.Model):
    id_producto = models.AutoField(primary_key=True)
    img = models.TextField(blank=True, null=True)
    nombre_producto = models.CharField(max_length=100, blank=True, null=True)
    descripcion = models.CharField(max_length=100)
    precio_compra = models.DecimalField(max_digits=10, decimal_places=2)
    porcentaje_de_ganancia = models.DecimalField(max_digits=5, decimal_places=2)
    precio_neto = models.DecimalField(max_digits=10, decimal_places=2)
    precio_venta = models.DecimalField(max_digits=10, decimal_places=2)
    precio_venta_final = models.DecimalField(max_digits=10, decimal_places=2)
    codigo = models.IntegerField()
    id_categoria = models.IntegerField()
    descuento = models.IntegerField()
    precio_descuento = models.FloatField()
    cantidad = models.IntegerField(blank=True, null=True)
    id_empresa = models.IntegerField()

    class Meta:
        db_table = 'inventario'


class RolUser(models.Model):
    id_rol = models.AutoField(primary_key=True)
    nombre_rol = models.CharField(max_length=50)

    class Meta:
        db_table = 'rol_user'


class Usuario(models.Model):
    codigo_vendedor = models.CharField(primary_key=True, max_length=255)
    nombre_usuario = models.CharField(max_length=100)
    nombre_empresa = models.CharField(max_length=100)
    password = models.CharField(max_length=255)
    email = models.CharField(unique=True, max_length=100)
    id_rol = models.ForeignKey(RolUser, models.DO_NOTHING, db_column='id_rol')
    id_admin = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'usuario'


class Ventas(models.Model):
    id_venta = models.AutoField(primary_key=True)
    codigo_vendedor = models.CharField(unique=True, max_length=255, blank=True, null=True)
    id_producto = models.IntegerField(blank=True, null=True)
    fecha_venta = models.DateField(blank=True, null=True)
    id_empresa = models.ForeignKey(Empresa, models.DO_NOTHING, db_column='id_empresa', blank=True, null=True)
    total = models.IntegerField()

    class Meta:
        db_table = 'ventas'
