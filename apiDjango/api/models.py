from django.db import models

from django.contrib.auth.hashers import make_password, check_password

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    contraseña = models.CharField(max_length=255)  # Ensure this is large enough for hashed passwords
    rol = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = 'usuario'

    def save(self, *args, **kwargs):

        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre