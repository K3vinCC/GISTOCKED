# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
# from django.db import models


# class Categoria(models.Model):
#     id_categoria = models.AutoField(primary_key=True)
#     nombre_categoria = models.CharField(max_length=50)
#     id_empresa = models.ForeignKey('Empresa', models.DO_NOTHING, db_column='id_empresa')

#     class Meta:
#         db_table = 'categoria'


# class DetalleVenta(models.Model):
#     id_detalle_venta = models.AutoField(primary_key=True)
#     id_venta = models.ForeignKey('Ventas', models.DO_NOTHING, db_column='id_venta')
#     id_producto = models.ForeignKey('Inventario', models.DO_NOTHING, db_column='id_producto')
#     cantidad = models.IntegerField()
#     precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
#     precio_total = models.DecimalField(max_digits=10, decimal_places=2)
#     id_empresa = models.ForeignKey('Empresa', models.DO_NOTHING, db_column='id_empresa')
#     nombre_producto = models.CharField(max_length=100)

#     class Meta:
#         db_table = 'detalle_venta'


# class Empresa(models.Model):
#     id_empresa = models.AutoField(primary_key=True)
#     nombre_empresa = models.CharField(max_length=100)

#     class Meta:
#         db_table = 'empresa'


# class FormaPago(models.Model):
#     id_forma_pago = models.AutoField(primary_key=True)
#     nombre_forma = models.CharField(max_length=50)

#     class Meta:
#         db_table = 'forma_pago'


# class HistorialProductos(models.Model):
#     id_historial = models.AutoField(primary_key=True)
#     id_producto = models.IntegerField(blank=True, null=True)
#     accion = models.CharField(max_length=8)
#     fecha_modificacion = models.DateTimeField()
#     detalles_modificacion = models.TextField(blank=True, null=True)
#     id_usuario = models.IntegerField()
#     nombre_producto = models.CharField(max_length=255, blank=True, null=True)
#     descripcion = models.TextField(blank=True, null=True)
#     precio_compra = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
#     precio_neto = models.DecimalField(max_digits=10, decimal_places=2)
#     precio_venta = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
#     precio_venta_final = models.DecimalField(max_digits=10, decimal_places=2)
#     cantidad = models.IntegerField(blank=True, null=True)
#     id_empresa = models.IntegerField()
#     descuento = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
#     precio_descuento = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
#     porcentaje_ganancia = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

#     class Meta:
#         db_table = 'historial_productos'


# class Inventario(models.Model):
#     id_producto = models.AutoField(primary_key=True)
#     img = models.TextField(blank=True, null=True)
#     nombre_producto = models.CharField(max_length=100, blank=True, null=True)
#     descripcion = models.CharField(max_length=100)
#     precio_compra = models.DecimalField(max_digits=10, decimal_places=2)
#     porcentaje_de_ganancia = models.DecimalField(max_digits=5, decimal_places=2)
#     precio_neto = models.DecimalField(max_digits=10, decimal_places=2)
#     precio_venta = models.DecimalField(max_digits=10, decimal_places=2)
#     precio_venta_final = models.DecimalField(max_digits=10, decimal_places=2)
#     codigo = models.IntegerField()
#     id_categoria = models.IntegerField()
#     descuento = models.IntegerField()
#     precio_descuento = models.FloatField()
#     cantidad = models.IntegerField(blank=True, null=True)
#     id_empresa = models.IntegerField()

#     class Meta:
#         db_table = 'inventario'


# class RolUser(models.Model):
#     id_rol = models.AutoField(primary_key=True)
#     nombre_rol = models.CharField(max_length=50)

#     class Meta:
#         db_table = 'rol_user'


# class Usuario(models.Model):
#     codigo_vendedor = models.CharField(primary_key=True, max_length=255)
#     nombre_usuario = models.CharField(max_length=100)
#     nombre_empresa = models.CharField(max_length=100)
#     password = models.CharField(max_length=255)
#     email = models.CharField(unique=True, max_length=100)
#     id_rol = models.ForeignKey(RolUser, models.DO_NOTHING, db_column='id_rol')
#     id_admin = models.IntegerField(blank=True, null=True)

