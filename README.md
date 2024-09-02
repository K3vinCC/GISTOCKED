# GestionInventario

## DJANGO
- Primero se configura la base de datos en un proyecto de Django
- Luego se crea la aplicación para manejar la API con python manage.py startapp api
- Se define el modelo (api/models.py) y la vista (api/views.py) para la tabla o tablas que se quieran obtener para enviar a react
- Se definen las rutas tanto en api/urls.py como en miproyecto/urls.py
- De instala el middleware de CORS para entrelazar la api, la base de datos y react con seguridad, añadiendo las URLs necesarias para que pasen con seguridad
- Se inicia el proyecto con python manage.py runserver   


## REACT
- Se creó una simple vista para ver datos ya creados en REACT
- Se inicia React con npm start

