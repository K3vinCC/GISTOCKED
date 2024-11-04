# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre_categoria = models.CharField(max_length=50)
    id_empresa = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'categoria'


class DetalleVenta(models.Model):
    id_detalle_venta = models.AutoField(primary_key=True)
    id_venta = models.ForeignKey('Ventas', models.DO_NOTHING, db_column='id_venta')
    id_producto = models.ForeignKey('Inventario', models.DO_NOTHING, db_column='id_producto')
    cantidad = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    precio_total = models.DecimalField(max_digits=10, decimal_places=2)
    id_empresa = models.IntegerField()
    nombre_producto = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'detalle_venta'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class FormaPago(models.Model):
    id_forma_pago = models.AutoField(primary_key=True)
    nombre_forma = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'forma_pago'


class HistorialProductos(models.Model):
    id_historial = models.AutoField(primary_key=True)
    id_producto = models.ForeignKey('Inventario', models.DO_NOTHING, db_column='id_producto', blank=True, null=True)
    accion = models.CharField(max_length=8)
    fecha_modificacion = models.DateTimeField()
    detalles_modificacion = models.TextField(blank=True, null=True)
    id_usuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='id_usuario')
    nombre_producto = models.CharField(max_length=255, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    precio_compra = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    precio_neto = models.FloatField()
    precio_venta = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    precio_venta_final = models.FloatField()
    cantidad = models.IntegerField(blank=True, null=True)
    id_empresa = models.IntegerField()
    descuento = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    precio_descuento = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    porcentaje_ganancia = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'historial_productos'


class Inventario(models.Model):
    id_producto = models.AutoField(primary_key=True)
    img = models.TextField(blank=True, null=True)
    nombre_producto = models.CharField(max_length=100, blank=True, null=True)
    descripcion = models.CharField(max_length=100)
    precio_compra = models.IntegerField()
    porcentaje_de_ganancia = models.DecimalField(max_digits=5, decimal_places=2) 
    precio_neto = models.IntegerField()
    precio_venta = models.IntegerField()
    precio_venta_final = models.IntegerField()
    codigo = models.IntegerField(unique=True)
    id_categoria = models.ForeignKey(Categoria, models.DO_NOTHING, db_column='id_categoria')
    descuento = models.IntegerField()
    precio_descuento = models.FloatField()
    cantidad = models.IntegerField(blank=True, null=True)
    id_empresa = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'inventario'


class RolUser(models.Model):
    id_rol = models.AutoField(primary_key=True)
    nombre_rol = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'rol_user'


class Usuario(models.Model):
    codigo_vendedor = models.AutoField(primary_key=True)
    nombre_usuario = models.CharField(max_length=50)
    nombre_empresa = models.CharField(max_length=100)
    password = models.CharField(max_length=255)
    email = models.CharField(max_length=100)
    id_rol = models.ForeignKey(RolUser, models.DO_NOTHING, db_column='id_rol')
    id_admin = models.ForeignKey('self', models.DO_NOTHING, db_column='id_admin', blank=True, null=True)
    pin = models.CharField(max_length=10)

    class Meta:
        managed = False
        db_table = 'usuario'


class Vendedores(models.Model):
    id_vendedores = models.AutoField(primary_key=True)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    rut = models.CharField(unique=True, max_length=12)
    contraseña = models.CharField(max_length=255)
    id_admin = models.IntegerField()
    nombre_empresa = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'vendedores'


class Ventas(models.Model):
    id_venta = models.AutoField(primary_key=True)
    codigo_vendedor = models.ForeignKey(Usuario, models.DO_NOTHING, db_column='codigo_vendedor')
    fecha_venta = models.DateTimeField()
    id_empresa = models.IntegerField()
    venta_total = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'ventas'
