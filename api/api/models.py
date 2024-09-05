from django.db import models

# Create your models here.
class Categoria(models.Model):
    
    id_categoria = models.IntegerField()
    nombre_categoria = models.CharField(max_length=100)
    estado = models.CharField(max_length=50)
    descripcion = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
