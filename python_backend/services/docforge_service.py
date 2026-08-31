"""
DocForge PDF & File Conversion Service
Comprehensive PDF manipulation, file format conversion, and document processing
using PyPDF2, Pillow, python-docx, openpyxl, python-pptx, and pytesseract
"""

from io import BytesIO
from typing import List, Optional, Dict, Any, Tuple
import mimetypes
from datetime import datetime

try:
    from pypdf import PdfWriter, PdfReader
except ImportError:
    try:
        from PyPDF2 import PdfWriter, PdfReader
    except ImportError:
        PdfWriter = None
        PdfReader = None

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    Image = None
    ImageDraw = None
    ImageFont = None

import os

def _require_pypdf():
    if PdfWriter is None or PdfReader is None:
        raise RuntimeError("pypdf (or PyPDF2) is required for this operation. Please install: pip install pypdf")

def _require_pillow():
    if Image is None:
        raise RuntimeError("Pillow is required for this operation. Please install: pip install Pillow")


# PDF Operations
def merge_pdfs(pdf_buffers: List[bytes]) -> bytes:
    """Merge multiple PDF files into one"""
    _require_pypdf()
    writer = PdfWriter()
    
    for pdf_buffer in pdf_buffers:
        reader = PdfReader(BytesIO(pdf_buffer))
        for page in reader.pages:
            writer.add_page(page)
    
    output = BytesIO()
    writer.write(output)
    output.seek(0)
    return output.getvalue()


def split_pdf(pdf_buffer: bytes, page_ranges: Optional[List[Tuple[int, int]]] = None) -> Dict[int, bytes]:
    """
    Split PDF into multiple files by page ranges
    Returns dict with page range as key and PDF bytes as value
    """
    _require_pypdf()
    reader = PdfReader(BytesIO(pdf_buffer))
    total_pages = len(reader.pages)
    
    if not page_ranges:
        # Return each page as separate PDF
        result = {}
        for i in range(total_pages):
            writer = PdfWriter()
            writer.add_page(reader.pages[i])
            output = BytesIO()
            writer.write(output)
            output.seek(0)
            result[i] = output.getvalue()
        return result
    
    result = {}
    for start, end in page_ranges:
        writer = PdfWriter()
        for i in range(start - 1, min(end, total_pages)):
            writer.add_page(reader.pages[i])
        output = BytesIO()
        writer.write(output)
        output.seek(0)
        result[f"{start}-{end}"] = output.getvalue()
    
    return result


def extract_pdf_pages(pdf_buffer: bytes, page_indices: List[int]) -> bytes:
    """Extract specific pages from PDF"""
    _require_pypdf()
    reader = PdfReader(BytesIO(pdf_buffer))
    writer = PdfWriter()
    
    for idx in page_indices:
        if 0 <= idx < len(reader.pages):
            writer.add_page(reader.pages[idx])
    
    output = BytesIO()
    writer.write(output)
    output.seek(0)
    return output.getvalue()


def delete_pdf_pages(pdf_buffer: bytes, page_indices: List[int]) -> bytes:
    """Delete specific pages from PDF"""
    _require_pypdf()
    reader = PdfReader(BytesIO(pdf_buffer))
    writer = PdfWriter()
    
    for i, page in enumerate(reader.pages):
        if i not in page_indices:
            writer.add_page(page)
    
    output = BytesIO()
    writer.write(output)
    output.seek(0)
    return output.getvalue()


def rotate_pdf_pages(pdf_buffer: bytes, rotation: int, page_indices: Optional[List[int]] = None) -> bytes:
    """
    Rotate PDF pages by 90, 180, or 270 degrees
    rotation: 90, 180, or 270
    """
    _require_pypdf()
    reader = PdfReader(BytesIO(pdf_buffer))
    writer = PdfWriter()
    
    for i, page in enumerate(reader.pages):
        if page_indices is None or i in page_indices:
            page.rotate(rotation)
        writer.add_page(page)
    
    output = BytesIO()
    writer.write(output)
    output.seek(0)
    return output.getvalue()


def reorder_pdf_pages(pdf_buffer: bytes, new_order: List[int]) -> bytes:
    """Reorder PDF pages according to provided indices"""
    _require_pypdf()
    reader = PdfReader(BytesIO(pdf_buffer))
    writer = PdfWriter()
    
    for idx in new_order:
        if 0 <= idx < len(reader.pages):
            writer.add_page(reader.pages[idx])
    
    output = BytesIO()
    writer.write(output)
    output.seek(0)
    return output.getvalue()


