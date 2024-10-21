from reportlab.lib.pagesizes import mm
from reportlab.pdfgen import canvas
import textwrap
import os

def generar_boleta_pdf():
    # Tamaño del PDF en mm, ancho fijo y altura ajustable
    ancho_boleta = 82 * mm
    alto_boleta_inicial = 200 * mm  # Valor inicial arbitrario para comenzar
    
    archivo_pdf = "boleta_electronica_simulada.pdf"
    c = canvas.Canvas(archivo_pdf, pagesize=(ancho_boleta, alto_boleta_inicial))

    # Datos de la boleta
    nombre_emisor = "MICHAEL ESTEBAN CORTES CARRASCO"
    rut_emisor = "19.541.951-5"
    giro = "TALLER AUTOMOTRIZ VENTA REPUESTOS Y ACCESORIOS ARTICULOS FERRETERIA"
    direccion = "CALLE PEDRO MONTT 61, Vilcun, Vilcun"
    num_boleta = "935"
    fecha_emision = "2023-02-23 16:22:55"
    monto_total = "$ 54.000"
    iva = "$8.622"

    # Función para ajustar texto al ancho del PDF
    def draw_wrapped_text(c, text, y, width, font_size, line_spacing=3):
        char_width = c.stringWidth('W', "Courier", font_size)
        max_chars = int(width / char_width)
        lines = textwrap.wrap(text, width=max_chars)
        c.setFont("Courier", font_size)
        for line in lines:
            c.drawString(2 * mm, y, line)  # Usamos un margen izquierdo de 2 mm
            y -= (font_size + line_spacing)  # Espacio entre líneas
        return y, len(lines) * (font_size + line_spacing)

    # Ajuste del texto para no salirse del margen
    ancho_texto = (ancho_boleta - 9 * mm)  # Ajustar el ancho para usar casi todo el espacio
    font_size = 8.6

    # Empezar a calcular la altura total requerida
    y = alto_boleta_inicial - 30
    total_height = 0
    
    # Título y Encabezado
    y, height = draw_wrapped_text(c, nombre_emisor, y, ancho_texto, font_size, line_spacing=6)
    total_height += height
    y, height = draw_wrapped_text(c, rut_emisor, y, ancho_texto, font_size, line_spacing=6)
    total_height += height
    y, height = draw_wrapped_text(c, f"Giro: {giro}", y, ancho_texto, font_size, line_spacing=6)
    total_height += height
    y, height = draw_wrapped_text(c, direccion, y, ancho_texto, font_size, line_spacing=6)
    total_height += height

    # Boleta Electrónica y Número
    y -= 10  # Espacio adicional
    total_height += 10
    y, height = draw_wrapped_text(c, f"BOLETA ELECTRÓNICA NÚMERO: {num_boleta}", y, ancho_texto, font_size, line_spacing=6)
    total_height += height

    # Referencia Vendedor y Fecha
    y -= 10  # Espacio adicional
    total_height += 10
    y, height = draw_wrapped_text(c, f"REF. VENDEDOR: {rut_emisor}", y, ancho_texto, font_size, line_spacing=6)
    total_height += height
    y, height = draw_wrapped_text(c, f"Fecha: {fecha_emision}", y, ancho_texto, font_size, line_spacing=6)
    total_height += height

    # Monto Total e IVA
    c.setFont("Courier", font_size)
    y -= 15  # Espacio antes de mostrar Monto Total
    total_height += 15

    if y > 20:
        c.drawRightString(ancho_boleta - 3 * mm, y, f"Monto Total:                       {monto_total}")
        y -= 15  # Espacio aumentado entre Monto Total y IVA
        total_height += 15
        c.drawRightString(ancho_boleta - 3 * mm, y, f"El IVA incluido en esta boleta es de {iva}")
        y -= 10  # Espacio para el siguiente texto
        total_height += 10

    # Asegúrate de dejar espacio suficiente para la imagen
    y -= 20  # Espacio extra antes de la imagen
    total_height += 20

    # Cargar la imagen del timbre
    imagen_ruta = "timbre.png"
    if os.path.exists(imagen_ruta):
        c.drawImage(imagen_ruta, 2 * mm, y - 85, width=78 * mm, height=30 * mm)
        y -= 95  # Ajusta la posición de y después de agregar la imagen
        total_height += 95
    else:
        print(f"Advertencia: No se encontró la imagen en {imagen_ruta}")

    # Timbre y Verificación SII
    c.setFont("Courier", font_size)
    y -= 20  # Espacio antes del timbre
    total_height += 20
    y, height = draw_wrapped_text(c, "Timbre Electrónico SII", y, ancho_texto, font_size, line_spacing=6)
    total_height += height
    y, height = draw_wrapped_text(c, "Res. 99 de 2014", y, ancho_texto, font_size, line_spacing=6)
    total_height += height
    y, height = draw_wrapped_text(c, "Verifique documento en sii.cl", y, ancho_texto, font_size, line_spacing=6)
    total_height += height

    # Ajustar la altura total del PDF en función del contenido calculado
    altura_ajustada = total_height + 40 * mm  # Agrega un margen adicional
    c.setPageSize((ancho_boleta, altura_ajustada))

    # Guardar el archivo PDF
    c.save()
    print(f"Boleta electrónica generada: {archivo_pdf}")

# Llamada a la función para generar el PDF
generar_boleta_pdf()
