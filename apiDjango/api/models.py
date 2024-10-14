from django.db import models

from django.contrib.auth.hashers import make_password, check_password

# Tabla Categoria
class Categoria(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre

# Tabla DetalleVenta
class DetalleVenta(models.Model):
    venta = models.ForeignKey('Venta', on_delete=models.CASCADE)
    producto = models.ForeignKey('Inventario', on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'{self.producto} - {self.cantidad}'

# Tabla FormaPago
class FormaPago(models.Model):
    metodo = models.CharField(max_length=255)

    def __str__(self):
        return self.metodo

# Tabla HistorialProductos
class HistorialProductos(models.Model):
    producto = models.ForeignKey('Inventario', on_delete=models.CASCADE)
    cambio_stock = models.IntegerField()
    fecha_cambio = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.producto} - {self.cambio_stock}'

# Tabla Inventario
class Inventario(models.Model):
    id_producto = models.CharField(max_length=100)
    nombre_producto = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255)
    precio_venta_final = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad = models.IntegerField()
    img = models.CharField(max_length=255)
    def __str__(self):
        return self.nombre_producto
    class Meta:
        db_table = 'inventario'
        managed = False
# Tabla RolUser
class RolUser(models.Model):
    rol = models.CharField(max_length=255)

    def __str__(self):
        return self.rol

# Tabla Usuario
class Usuario(models.Model):
    codigo_vendedor = models.IntegerField(primary_key=True)
    nombre_usuario = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    class Meta:
        db_table = 'usuario'
        managed = False
    def __str__(self):
        return f'{self.nombre_usuario}'

# Tabla Vendedores
class Vendedor(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    codigo_vendedor = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f'{self.usuario} - {self.codigo_vendedor}'

# Tabla Ventas
class Venta(models.Model):
    vendedor = models.ForeignKey(Vendedor, on_delete=models.CASCADE)
    forma_pago = models.ForeignKey(FormaPago, on_delete=models.SET_NULL, null=True)
    fecha_venta = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'Venta {self.id} - {self.total}'