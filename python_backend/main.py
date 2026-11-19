"""
AllTools Multi-Tool Suite - Python FastAPI Backend Server
Unified REST API supporting:
1. Age Milestone & Cosmic Bio Calculator API
2. Website VAPT Security Scanner & OWASP Engine API
3. Bengali Calendar & Panjika Almanac API
4. SEO Intelligence & Keywords Matrix API

Lead Architect & Developer: Santanu Batabyal
"""

import sys
import os

# Ensure repository root and python_backend are on sys.path
_current_dir = os.path.dirname(os.path.abspath(__file__))
_parent_dir = os.path.dirname(_current_dir)
for p in [_parent_dir, _current_dir]:
    if p not in sys.path:
        sys.path.insert(0, p)

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

try:
    from python_backend.routers import age_router, vapt_router, bengali_router, seo_router, docforge_router
except ImportError:
    from routers import age_router, vapt_router, bengali_router, seo_router, docforge_router

# Initialize FastAPI with docs and redoc disabled as requested
app = FastAPI(
    title="AllTools Unified REST API",
    description="AllTools Multi-Project High-Performance Python Backend API",
    version="1.0.0",
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

# Enable CORS for Next.js frontend and external integrations
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in os.getenv("CORS_ORIGINS", "*").split(",") if origin.strip()],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def prevent_api_indexing(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Robots-Tag"] = "noindex, nofollow, nosnippet"
    return response

# Include Modular Routers
app.include_router(age_router.router)
app.include_router(vapt_router.router)
app.include_router(bengali_router.router)
app.include_router(seo_router.router)
app.include_router(docforge_router.router)

@app.get("/", summary="AllTools Backend Root Health Check")
async def root():
    return {
        "service": "AllTools Unified API Engine",
        "status": "healthy",
        "framework": "FastAPI + Python 3.10+",
        "frontend": "Next.js 14 App Router",
        "developer": "Santanu Batabyal",
        "timestamp": datetime.utcnow().isoformat(),
        "modules": [
            {"name": "Age Calculator", "prefix": "/api/v1/age"},
            {"name": "VAPT Security Scanner", "prefix": "/api/v1/vapt"},
            {"name": "Bengali Calendar", "prefix": "/api/v1/bengali"},
            {"name": "SEO Intelligence", "prefix": "/api/v1/seo"}
        ]
    }

@app.get("/api/v1/health", summary="Health Status Endpoint")
async def health_check():
    return {
        "status": "UP",
        "developer": "Santanu Batabyal",
        "timestamp": datetime.utcnow().isoformat(),
        "uptime": "Active"
    }

if __name__ == "__main__":
    import uvicorn
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app" if os.path.exists("main.py") else "python_backend.main:app", host=host, port=port, reload=False)
