from django.db import models

class CategoriaRev(models.Model):
    id = models.AutoField(primary_key=True)  # Asegúrate de usar 'id' como la clave primaria
    id_categoria = models.IntegerField()
    nombre_categoria = models.CharField(max_length=50)
    estado = models.CharField(max_length=50, blank=True, null=True)
    descripcion = models.TextField(null=True)  # Si es de tipo TEXT
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'categoria_rev'  # Especifica el nombre de la tabla en la BD

    def __str__(self):
        return self.nombre_categoria