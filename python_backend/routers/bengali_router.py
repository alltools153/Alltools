"""
FastAPI Router for Bengali Calendar & Panjika API (বাংলা পঞ্জিকা ও ক্যালেন্ডার)
"""

from fastapi import APIRouter, Query, HTTPException
from datetime import datetime
from typing import Optional, List, Dict, Any

try:
    from python_backend.services.bengali_service import (
        get_bengali_date,
        get_muhurat_timings,
        get_month_calendar,
        FESTIVALS_DB,
        BENGALI_MONTHS
    )
except ImportError:
    from services.bengali_service import (
        get_bengali_date,
        get_muhurat_timings,
        get_month_calendar,
        FESTIVALS_DB,
        BENGALI_MONTHS
    )

router = APIRouter(prefix="/api/v1/bengali", tags=["Bengali Calendar & Panjika"])

@router.get("/today", summary="Get Today's Live Bengali Date & Panjika Overview")
async def get_bengali_today():
    now = datetime.now()
    b_date = get_bengali_date(now)
    muhurats = get_muhurat_timings(now)

    # Filter festivals for today
    today_festivals = [
        f for f in FESTIVALS_DB
        if f["monthIndex"] == b_date["monthIndex"] and f["day"] == b_date["day"]
    ]

    return {
        "status": "success",
        "timestamp": now.isoformat(),
        "bengaliDate": b_date,
        "muhurats": muhurats,
        "festivalsToday": today_festivals
    }

@router.get("/convert", summary="Convert Gregorian Date to Authentic Bengali San Date")
async def convert_date_to_bengali(
    dateStr: str = Query(..., description="Gregorian date in YYYY-MM-DD (e.g. 2026-04-15)")
):
    try:
        dt = datetime.strptime(dateStr[:10], "%Y-%m-%d")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")

    b_date = get_bengali_date(dt)
    muhurats = get_muhurat_timings(dt)
    return {
        "status": "success",
        "gregorianDate": dateStr,
        "bengaliDate": b_date,
        "muhurats": muhurats
    }

@router.get("/month", summary="Get Month Calendar Days for Bengali San Month")
async def get_bengali_month_calendar(
    year: int = Query(1433, description="Bengali Year (e.g. 1431, 1432, 1433)"),
    monthIndex: int = Query(0, ge=0, le=11, description="Bengali Month Index (0=Boishakh to 11=Choitro)")
):
    days = get_month_calendar(year, monthIndex)
    m_info = BENGALI_MONTHS[monthIndex % 12]

    return {
        "status": "success",
        "bengaliYear": year,
        "monthIndex": monthIndex,
        "monthNameEn": m_info["nameEn"],
        "monthNameBn": m_info["nameBn"],
        "seasonBn": m_info["seasonBn"],
        "totalDays": len(days),
        "days": days
    }

@router.get("/festivals", summary="Get Complete Database of Festivals & Holidays")
async def get_festivals(
    category: Optional[str] = Query(None, description="Filter by category: puja, cultural, fasting")
):
    items = FESTIVALS_DB
    if category:
        items = [f for f in items if f["category"] == category]
    return {
        "status": "success",
        "total": len(items),
        "festivals": items
    }