#     class Meta:
#         db_table = 'usuario'


# class Ventas(models.Model):
#     id_venta = models.AutoField(primary_key=True)
#     codigo_vendedor = models.CharField(unique=True, max_length=255, blank=True, null=True)
#     id_producto = models.IntegerField(blank=True, null=True)
#     fecha_venta = models.DateField(blank=True, null=True)
#     id_empresa = models.ForeignKey(Empresa, models.DO_NOTHING, db_column='id_empresa', blank=True, null=True)
#     total = models.IntegerField()

#     class Meta:
#         db_table = 'ventas'


###########################
from django.db import models


class Categoria(models.Model):
    id_categoria = models.IntegerField(db_column='Id_categoria', primary_key=True)  # Field name made lowercase.
    nombre_categoria = models.CharField(db_column='Nombre_categoria', max_length=500, blank=True, null=True)  # Field name made lowercase.
    id_empresa = models.IntegerField(db_column='Id_empresa', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'categoria'


class Empresa(models.Model):
    id_empresa = models.IntegerField(db_column='Id_empresa', primary_key=True)  # Field name made lowercase.
    nombre_empresa = models.CharField(db_column='Nombre_empresa', max_length=200, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'empresa'


class FormaPago(models.Model):
    id_forma_pago = models.IntegerField(db_column='Id_forma_pago', primary_key=True)  # Field name made lowercase.
    metodo = models.CharField(db_column='Metodo', max_length=200, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'forma_pago'


class HistorialProducto(models.Model):
    id_historial = models.IntegerField(db_column='Id_historial', primary_key=True)  # Field name made lowercase.
    id_producto = models.IntegerField(db_column='Id_producto', blank=True, null=True)  # Field name made lowercase.
    accion = models.CharField(db_column='Accion', max_length=200, blank=True, null=True)  # Field name made lowercase.
    fecha_modificacion = models.DateTimeField(db_column='Fecha_modificacion', blank=True, null=True)  # Field name made lowercase.
    detalle_de_modificacion = models.CharField(db_column='Detalle_de_modificacion', max_length=200, blank=True, null=True)  # Field name made lowercase.
    img = models.IntegerField(db_column='Img', blank=True, null=True)  # Field name made lowercase.
    nombre_producto = models.CharField(db_column='Nombre_producto', max_length=200, blank=True, null=True)  # Field name made lowercase.
    descripcion = models.CharField(db_column='Descripcion', max_length=500, blank=True, null=True)  # Field name made lowercase.
    cantidad = models.FloatField(db_column='Cantidad', blank=True, null=True)  # Field name made lowercase.
    precio_compra = models.FloatField(db_column='Precio_compra', blank=True, null=True)  # Field name made lowercase.
    porcentaje_de_ganancia = models.FloatField(db_column='Porcentaje_de_ganancia', blank=True, null=True)  # Field name made lowercase.
    precio_neto = models.FloatField(db_column='Precio_neto', blank=True, null=True)  # Field name made lowercase.
    precio_venta = models.FloatField(db_column='Precio_venta', blank=True, null=True)  # Field name made lowercase.
    precio_venta_final = models.CharField(db_column='Precio_venta_final', max_length=100, blank=True, null=True)  # Field name made lowercase.
    codigo = models.IntegerField(db_column='Codigo', blank=True, null=True)  # Field name made lowercase.
    id_categoria = models.FloatField(db_column='Id_categoria', blank=True, null=True)  # Field name made lowercase.
    descuento = models.FloatField(db_column='Descuento', blank=True, null=True)  # Field name made lowercase.
    precio_descuento = models.FloatField(db_column='Precio_descuento', blank=True, null=True)  # Field name made lowercase.
    id_empresa = models.IntegerField(db_column='Id_empresa', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'historial_producto'


class Inventario(models.Model):
    id_producto = models.IntegerField(db_column='Id_producto', blank=True, null=True)  # Field name made lowercase.
    img = models.IntegerField(db_column='Img', blank=True, null=True)  # Field name made lowercase.
    nombre_producto = models.CharField(db_column='Nombre_producto', max_length=200, blank=True, null=True)  # Field name made lowercase.
    descripcion = models.CharField(db_column='Descripcion', max_length=500, blank=True, null=True)  # Field name made lowercase.
    cantidad = models.FloatField(db_column='Cantidad', blank=True, null=True)  # Field name made lowercase.
    precio_compra = models.FloatField(db_column='Precio_compra', blank=True, null=True)  # Field name made lowercase.
    porcentaje_de_ganancia = models.FloatField(db_column='Porcentaje_de_ganancia', blank=True, null=True)  # Field name made lowercase.
    precio_neto = models.FloatField(db_column='Precio_neto', blank=True, null=True)  # Field name made lowercase.
    precio_venta = models.FloatField(db_column='Precio_venta', blank=True, null=True)  # Field name made lowercase.
    precio_venta_final = models.CharField(db_column='Precio_venta_final', max_length=100, blank=True, null=True)  # Field name made lowercase.
    codigo = models.IntegerField(db_column='Codigo', blank=True, null=True)  # Field name made lowercase.
    id_categoria = models.FloatField(db_column='Id_categoria', blank=True, null=True)  # Field name made lowercase.
    descuento = models.FloatField(db_column='Descuento', blank=True, null=True)  # Field name made lowercase.
    precio_descuento = models.FloatField(db_column='Precio_descuento', blank=True, null=True)  # Field name made lowercase.
    id_empresa = models.IntegerField(db_column='Id_empresa', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'inventario'


class RolUser(models.Model):
    id_rol = models.IntegerField(db_column='Id_rol', primary_key=True)  # Field name made lowercase.
    nombre_rol = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        db_table = 'rol_user'


class Usuario(models.Model):
    codigo_vendedor = models.IntegerField(db_column='Codigo_vendedor', primary_key=True)  # Field name made lowercase.
    id_empresa = models.CharField(db_column='Id_empresa', max_length=200, blank=True, null=True)  # Field name made lowercase.
    password = models.CharField(db_column='Password', max_length=200, blank=True, null=True)  # Field name made lowercase.
    email = models.CharField(db_column='Email', max_length=200, blank=True, null=True)  # Field name made lowercase.
    id_rol = models.IntegerField(db_column='Id_rol', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'usuario'


class VentaGeneral(models.Model):
    id_venta_total = models.IntegerField(db_column='Id_venta_total', primary_key=True)  # Field name made lowercase.
    codigo_vendedor = models.CharField(db_column='Codigo_vendedor', max_length=200, blank=True, null=True)  # Field name made lowercase.
    id_empresa = models.CharField(db_column='Id_Empresa', max_length=200, blank=True, null=True)  # Field name made lowercase.
    total = models.FloatField(db_column='Total', blank=True, null=True)  # Field name made lowercase.
    fecha_venta = models.DateTimeField(db_column='Fecha_venta', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'venta_general'


class VentaProducto(models.Model):
    id_venta_producto = models.IntegerField(db_column='Id_venta_producto', primary_key=True)  # Field name made lowercase.
    id_venta_general = models.IntegerField(db_column='Id_venta_general', blank=True, null=True)  # Field name made lowercase.
    id_empresa = models.IntegerField(db_column='Id_empresa', blank=True, null=True)  # Field name made lowercase.
    codigo_vendedor = models.IntegerField(db_column='Codigo_vendedor', blank=True, null=True)  # Field name made lowercase.
    field_id_producto = models.IntegerField(db_column='  id_producto', blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'.
    cantidad = models.IntegerField(db_column='Cantidad', blank=True, null=True)  # Field name made lowercase.
    nombre_producto = models.CharField(db_column='Nombre_producto', max_length=200, blank=True, null=True)  # Field name made lowercase.
    precio_unitario = models.FloatField(db_column='Precio_unitario', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'venta_producto'
