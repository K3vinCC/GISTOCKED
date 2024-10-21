from PIL import Image, ImageDraw, ImageFont

# Load the uploaded image (barcode)
barcode_path = "C:/Users/corte/Desktop/Python/image.png"
barcode = Image.open(barcode_path)

# Create a new blank image (a white background) for the electronic stamp
stamp_width = 500
stamp_height = 300
stamp_image = Image.new("RGB", (stamp_width, stamp_height), "white")

# Draw elements of the stamp
draw = ImageDraw.Draw(stamp_image)

# Load the font, set size (using a basic font since custom fonts might not be available)
try:
    font = ImageFont.truetype("arial.ttf", 40)  # Default font with size 40
except IOError:
    font = ImageFont.load_default()

# Add text to simulate some basic features of a stamp
draw.text((50, 20), "Timbre Electrónico", fill="black", font=font)
draw.text((50, 70), "Boleta No: 123456789", fill="black", font=font)
draw.text((50, 120), "Fecha: 15/10/2024", fill="black", font=font)

# Resize the barcode image to fit the stamp design and paste it
barcode_resized = barcode.resize((400, 100))
stamp_image.paste(barcode_resized, (50, 180))

# Save the resulting image
output_path = "/mnt/data/electronic_stamp.png"
stamp_image.save(output_path)
