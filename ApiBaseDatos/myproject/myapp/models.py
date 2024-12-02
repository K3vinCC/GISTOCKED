from django.db import models


class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre_categoria = models.CharField(max_length=200)
    id_empresa = models.ForeignKey('Empresa', models.DO_NOTHING, db_column='id_empresa')

    class Meta:
        db_table = 'categoria'


class Empresa(models.Model):
    id_empresa = models.AutoField(primary_key=True)
    nombre_empresa = models.CharField(max_length=100)
    rut_empresa = models.BigIntegerField(unique=True)

    class Meta:
        db_table = 'empresa'


class FormaPago(models.Model):
    id_forma_pago = models.AutoField(primary_key=True)
    metodo = models.CharField(max_length=100)

    class Meta:
        db_table = 'forma_pago'


class HistorialProducto(models.Model):
    id_historial = models.AutoField(primary_key=True)
    id_producto = models.ForeignKey('Inventario', models.DO_NOTHING, db_column='id_producto')
    accion = models.CharField(max_length=200)
    fecha_modificacion = models.DateTimeField()
    detalle_de_modificacion = models.CharField(max_length=200, blank=True, null=True)
    img = models.CharField(max_length=300, blank=True, null=True)
    nombre_producto = models.CharField(max_length=200)
    descripcion = models.CharField(max_length=500, blank=True, null=True)
    cantidad = models.JSONField()
    precio_compra = models.JSONField()
    porcentaje_de_ganancia = models.JSONField()
    precio_neto = models.JSONField()
    precio_venta = models.JSONField()
    precio_venta_final = models.JSONField()
    codigo_barra = models.BigIntegerField(unique=True)
    id_categoria = models.ForeignKey(Categoria, models.DO_NOTHING, db_column='id_categoria')
    descuento = models.JSONField(blank=True, null=True)
    precio_descuento = models.IntegerField(blank=True, null=True)
    id_empresa = models.ForeignKey(Empresa, models.DO_NOTHING, db_column='id_empresa')
    id_usuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='id_usuario')

    class Meta:
        db_table = 'historial_producto'


class Inventario(models.Model):
    id_producto = models.AutoField(primary_key=True)
    img = models.CharField(max_length=300, blank=True, null=True)
    nombre_producto = models.CharField(max_length=200)
    descripcion = models.CharField(max_length=500, blank=True, null=True)
    cantidad = models.JSONField()
    precio_compra = models.JSONField()
    porcentaje_de_ganancia = models.JSONField()
    precio_neto = models.JSONField()
    precio_venta = models.JSONField()
    precio_venta_final = models.JSONField()
    codigo_barra = models.BigIntegerField(unique=True)
    id_categoria = models.ForeignKey(Categoria, models.DO_NOTHING, db_column='id_categoria')
    descuento = models.JSONField(blank=True, null=True)
    precio_descuento = models.IntegerField(blank=True, null=True)
    id_empresa = models.ForeignKey(Empresa, models.DO_NOTHING, db_column='id_empresa')

    class Meta:
        db_table = 'inventario'


class Rol(models.Model):
    id_rol = models.AutoField(primary_key=True)
    nombre_rol = models.CharField(max_length=100)

    class Meta:
        db_table = 'rol'


class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    codigo_confirmacion = models.CharField(max_length=100, blank=True, null=True)
    id_empresa = models.ForeignKey(Empresa, models.DO_NOTHING, db_column='id_empresa')
    nombre_usuario = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    email = models.CharField(unique=True, max_length=200)
    id_rol = models.IntegerField()

    class Meta:
        db_table = 'usuario'


class VentaGeneral(models.Model):
    id_venta_general = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuario, models.DO_NOTHING, db_column='id_usuario')
    id_empresa = models.ForeignKey(Empresa, models.DO_NOTHING, db_column='id_empresa')
    id_forma_pago = models.ForeignKey(FormaPago, models.DO_NOTHING, db_column='id_forma_pago')
    rut_comprador = models.CharField(max_length=12, blank=True, null=True)
    total = models.JSONField()
    fecha_venta = models.DateTimeField()

    class Meta:
        db_table = 'venta_general'


class VentaProducto(models.Model):
    id_venta_producto = models.AutoField(primary_key=True)
    id_venta_general = models.ForeignKey(VentaGeneral, models.DO_NOTHING, db_column='id_venta_general')
    id_empresa = models.ForeignKey(Empresa, models.DO_NOTHING, db_column='id_empresa')
    id_usuario = models.ForeignKey(Usuario, models.DO_NOTHING, db_column='id_usuario')
    id_producto = models.ForeignKey(Inventario, models.DO_NOTHING, db_column='id_producto')
    cantidad = models.JSONField()
    nombre_producto = models.CharField(max_length=200)
    precio_unitario = models.JSONField()

    class Meta:
        db_table = 'venta_producto'
