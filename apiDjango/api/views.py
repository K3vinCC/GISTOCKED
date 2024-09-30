import json
from rest_framework import viewsets
from .models import Usuario
from .serializers import UsuarioSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.hashers import check_password, make_password

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        nombre = data.get('nombre')
        contraseña = data.get('contraseña')

        try:
            user = Usuario.objects.get(nombre=nombre)
            if contraseña == user.contraseña:  # Sin hashear
                return JsonResponse({'message': 'Login successful', 'role': user.rol}, status=200)
            else:
                return JsonResponse({'error': 'Invalid password'}, status=401)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

@csrf_exempt
def add_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        nombre = data.get('nombre')
        contraseña = data.get('contraseña')
        rol = data.get('rol')

        try:
            hashed_password = make_password(contraseña)  # Hash the password
            new_user = Usuario.objects.create(nombre=nombre, contraseña=hashed_password, rol=rol)
            return JsonResponse({'message': 'User created successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)