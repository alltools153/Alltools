"""
FastAPI Router for Age Calculator & Cosmic Biology API
"""

from fastapi import APIRouter, Query, HTTPException
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List, Dict, Any

try:
    from python_backend.services.age_service import (
        calculate_chronological_age,
        calculate_next_birthday,
        calculate_planetary_ages,
        calculate_cosmic_bio_stats,
        get_astrological_insights
    )
except ImportError:
    from services.age_service import (
        calculate_chronological_age,
        calculate_next_birthday,
        calculate_planetary_ages,
        calculate_cosmic_bio_stats,
        get_astrological_insights
    )

router = APIRouter(prefix="/api/v1/age", tags=["Age Calculator & Cosmic Biology"])

class DateDiffRequest(BaseModel):
    startDate: str = Field(..., description="Start date in YYYY-MM-DD format")
    endDate: str = Field(..., description="End date in YYYY-MM-DD format")

@router.get("/calculate", summary="Calculate Exact Chronological Age & Bio Metrics")
async def get_age_calculation(
    birthDate: str = Query(..., description="Birth date in YYYY-MM-DD or ISO format (e.g. 1995-08-15)"),
    targetDate: Optional[str] = Query(None, description="Target comparison date (defaults to now)")
):
    try:
        birth_dt = datetime.fromisoformat(birthDate.replace("Z", ""))
    except Exception:
        try:
            birth_dt = datetime.strptime(birthDate[:10], "%Y-%m-%d")
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid birthDate format. Please use YYYY-MM-DD.")

    target_dt = None
    if targetDate:
        try:
            target_dt = datetime.fromisoformat(targetDate.replace("Z", ""))
        except Exception:
            target_dt = datetime.strptime(targetDate[:10], "%Y-%m-%d")

    chrono = calculate_chronological_age(birth_dt, target_dt)
    next_bday = calculate_next_birthday(birth_dt, target_dt)
    planets = calculate_planetary_ages(birth_dt, target_dt)
    bio_stats = calculate_cosmic_bio_stats(birth_dt, target_dt)
    astro = get_astrological_insights(birth_dt)

    return {
        "status": "success",
        "timestamp": datetime.utcnow().isoformat(),
        "chronologicalAge": chrono,
        "nextBirthday": next_bday,
        "planetaryAges": planets,
        "cosmicBioStats": bio_stats,
        "astrology": astro
    }

@router.get("/planetary", summary="Calculate Age on All 9 Solar System Planets")
async def get_planetary_ages(
    birthDate: str = Query(..., description="Birth date in YYYY-MM-DD")
):
    try:
        birth_dt = datetime.strptime(birthDate[:10], "%Y-%m-%d")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid birthDate format. Use YYYY-MM-DD.")

    planets = calculate_planetary_ages(birth_dt)
    return {
        "status": "success",
        "birthDate": birthDate,
        "planets": planets
    }

@router.get("/bio-stats", summary="Calculate Lifetime Cosmic & Biological Statistics")
async def get_bio_stats(
    birthDate: str = Query(..., description="Birth date in YYYY-MM-DD")
):
    try:
        birth_dt = datetime.strptime(birthDate[:10], "%Y-%m-%d")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid birthDate format. Use YYYY-MM-DD.")

    stats = calculate_cosmic_bio_stats(birth_dt)
    return {
        "status": "success",
        "birthDate": birthDate,
        "stats": stats
    }

@router.post("/date-diff", summary="Calculate Exact Calendar Difference Between Two Dates")
async def post_date_difference(req: DateDiffRequest):
    try:
        start_dt = datetime.strptime(req.startDate[:10], "%Y-%m-%d")
        end_dt = datetime.strptime(req.endDate[:10], "%Y-%m-%d")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid dates. Use YYYY-MM-DD.")

    diff_days = abs((end_dt - start_dt).days)
    chrono = calculate_chronological_age(min(start_dt, end_dt), max(start_dt, end_dt))

    # Business days (Mon-Fri)
    cur = min(start_dt, end_dt)
    target = max(start_dt, end_dt)
    business_days = 0
    while cur < target:
        if cur.weekday() < 5:
            business_days += 1
        cur += datetime.resolution.day if hasattr(datetime.resolution, 'day') else (end_dt - start_dt) / max(1, diff_days)

    return {
        "status": "success",
        "startDate": req.startDate,
        "endDate": req.endDate,
        "totalDays": diff_days,
        "totalWeeks": diff_days // 7,
        "businessDays": business_days,
        "chronologicalDiff": chrono
    }
