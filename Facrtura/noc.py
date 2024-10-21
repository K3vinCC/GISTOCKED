from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet

def crear_factura(nombre_archivo, empresa, cliente, items, neto, iva, total):
    # Crear el documento PDF
    doc = SimpleDocTemplate(nombre_archivo, pagesize=letter)
    elementos = []
    
    # Estilos para el texto
    estilos = getSampleStyleSheet()
    estilo_normal = estilos["Normal"]
    estilo_titulo = estilos["Heading1"]
    
    # Agregar el logotipo (debes tener una imagen "logo.png" en el mismo directorio)
    try:
        logo = Image("descarga.jpg", width=100, height=50)
        elementos.append(logo)
    except:
        elementos.append(Paragraph("LOGO EMPRESA", estilo_titulo))
    
    # Información de la empresa
    elementos.append(Paragraph(f"<b>{empresa['nombre']}</b>", estilo_titulo))
    elementos.append(Paragraph(f"Giro: {empresa['giro']}", estilo_normal))
    elementos.append(Paragraph(f"Dirección: {empresa['direccion']}", estilo_normal))
    elementos.append(Paragraph(f"Comuna - Ciudad", estilo_normal))
    
    # Información del cliente
    elementos.append(Spacer(1, 12))
    elementos.append(Paragraph(f"Señores: {cliente['nombre']}", estilo_normal))
    elementos.append(Paragraph(f"RUT: {cliente['rut']}", estilo_normal))
    elementos.append(Paragraph(f"Giro: {cliente['giro']}", estilo_normal))
    elementos.append(Paragraph(f"Dirección: {cliente['direccion']}", estilo_normal))
    elementos.append(Paragraph(f"Comuna: {cliente['comuna']}", estilo_normal))
    elementos.append(Paragraph(f"Contacto: {cliente['contacto']}", estilo_normal))
    
    # Espacio antes de la tabla de productos
    elementos.append(Spacer(1, 24))
    
    # Crear la tabla de productos
    data = [["Código", "Descripción", "Cantidad", "Precio", "Descuento", "Valor"]]
    for item in items:
        data.append([item["codigo"], item["descripcion"], item["cantidad"], f"${item['precio']:.2f}", f"${item['descuento']:.2f}", f"${item['valor']:.2f}"])
    
    # Estilo para la tabla
    tabla = Table(data, colWidths=[60, 200, 60, 60, 60, 60])
    tabla.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ]))
    
    elementos.append(tabla)
    
    # Espacio antes del total
    elementos.append(Spacer(1, 24))
    
    # Montos Totales
    elementos.append(Paragraph(f"Monto Neto: ${neto:.2f}", estilo_normal))
    elementos.append(Paragraph(f"IVA 19%: ${iva:.2f}", estilo_normal))
    elementos.append(Paragraph(f"<b>Total: ${total:.2f}</b>", estilo_titulo))
    
    # Generar el PDF
    doc.build(elementos)

# Ejemplo de datos
empresa = {
    "nombre": "Razón Social Empresa",
    "giro": "Giro de la Empresa",
    "direccion": "Dirección de la Empresa",
}

cliente = {
    "nombre": "Razón Social Receptor",
    "rut": "88.888.888-8",
    "giro": "Giro del Cliente",
    "direccion": "Dirección del Cliente",
    "comuna": "Comuna Cliente",
    "contacto": "Atención Sr. Cliente",
}

items = [
    {"codigo": "001", "descripcion": "Producto 1", "cantidad": 2, "precio": 5000, "descuento": 0, "valor": 10000},
    {"codigo": "002", "descripcion": "Producto 2", "cantidad": 1, "precio": 20000, "descuento": 0, "valor": 20000},
    {"codigo": "003", "descripcion": "Producto 3", "cantidad": 7, "precio": 10000, "descuento": 0, "valor": 70000},
]

neto = 100000
iva = 19000
total = 119000

crear_factura("factura_ejemplo.pdf", empresa, cliente, items, neto, iva, total)