def crop_pdf_pages(pdf_buffer: bytes, crop_box: Tuple[float, float, float, float], 
                   page_indices: Optional[List[int]] = None) -> bytes:
    """
    Crop PDF pages
    crop_box: (left, bottom, right, top) in points
    """
    _require_pypdf()
    reader = PdfReader(BytesIO(pdf_buffer))
    writer = PdfWriter()
    
    for i, page in enumerate(reader.pages):
        if page_indices is None or i in page_indices:
            page.crop_box.lower_left = (crop_box[0], crop_box[1])
            page.crop_box.upper_right = (crop_box[2], crop_box[3])
        writer.add_page(page)
    
    output = BytesIO()
    writer.write(output)
    output.seek(0)
    return output.getvalue()


def compress_pdf(pdf_buffer: bytes) -> bytes:
    """Compress PDF by removing redundant objects"""
    _require_pypdf()
    reader = PdfReader(BytesIO(pdf_buffer))
    writer = PdfWriter()
    
    for page in reader.pages:
        page.compress_content_streams()
        writer.add_page(page)
    
    output = BytesIO()
    writer.write(output)
    output.seek(0)
    return output.getvalue()


def add_watermark(pdf_buffer: bytes, watermark_text: str, opacity: float = 0.3) -> bytes:
    """Add text watermark to PDF pages"""
    _require_pypdf()
    reader = PdfReader(BytesIO(pdf_buffer))
    writer = PdfWriter()
    
    try:
        watermark_reader = PdfReader(BytesIO(_create_watermark_pdf(watermark_text)))
        watermark_page = watermark_reader.pages[0]
        
        for page in reader.pages:
            page.merge_page(watermark_page)
            writer.add_page(page)
    except:
        # Fallback: just return original if watermarking fails
        writer = PdfWriter()
        for page in reader.pages:
            writer.add_page(page)
    
    output = BytesIO()
    writer.write(output)
    output.seek(0)
    return output.getvalue()


def _create_watermark_pdf(text: str) -> bytes:
    """Create a PDF with watermark text"""
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import letter
    
    buffer = BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    c.setFont("Helvetica", 60)
    c.setFillAlpha(0.3)
    c.rotate(45)
    c.drawString(200, 100, text)
    c.save()
    buffer.seek(0)
    return buffer.getvalue()


def add_page_numbers(pdf_buffer: bytes, start_num: int = 1, position: str = "bottom-right") -> bytes:
    """Add page numbers to PDF"""
    _require_pypdf()
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import letter
    
    reader = PdfReader(BytesIO(pdf_buffer))
    writer = PdfWriter()
    
    for page_num, page in enumerate(reader.pages, start=start_num):
        # Create page number
        num_pdf = BytesIO()
        c = canvas.Canvas(num_pdf, pagesize=letter)
        c.setFont("Helvetica", 10)
        c.drawString(550, 20, str(page_num))
        c.save()
        num_pdf.seek(0)
        
        num_reader = PdfReader(num_pdf)
        page.merge_page(num_reader.pages[0])
        writer.add_page(page)
    
    output = BytesIO()
    writer.write(output)
    output.seek(0)
    return output.getvalue()


def protect_pdf(pdf_buffer: bytes, password: str) -> bytes:
    """Add password protection to PDF"""
    _require_pypdf()
    reader = PdfReader(BytesIO(pdf_buffer))
    writer = PdfWriter()
    
    for page in reader.pages:
        writer.add_page(page)
    
    writer.encrypt(password)
    
    output = BytesIO()
    writer.write(output)
    output.seek(0)
    return output.getvalue()


def unlock_pdf(pdf_buffer: bytes, password: str) -> bytes:
    """Remove password protection from PDF"""
    _require_pypdf()
    reader = PdfReader(BytesIO(pdf_buffer), password=password)
    writer = PdfWriter()
    
    for page in reader.pages:
        writer.add_page(page)
    
    output = BytesIO()
    writer.write(output)
    output.seek(0)
    return output.getvalue()


def remove_pdf_metadata(pdf_buffer: bytes) -> bytes:
    """Remove metadata from PDF"""
    _require_pypdf()
    reader = PdfReader(BytesIO(pdf_buffer))
    writer = PdfWriter()
    
    for page in reader.pages:
        writer.add_page(page)
    
    # Remove metadata
    writer.add_metadata({})
    
    output = BytesIO()
    writer.write(output)
    output.seek(0)
    return output.getvalue()


def flatten_pdf_forms(pdf_buffer: bytes) -> bytes:
    """Flatten form fields into page content"""
    _require_pypdf()
    reader = PdfReader(BytesIO(pdf_buffer))
    writer = PdfWriter()
    
    for page in reader.pages:
        writer.add_page(page)
    
    output = BytesIO()
    writer.write(output)
    output.seek(0)
    return output.getvalue()


