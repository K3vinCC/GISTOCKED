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


class Categoria(models.Model):
    id_categoria = models.AutoField(db_column='Id_categoria', primary_key=True)  # Field name made lowercase.
    nombre_categoria = models.CharField(db_column='Nombre_categoria', max_length=500, blank=True, null=True)  # Field name made lowercase.
    id_empresa = models.IntegerField(db_column='Id_empresa', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'categoria'

class Empresa(models.Model):
    id_empresa = models.AutoField(db_column='Id_empresa', primary_key=True)  # Field name made lowercase.
    nombre_empresa = models.CharField(db_column='Nombre_empresa', max_length=200, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'empresa'


class FormaPago(models.Model):
    id_forma_pago = models.AutoField(db_column='Id_forma_pago', primary_key=True)  # Field name made lowercase.
    metodo = models.CharField(db_column='Metodo', max_length=200, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'forma_pago'


class HistorialProducto(models.Model):
    id_historial = models.AutoField(db_column='Id_historial', primary_key=True)  # Field name made lowercase.
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
    id_producto = models.AutoField(primary_key=True)
    img = models.CharField(max_length=300, blank=True, null=True)
    nombre_producto = models.CharField(max_length=200, blank=True, null=True)
    descripcion = models.CharField(max_length=500, blank=True, null=True)
    cantidad = models.FloatField(blank=True, null=True)
    precio_compra = models.IntegerField(blank=True, null=True)
    porcentaje_de_ganancia = models.FloatField(blank=True, null=True)
    precio_neto = models.IntegerField(blank=True, null=True)
    precio_venta = models.IntegerField(blank=True, null=True)
    precio_venta_final = models.IntegerField(blank=True, null=True)
    codigo_barra = models.IntegerField(blank=True, null=True)
    id_categoria = models.IntegerField(blank=True, null=True)
    descuento = models.FloatField(blank=True, null=True)
    precio_descuento = models.IntegerField(blank=True, null=True)
    id_empresa = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'inventario'


class RolUser(models.Model):
    id_rol = models.AutoField(db_column='Id_rol', primary_key=True)  # Field name made lowercase.
    nombre_rol = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        db_table = 'rol_user'



class Usuario(models.Model):
    codigo_vendedor = models.AutoField(db_column='Codigo_vendedor', primary_key=True, unique=True)
    id_empresa = models.CharField(db_column='Id_empresa', max_length=200, blank=True, null=True)
    password = models.CharField(db_column='Password', max_length=200, blank=True, null=True)
    email = models.CharField(db_column='Email', max_length=200, blank=True, null=True,unique=True)
    id_rol = models.IntegerField(db_column='Id_rol', blank=True, null=True)
    codigo_de_confirmacion = models.CharField(unique=True, max_length=6)

    class Meta:
        db_table = 'usuario'


class VentaGeneral(models.Model):
    id_venta_total = models.AutoField(db_column='Id_venta_total', primary_key=True)  # Field name made lowercase.
    codigo_vendedor = models.IntegerField(db_column='Codigo_vendedor',blank=False, null=False)  # Field name made lowercase.
    id_empresa = models.CharField(db_column='Id_Empresa', max_length=200, blank=False, null=False)  # Field name made lowercase.
    total = models.FloatField(db_column='Total', blank=False, null=False)  # Field name made lowercase.
    fecha_venta = models.DateTimeField(db_column='Fecha_venta', blank=False, null=False)  # Field name made lowercase.

    class Meta:
        db_table = 'venta_general'


class VentaProducto(models.Model):
    id_venta_producto = models.AutoField(db_column='Id_venta_producto', primary_key=True)  # Field name made lowercase.
    id_venta_general = models.IntegerField(db_column='Id_venta_general', blank=False, null=False)  # Field name made lowercase.
    id_empresa = models.IntegerField(db_column='Id_empresa', blank=False, null=False)  # Field name made lowercase.
    codigo_vendedor = models.IntegerField(db_column='Codigo_vendedor', blank=False, null=False)  # Field name made lowercase.
    field_id_producto = models.IntegerField(db_column='  id_producto', blank=False, null=False)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'.
    cantidad = models.IntegerField(db_column='Cantidad', blank=False, null=False)  # Field name made lowercase.
    nombre_producto = models.CharField(db_column='Nombre_producto', max_length=200, blank=False, null=False)  # Field name made lowercase.
    precio_unitario = models.FloatField(db_column='Precio_unitario', blank=False, null=False)  # Field name made lowercase.

    class Meta:
        db_table = 'venta_producto'
