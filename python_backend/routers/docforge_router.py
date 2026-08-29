"""
FastAPI Router for DocForge - PDF & File Conversion API
Comprehensive file format conversion, PDF manipulation, and document processing
"""

from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from io import BytesIO

from python_backend.services.docforge_service import (
    # PDF Operations
    merge_pdfs,
    split_pdf,
    extract_pdf_pages,
    delete_pdf_pages,
    rotate_pdf_pages,
    reorder_pdf_pages,
    crop_pdf_pages,
    compress_pdf,
    add_watermark,
    add_page_numbers,
    protect_pdf,
    unlock_pdf,
    remove_pdf_metadata,
    flatten_pdf_forms,
    repair_pdf,
    extract_text_from_pdf,
    
    # Image & PDF Conversions
    images_to_pdf,
    pdf_to_images,
    
    # Format Conversions
    word_to_pdf,
    excel_to_pdf,
    powerpoint_to_pdf,
    text_to_pdf,
    pdf_to_text,
    pdf_to_word,
    pdf_to_excel,
    html_to_pdf,
    
    # OCR
    ocr_pdf,
    ocr_image,
    scan_to_pdf,
)

router = APIRouter(prefix="/api/v1/docforge", tags=["DocForge - PDF & File Conversion"])


# ============= PDF OPERATIONS =============

@router.post("/pdf/merge", summary="Merge Multiple PDFs")
async def merge_multiple_pdfs(files: List[UploadFile] = File(...)):
    """Merge multiple PDF files into one"""
    try:
        pdf_buffers = []
        for file in files:
            pdf_buffers.append(await file.read())
        
        result = merge_pdfs(pdf_buffers)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=merged.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/pdf/split", summary="Split PDF into Multiple Files")
async def split_single_pdf(file: UploadFile = File(...)):
    """Split PDF into individual page files"""
    try:
        pdf_buffer = await file.read()
        pages = split_pdf(pdf_buffer)
        
        # For simplicity, return first page as example
        # In production, you might want to return as ZIP
        if pages:
            first_page = list(pages.values())[0]
            return StreamingResponse(
                BytesIO(first_page),
                media_type="application/pdf",
                headers={"Content-Disposition": "attachment; filename=split_1.pdf"}
            )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/pdf/extract-pages", summary="Extract Specific Pages from PDF")
async def extract_pages(file: UploadFile = File(...), pages: str = Form(...)):
    """Extract specific pages from PDF (comma-separated page numbers)"""
    try:
        pdf_buffer = await file.read()
        page_indices = [int(p.strip()) - 1 for p in pages.split(",")]
        
        result = extract_pdf_pages(pdf_buffer, page_indices)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=extracted.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/pdf/delete-pages", summary="Delete Pages from PDF")
async def delete_pages(file: UploadFile = File(...), pages: str = Form(...)):
    """Delete specific pages from PDF (comma-separated page numbers)"""
    try:
        pdf_buffer = await file.read()
        page_indices = [int(p.strip()) - 1 for p in pages.split(",")]
        
        result = delete_pdf_pages(pdf_buffer, page_indices)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=deleted.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/pdf/rotate", summary="Rotate PDF Pages")
async def rotate_pages(file: UploadFile = File(...), rotation: int = Form(...)):
    """Rotate PDF pages (90, 180, or 270 degrees)"""
    try:
        pdf_buffer = await file.read()
        
        if rotation not in [90, 180, 270]:
            raise ValueError("Rotation must be 90, 180, or 270")
        
        result = rotate_pdf_pages(pdf_buffer, rotation)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=rotated.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/pdf/compress", summary="Compress PDF File")
async def compress_pdf_file(file: UploadFile = File(...)):
    """Compress PDF to reduce file size"""
    try:
        pdf_buffer = await file.read()
        result = compress_pdf(pdf_buffer)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=compressed.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/pdf/watermark", summary="Add Watermark to PDF")