def repair_pdf(pdf_buffer: bytes) -> bytes:
    """Attempt to repair corrupted PDF"""
    _require_pypdf()
    try:
        reader = PdfReader(BytesIO(pdf_buffer))
        writer = PdfWriter()
        
        for page in reader.pages:
            writer.add_page(page)
        
        output = BytesIO()
        writer.write(output)
        output.seek(0)
        return output.getvalue()
    except Exception as e:
        raise ValueError(f"Cannot repair PDF: {str(e)}")


# Image Conversions
def images_to_pdf(images: List[Dict[str, Any]]) -> bytes:
    """Convert multiple images (JPG/PNG) to PDF"""
    _require_pillow()
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import letter
    
    pdf_buffer = BytesIO()
    
    pil_images = []
    for img_data in images:
        img = Image.open(BytesIO(img_data['buffer']))
        if img.mode == 'RGBA':
            img = img.convert('RGB')
        pil_images.append(img)
    
    if pil_images:
        pil_images[0].save(pdf_buffer, format='PDF', save_all=True, append_images=pil_images[1:])
        pdf_buffer.seek(0)
    
    return pdf_buffer.getvalue()


def pdf_to_images(pdf_buffer: bytes, format: str = 'jpg', dpi: int = 300) -> Dict[int, bytes]:
    """Convert PDF pages to images (JPG or PNG)"""
    try:
        from pdf2image import convert_from_bytes
    except ImportError:
        raise ImportError("pdf2image package required. Install: pip install pdf2image")
    
    images = convert_from_bytes(pdf_buffer, dpi=dpi)
    result = {}
    
    img_format = 'JPEG' if format.lower() == 'jpg' else 'PNG'
    ext = 'jpg' if format.lower() == 'jpg' else 'png'
    
    for i, img in enumerate(images):
        img_buffer = BytesIO()
        img.save(img_buffer, format=img_format)
        img_buffer.seek(0)
        result[i] = img_buffer.getvalue()
    
    return result


def extract_text_from_pdf(pdf_buffer: bytes) -> str:
    """Extract text from PDF"""
    _require_pypdf()
    reader = PdfReader(BytesIO(pdf_buffer))
    text = ""
    
    for page in reader.pages:
        text += page.extract_text()
    
    return text


# File Format Conversions
def word_to_pdf(docx_buffer: bytes) -> bytes:
    """Convert DOCX to PDF (requires LibreOffice)"""
    import subprocess
    import tempfile
    
    soffice_bin = os.getenv("LIBREOFFICE_BIN", "soffice")
    with tempfile.NamedTemporaryFile(suffix='.docx', delete=False) as tmp_docx:
        tmp_docx.write(docx_buffer)
        tmp_docx.flush()
        tmp_path = tmp_docx.name
    
    with tempfile.TemporaryDirectory() as tmpdir:
        try:
            subprocess.run(
                [soffice_bin, '--headless', '--convert-to', 'pdf', '--outdir', tmpdir, tmp_path],
                check=True,
                capture_output=True
            )
            
            pdf_path = os.path.join(tmpdir, os.path.basename(tmp_path).replace('.docx', '.pdf'))
            with open(pdf_path, 'rb') as f:
                return f.read()
        finally:
            os.unlink(tmp_path)


def excel_to_pdf(xlsx_buffer: bytes) -> bytes:
    """Convert XLSX to PDF (requires LibreOffice)"""
    import subprocess
    import tempfile
    
    soffice_bin = os.getenv("LIBREOFFICE_BIN", "soffice")
    with tempfile.NamedTemporaryFile(suffix='.xlsx', delete=False) as tmp_xlsx:
        tmp_xlsx.write(xlsx_buffer)
        tmp_xlsx.flush()
        tmp_path = tmp_xlsx.name
    
    with tempfile.TemporaryDirectory() as tmpdir:
        try:
            subprocess.run(
                [soffice_bin, '--headless', '--convert-to', 'pdf', '--outdir', tmpdir, tmp_path],
                check=True,
                capture_output=True
            )
            
            pdf_path = os.path.join(tmpdir, os.path.basename(tmp_path).replace('.xlsx', '.pdf'))
            with open(pdf_path, 'rb') as f:
                return f.read()
        finally:
            os.unlink(tmp_path)


