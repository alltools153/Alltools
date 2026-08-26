"""
FastAPI Router for SEO Intelligence & Meta Generation API
"""

from fastapi import APIRouter, Query
from typing import Optional, List, Dict, Any

from python_backend.services.seo_service import (
    get_keywords_by_category,
    generate_json_ld_schemas,
    SEO_KEYWORDS_MASTER
)

router = APIRouter(prefix="/api/v1/seo", tags=["SEO Intelligence & Keywords"])

@router.get("/keywords", summary="Get Master List of SEO Keywords Categorized by Tool & Search Intent")
async def get_seo_keywords(
    category: Optional[str] = Query(None, description="Category filter: general, age, vapt, bengali"),
    lang: Optional[str] = Query(None, description="Language filter: en, bn")
):
    keywords = get_keywords_by_category(category, lang)
    return {
        "status": "success",
        "total": len(keywords),
        "category": category or "all",
        "language": lang or "all",
        "keywords": keywords
    }

@router.get("/schemas", summary="Get Schema.org JSON-LD Structured Data for AllTools Hub")
async def get_seo_schemas():
    schemas = generate_json_ld_schemas()
    return {
        "status": "success",
        "schemas": schemas
    }