async def add_pdf_watermark(file: UploadFile = File(...), text: str = Form(...)):
    """Add text watermark to PDF pages"""
    try:
        pdf_buffer = await file.read()
        result = add_watermark(pdf_buffer, text)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=watermarked.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/pdf/page-numbers", summary="Add Page Numbers to PDF")
async def add_numbers(file: UploadFile = File(...), start: int = Form(default=1)):
    """Add page numbers to PDF"""
    try:
        pdf_buffer = await file.read()
        result = add_page_numbers(pdf_buffer, start)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=numbered.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/pdf/protect", summary="Add Password Protection to PDF")
async def protect_pdf_file(file: UploadFile = File(...), password: str = Form(...)):
    """Add password protection to PDF"""
    try:
        pdf_buffer = await file.read()
        result = protect_pdf(pdf_buffer, password)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=protected.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/pdf/unlock", summary="Remove Password Protection from PDF")
async def unlock_pdf_file(file: UploadFile = File(...), password: str = Form(...)):
    """Remove password protection from PDF"""
    try:
        pdf_buffer = await file.read()
        result = unlock_pdf(pdf_buffer, password)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=unlocked.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/pdf/remove-metadata", summary="Remove Metadata from PDF")
async def remove_metadata(file: UploadFile = File(...)):
    """Remove document metadata from PDF"""
    try:
        pdf_buffer = await file.read()
        result = remove_pdf_metadata(pdf_buffer)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=clean.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/pdf/flatten", summary="Flatten Form Fields in PDF")
async def flatten_forms(file: UploadFile = File(...)):
    """Flatten form fields into page content"""
    try:
        pdf_buffer = await file.read()
        result = flatten_pdf_forms(pdf_buffer)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=flattened.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/pdf/repair", summary="Repair Corrupted PDF")
async def repair_pdf_file(file: UploadFile = File(...)):
    """Attempt to repair corrupted PDF"""
    try:
        pdf_buffer = await file.read()
        result = repair_pdf(pdf_buffer)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=repaired.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/pdf/extract-text", summary="Extract Text from PDF")
