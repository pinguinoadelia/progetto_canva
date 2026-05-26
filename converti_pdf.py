import fitz
from pathlib import Path

# Cartella dove si trovano i PDF originali
# Cambiala con il percorso reale della cartella esterna dove hai i PDF
PDF_FOLDER = Path("/Users/michelino/Desktop/sito mati")

# Cartella del sito dove hai creato le cartelle immagini
IMG_FOLDER = Path("assets/img")

ZOOM = 2

progetti = {
    "Calendario bassotti.pdf": "calendario-bassotti",
    "Presentazione Cantina Antinori.pdf": "cantina-antinori",
    "Cura Begonia.pdf": "cura-begonia",
    "Cura Caladium.pdf": "cura-caladium",
    "Cura Monstera.pdf": "cura-monstera",
    "Cura Tradescantia.pdf": "cura-tradescantia",
    "Presentazione progetto data diriven.pdf": "data-driven",
    "DFM presentazione.pdf": "dfm",
    "diagramma FTA.pdf": "diagramma-fta",
    "Presentazione GlobalPharma.pdf": "globalpharma",
    "Menarini presentazione.pdf": "menarini",
    "Presentazione Smart-pack.pdf": "smart-pack",
    "Presentazione moda.pdf": "moda",
    "Vacanze in barca presentazione.pdf": "vacanze-in-barca",
    "diagramma FTA.pdf": "diagramma-FTA",
    "Presentazione cantina.pdf": "Cantina",
}

for pdf_name, folder_name in progetti.items():
    pdf_path = PDF_FOLDER / pdf_name
    output_folder = IMG_FOLDER / folder_name

    if not pdf_path.exists():
        print(f"PDF non trovato: {pdf_path}")
        continue

    output_folder.mkdir(parents=True, exist_ok=True)

    print(f"Converto {pdf_name}...")

    doc = fitz.open(pdf_path)

    for i, page in enumerate(doc):
        pix = page.get_pixmap(
            matrix=fitz.Matrix(ZOOM, ZOOM),
            alpha=False
        )

        output_path = output_folder / f"slide_{i+1:03}.jpg"
        pix.save(output_path)

    doc.close()

    print(f"Salvate {i+1} immagini in {output_folder}")

print("Conversione completata.")