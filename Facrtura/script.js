// URL del archivo XML
const url = 'ruta/al/archivo.xml';

// Crear un nuevo objeto XMLHttpRequest
let xhttp = new XMLHttpRequest();

// Configurar la solicitud HTTP GET para el archivo XML
xhttp.open('GET', url, true);

// Definir el tipo de respuesta esperada como XML
xhttp.responseType = 'document';

// Función que se ejecuta cuando la solicitud se completa
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // Acceder al documento XML obtenido
        let xmlDoc = this.responseXML;

        // Obtener datos de la factura
        let empresa = xmlDoc.querySelector('factura > empresa');
        let receptor = xmlDoc.querySelector('factura > receptor');
        let totales = xmlDoc.querySelector('factura > totales');

        // Extraer los valores
        let razonSocialEmpresa = empresa.querySelector('razonSocial').textContent;
        let rutEmpresa = empresa.querySelector('rut').textContent;
        let giroEmpresa = empresa.querySelector('giro').textContent;
        let direccionEmpresa = empresa.querySelector('direccion').textContent;
        let comunaCiudadEmpresa = empresa.querySelector('comunaCiudad').textContent;

        let razonSocialReceptor = receptor.querySelector('razonSocial').textContent;
        let rutReceptor = receptor.querySelector('rut').textContent;
        let giroReceptor = receptor.querySelector('giro').textContent;
        let direccionReceptor = receptor.querySelector('direccion').textContent;
        let comunaReceptor = receptor.querySelector('comuna').textContent;
        let contactoReceptor = receptor.querySelector('contacto').textContent;

        let neto = totales.querySelector('neto').textContent;
        let iva = totales.querySelector('iva').textContent;
        let total = totales.querySelector('total').textContent;

        // Mostrar los datos en la consola (puedes hacer otras operaciones aquí)
        console.log('Datos de la empresa:');
        console.log('Razón Social:', razonSocialEmpresa);
        console.log('RUT:', rutEmpresa);
        console.log('Giro:', giroEmpresa);
        console.log('Dirección:', direccionEmpresa);
        console.log('Comuna - Ciudad:', comunaCiudadEmpresa);

        console.log('Datos del receptor:');
        console.log('Razón Social:', razonSocialReceptor);
        console.log('RUT:', rutReceptor);
        console.log('Giro:', giroReceptor);
        console.log('Dirección:', direccionReceptor);
        console.log('Comuna:', comunaReceptor);
        console.log('Contacto:', contactoReceptor);

        console.log('Totales:');
        console.log('Neto:', neto);
        console.log('IVA:', iva);
        console.log('Total:', total);
    }
    else {
        console.error('Error al cargar el XML:', this.status, this.statusText);
    };
};

// Enviar la solicitud
xhttp.send();