async def extract_text(file: UploadFile = File(...)):
    """Extract all text from PDF"""
    try:
        pdf_buffer = await file.read()
        text = extract_text_from_pdf(pdf_buffer)
        
        return {
            "text": text,
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# ============= FORMAT CONVERSIONS =============

@router.post("/convert/image-to-pdf", summary="Convert Images to PDF")
async def images_to_pdf_endpoint(files: List[UploadFile] = File(...)):
    """Convert JPG/PNG images to PDF"""
    try:
        images = []
        for file in files:
            buffer = await file.read()
            images.append({
                "buffer": buffer,
                "name": file.filename
            })
        
        result = images_to_pdf(images)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=converted.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/convert/pdf-to-jpg", summary="Convert PDF to JPG Images")
async def pdf_to_jpg(file: UploadFile = File(...)):
    """Convert PDF pages to JPG images"""
    try:
        pdf_buffer = await file.read()
        images = pdf_to_images(pdf_buffer, format='jpg')
        
        if images:
            first_image = list(images.values())[0]
            return StreamingResponse(
                BytesIO(first_image),
                media_type="image/jpeg",
                headers={"Content-Disposition": "attachment; filename=page_1.jpg"}
            )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/convert/pdf-to-png", summary="Convert PDF to PNG Images")
async def pdf_to_png(file: UploadFile = File(...)):
    """Convert PDF pages to PNG images"""
    try:
        pdf_buffer = await file.read()
        images = pdf_to_images(pdf_buffer, format='png')
        
        if images:
            first_image = list(images.values())[0]
            return StreamingResponse(
                BytesIO(first_image),
                media_type="image/png",
                headers={"Content-Disposition": "attachment; filename=page_1.png"}
            )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/convert/word-to-pdf", summary="Convert Word (DOCX) to PDF")
async def docx_to_pdf(file: UploadFile = File(...)):
    """Convert DOCX to PDF (requires LibreOffice)"""
    try:
        docx_buffer = await file.read()
        result = word_to_pdf(docx_buffer)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=converted.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/convert/excel-to-pdf", summary="Convert Excel (XLSX) to PDF")
async def xlsx_to_pdf(file: UploadFile = File(...)):
    """Convert XLSX to PDF (requires LibreOffice)"""
    try:
        xlsx_buffer = await file.read()
        result = excel_to_pdf(xlsx_buffer)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=converted.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/convert/powerpoint-to-pdf", summary="Convert PowerPoint (PPTX) to PDF")
async def pptx_to_pdf(file: UploadFile = File(...)):
    """Convert PPTX to PDF (requires LibreOffice)"""
    try:
        pptx_buffer = await file.read()
        result = powerpoint_to_pdf(pptx_buffer)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=converted.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/convert/txt-to-pdf", summary="Convert Text to PDF")
async def txt_to_pdf(file: UploadFile = File(...)):
    """Convert plain text to PDF"""
    try:
        text_buffer = await file.read()
        text_content = text_buffer.decode('utf-8')
        result = text_to_pdf(text_content)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=converted.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/convert/pdf-to-text", summary="Convert PDF to Text")
async def pdf_to_text_endpoint(file: UploadFile = File(...)):
    """Extract text from PDF as plain text file"""
    try:
        pdf_buffer = await file.read()
        text = pdf_to_text(pdf_buffer)
        
        return StreamingResponse(
            BytesIO(text.encode('utf-8')),
            media_type="text/plain",
            headers={"Content-Disposition": "attachment; filename=extracted.txt"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/convert/pdf-to-word", summary="Convert PDF to Word (DOCX)")
async def pdf_to_docx(file: UploadFile = File(...)):
    """Convert PDF to editable Word document"""
    try:
        pdf_buffer = await file.read()
        result = pdf_to_word(pdf_buffer)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers={"Content-Disposition": "attachment; filename=converted.docx"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/convert/pdf-to-excel", summary="Convert PDF to Excel (XLSX)")
async def pdf_to_xlsx(file: UploadFile = File(...)):
    """Convert PDF to Excel spreadsheet"""
    try:
        pdf_buffer = await file.read()
        result = pdf_to_excel(pdf_buffer)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": "attachment; filename=converted.xlsx"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/convert/html-to-pdf", summary="Convert HTML to PDF")
async def html_to_pdf_endpoint(file: UploadFile = File(...)):
    """Convert HTML to PDF"""
    try:
        html_buffer = await file.read()
        html_content = html_buffer.decode('utf-8')
        result = html_to_pdf(html_content)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=converted.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# ============= OCR OPERATIONS =============

@router.post("/ocr/pdf", summary="Make PDF Searchable with OCR")
async def ocr_pdf_endpoint(file: UploadFile = File(...)):
    """Apply OCR to PDF making it searchable (requires pytesseract)"""
    try:
        pdf_buffer = await file.read()
        result = ocr_pdf(pdf_buffer)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=ocr.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/ocr/image", summary="Extract Text from Image")
async def ocr_image_endpoint(file: UploadFile = File(...)):
    """Extract text from image using OCR"""
    try:
        image_buffer = await file.read()
        text = ocr_image(image_buffer)
        
        return {
            "text": text,
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/ocr/scan-to-pdf", summary="Convert Scans to Searchable PDF")
async def scan_to_pdf_endpoint(files: List[UploadFile] = File(...)):
    """Convert scanned images to searchable PDF with OCR"""
    try:
        images = []
        for file in files:
            buffer = await file.read()
            images.append({
                "buffer": buffer,
                "name": file.filename
            })
        
        result = scan_to_pdf(images)
        
        return StreamingResponse(
            BytesIO(result),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=scanned.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# ============= HEALTH CHECK =============

@router.get("/health", summary="DocForge Service Health Check")
async def docforge_health():
    """Check if DocForge service is running"""
    return {
        "service": "DocForge PDF & File Conversion",
        "status": "healthy",
        "version": "1.0.0",
        "features": [
            "PDF Merge & Split",
            "Format Conversions",
            "Image Processing",
            "OCR Support",
            "PDF Security",
            "Metadata Management"
        ]
    }
