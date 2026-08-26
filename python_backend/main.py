"""
AllTools Multi-Tool Suite - Python FastAPI Backend Server
Unified REST API supporting:
1. Age Milestone & Cosmic Bio Calculator API
2. Website VAPT Security Scanner & OWASP Engine API
3. Bengali Calendar & Panjika Almanac API
4. SEO Intelligence & Keywords Matrix API

Lead Architect & Developer: Santanu Batabyal
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from python_backend.routers import age_router, vapt_router, bengali_router, seo_router

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
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Modular Routers
app.include_router(age_router.router)
app.include_router(vapt_router.router)
app.include_router(bengali_router.router)
app.include_router(seo_router.router)

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
    uvicorn.run("python_backend.main:app", host="127.0.0.1", port=8000, reload=True)
