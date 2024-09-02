from rest_framework import serializers
from .models import CategoriaRev

class CategoriaRevSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaRev
        fields = '__all__'  # Incluye todos los campos del modelo