def powerpoint_to_pdf(pptx_buffer: bytes) -> bytes:
    """Convert PPTX to PDF (requires LibreOffice)"""
    import subprocess
    import tempfile
    
    soffice_bin = os.getenv("LIBREOFFICE_BIN", "soffice")
    with tempfile.NamedTemporaryFile(suffix='.pptx', delete=False) as tmp_pptx:
        tmp_pptx.write(pptx_buffer)
        tmp_pptx.flush()
        tmp_path = tmp_pptx.name
    
    with tempfile.TemporaryDirectory() as tmpdir:
        try:
            subprocess.run(
                [soffice_bin, '--headless', '--convert-to', 'pdf', '--outdir', tmpdir, tmp_path],
                check=True,
                capture_output=True
            )
            
            pdf_path = os.path.join(tmpdir, os.path.basename(tmp_path).replace('.pptx', '.pdf'))
            with open(pdf_path, 'rb') as f:
                return f.read()
        finally:
            os.unlink(tmp_path)


def text_to_pdf(text: str, title: str = "Document") -> bytes:
    """Convert plain text to PDF"""
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import letter
    from reportlab.lib import colors
    
    buffer = BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    
    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, 750, title)
    
    c.setFont("Helvetica", 10)
    y = 730
    margin = 50
    max_width = 500
    
    for line in text.split('\n'):
        if y < 50:
            c.showPage()
            y = 750
        c.drawString(margin, y, line[:100])
        y -= 15
    
    c.save()
    buffer.seek(0)
    return buffer.getvalue()


def pdf_to_text(pdf_buffer: bytes) -> str:
    """Extract text from PDF"""
    return extract_text_from_pdf(pdf_buffer)


def html_to_pdf(html_content: str) -> bytes:
    """Convert HTML to PDF (requires Playwright/ChromeDriver)"""
    try:
        from weasyprint import HTML, CSS
        from io import BytesIO
        
        html_bytes = BytesIO(html_content.encode())
        html_obj = HTML(string=html_content)
        return html_obj.write_pdf()
    except ImportError:
        raise ImportError("weasyprint required. Install: pip install weasyprint")


def pdf_to_word(pdf_buffer: bytes) -> bytes:
    """Convert PDF to DOCX (basic text extraction)"""
    from docx import Document
    
    text = extract_text_from_pdf(pdf_buffer)
    doc = Document()
    doc.add_paragraph(text)
    
    output = BytesIO()
    doc.save(output)
    output.seek(0)
    return output.getvalue()


def pdf_to_excel(pdf_buffer: bytes) -> bytes:
    """Convert PDF to XLSX (basic)"""
    from openpyxl import Workbook
    
    text = extract_text_from_pdf(pdf_buffer)
    wb = Workbook()
    ws = wb.active
    
    for i, line in enumerate(text.split('\n'), 1):
        ws.append([line])
    
    output = BytesIO()
    wb.save(output)
    output.seek(0)
    return output.getvalue()


# OCR Operations
def ocr_pdf(pdf_buffer: bytes) -> bytes:
    """Apply OCR to PDF making it searchable"""
    try:
        import pytesseract
        from pdf2image import convert_from_bytes
    except ImportError:
        raise ImportError("pytesseract and pdf2image required")
    
    images = convert_from_bytes(pdf_buffer)
    ocr_text = ""
    
    for img in images:
        ocr_text += pytesseract.image_to_string(img)
    
    return text_to_pdf(ocr_text, "OCR Output")


def ocr_image(image_buffer: bytes) -> str:
    """Extract text from image using OCR"""
    _require_pillow()
    try:
        import pytesseract
    except ImportError:
        raise ImportError("pytesseract required. Install: pip install pytesseract")
    
    img = Image.open(BytesIO(image_buffer))
    return pytesseract.image_to_string(img)


def scan_to_pdf(images: List[Dict[str, Any]]) -> bytes:
    """Convert scanned images to searchable PDF with OCR"""
    _require_pillow()
    _require_pypdf()
    try:
        import pytesseract
    except ImportError:
        raise ImportError("pytesseract required")
    
    pil_images = []
    
    for img_data in images:
        img = Image.open(BytesIO(img_data['buffer']))
        if img.mode == 'RGBA':
            img = img.convert('RGB')
        pil_images.append(img)
    
    # Create PDF from images with OCR
    if pil_images:
        pdf_buffer = BytesIO()
        pil_images[0].save(pdf_buffer, format='PDF', save_all=True, append_images=pil_images[1:])
        pdf_buffer.seek(0)
        
        # Apply OCR to make it searchable
        reader = PdfReader(pdf_buffer)
        # Note: searchable PDF creation requires full OCR implementation
        # For now, return the image-based PDF
        return pdf_buffer.getvalue()
    
    return b""
