import fitz
from pdf2image import convert_from_bytes
import pytesseract
import re

def extract_pdf_content(pdf_bytes):
    """Hybrid text extraction with OCR fallback"""
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    results = {"pages": []}
    
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text = page.get_text()
        
        # Check if text extraction is sufficient
        if len(text.strip()) > 50:  # If >50 characters, consider valid
            results["pages"].append({
                "page": page_num + 1,
                "content": text,
                "method": "direct"
            })
        else:
            # OCR fallback
            pix = page.get_pixmap()
            img = convert_from_bytes(pix.tobytes("ppm"))[0]
            ocr_text = pytesseract.image_to_string(img)
            results["pages"].append({
                "page": page_num + 1,
                "content": ocr_text,
                "method": "ocr"
            })
    
    return results

def structure_text_to_json(text_data):
    """Convert unstructured text to structured JSON"""
    structured_data = []
    
    for page in text_data["pages"]:
        # Extract common document fields (customize based on your needs)
        fields = {
            "page_number": page["page"],
            "header": extract_header(page["content"]),
            "body": extract_body(page["content"]),
            "footer": extract_footer(page["content"]),
            "paragraphs": extract_paragraphs(page["content"]),
            "tables": extract_tables(page["content"]),
        }
        structured_data.append(fields)
    
    return structured_data

# Helper extraction functions
def extract_header(text):
    return re.search(r'^(.{1,100}?)(?:\n|$)', text).group(1) if text else ""

def extract_body(text):
    return re.sub(r'(^\s*.*header.*$|^\s*.*footer.*$)', '', text, flags=re.IGNORECASE | re.MULTILINE)

def extract_footer(text):
    return re.findall(r'\n(.{1,100}?)$', text)[-1] if text else ""

def extract_paragraphs(text):
    return [p.strip() for p in re.split(r'\n{2,}', text) if p.strip()]

def extract_tables(text):
    # Simple table extraction - customize for complex tables
    tables = []
    for match in re.finditer(r'(\b.+\b(\s+\b.+\b)+)', text):
        rows = [row.split() for row in match.group(0).split('\n') if row.strip()]
        if len(rows) > 1 and all(len(row) == len(rows[0]) for row in rows):
            tables.append(rows)
    return tables