from django.db import models
from django.contrib.auth.models import AbstractBaseUser  # Importación para el modelo de usuario

# Define tus modelos aquí

class Categoria(models.Model):
    """
    Modelo que representa una categoría de producto.
    """
    nombre_categoria = models.CharField(max_length=50)  # Nombre de la categoría (máximo 50 caracteres)
    estado = models.BooleanField(default=True)  # Activo (True) o Inactivo (False)
    descripcion = models.TextField(null=True, blank=True)  # Descripción opcional

    def __str__(self):
        return self.nombre_categoria  # Representación en cadena para la categoría

class Producto(models.Model):
    """
    Modelo que representa un producto.
    """
    nombre_producto = models.CharField(max_length=100)  # Nombre del producto (máximo 100 caracteres)
    descripcion = models.TextField(null=True, blank=True)  # Descripción opcional
    precio_compra = models.IntegerField()  # Almacena centavos
    porcentaje_ganancia = models.IntegerField()  # Almacena porcentaje * 100
    precio_venta = models.IntegerField()  # Almacena centavos
    precio_final = models.IntegerField() 
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, null=True)  # Clave foránea a Categoría
    stock = models.PositiveIntegerField()  # Cantidad en stock (entero positivo)

    def __str__(self):
        return self.nombre_producto  # Representación en cadena para el producto

class Venta(models.Model):
    """
    Modelo que representa una venta.
    """
    fecha_venta = models.DateField()  # Fecha de la venta
    total_venta = models.DecimalField(max_digits=12, decimal_places=2)  # Monto total de la venta
    descuento = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # Descuento opcional
    usuario = models.ForeignKey('Usuario', on_delete=models.CASCADE, null=True)  # Clave foránea a Usuario
    forma_pago = models.ForeignKey('FormaPago', on_delete=models.CASCADE, null=True)  # Clave foránea a FormaPago

    def __str__(self):
        return f'Venta {self.id}'  # Representación en cadena para la venta (incluye ID)

class DetalleVenta(models.Model):
    """
    Modelo que representa un detalle de venta (artículos vendidos en una venta).
    """
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE, null=True)  # Clave foránea a Venta
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, null=True)  # Clave foránea a Producto
    cantidad_vendida = models.PositiveIntegerField()  # Cantidad vendida (entero positivo)
    total_detalle = models.DecimalField(max_digits=12, decimal_places=2)  # Total para este artículo en la venta

class MetodoPago(models.Model):
    """
    Modelo que representa un método de pago.
    """
    nombre_metodo = models.CharField(max_length=50)  # Nombre del método de pago (máximo 50 caracteres)
    descripcion_metodo = models.TextField(null=True, blank=True)  # Descripción opcional

    def __str__(self):
        return self.nombre_metodo  # Representación en cadena para el método de pago

class EstadoPago(models.Model):
    """
    Modelo que representa un estado de pago.
    """
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('completado', 'Completado'),
        ('rechazado', 'Rechazado'),
    ]
    nombre_estado = models.CharField(max_length=50, choices=ESTADO_CHOICES)  # Opción de estado de pago
    descripcion_estado = models.TextField(null=True, blank=True)  # Descripción opcional
    
class FormaPago(models.Model):
    """
    Modelo que representa una forma de pago.
    """
    metodo_pago = models.ForeignKey(MetodoPago, on_delete=models.CASCADE, null=True)  # Clave foránea al método de pago
    estado_pago = models.ForeignKey(EstadoPago, on_delete=models.CASCADE, null=True)  # Clave foránea al estado de pago

class RolUser(models.Model):
    """
    Modelo que representa un rol de usuario.
    """
    nombre_rol = models.CharField(max_length=50)  # Nombre del rol (máximo 50 caracteres)
    permisos = models.CharField(max_length=100)  # Permisos asociados al rol

class Usuario(AbstractBaseUser):
    """
    puede herar de modelo el usuario -> Usuario(models.Model)
    
    AbstractBaseUser -> Password(contraseña) y Last login(Ultimo inicio de sesión)

    Modelo personalizado para representar un usuario.
    """
    nombre = models.CharField(max_length=100)  # Nombre del usuario
    contraseña = models.CharField(max_length=255)  # Contraseña encriptada (usar set_password())
    rol = models.ForeignKey(RolUser, on_delete=models.SET_NULL, null=True)  # Clave foránea al rol del usuario

    USERNAME_FIELD = 'nombre'  # Campo utilizado para iniciar sesión

    def __str__(self):
        return self.nombre