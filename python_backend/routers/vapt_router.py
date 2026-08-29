"""
FastAPI Router for Website VAPT Security Scanner & OWASP Engine
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from datetime import datetime
import urllib.parse

try:
    from python_backend.services.vapt_service import (
        is_safe_target,
        inspect_headers_and_cookies,
        inspect_ssl,
        get_owasp_api_top10
    )
except ImportError:
    from services.vapt_service import (
        is_safe_target,
        inspect_headers_and_cookies,
        inspect_ssl,
        get_owasp_api_top10
    )

router = APIRouter(prefix="/api/v1/vapt", tags=["VAPT Security Scanner & OWASP"])

class ScanRequest(BaseModel):
    url: str = Field(..., description="Target URL to audit (e.g. https://example.com)")
    deepScan: bool = Field(False, description="Enable deep endpoint inspection")

class SslRequest(BaseModel):
    hostname: str = Field(..., description="Target hostname (e.g. github.com)")
    port: int = Field(443, description="TLS Port (default 443)")

@router.post("/scan", summary="Execute Comprehensive Passive VAPT Security Audit")
async def post_vapt_scan(req: ScanRequest):
    raw_url = req.url.strip()
    if not raw_url.startswith(("http://", "https://")):
        raw_url = "https://" + raw_url

    parsed = urllib.parse.urlparse(raw_url)
    hostname = parsed.hostname or raw_url

    if not is_safe_target(hostname):
        raise HTTPException(
            status_code=400,
            detail="Security policy violation: Loopback / Private IP addresses (SSRF Protection) cannot be scanned."
        )

    # 1. Inspect Headers & Security configuration
    headers_result = await inspect_headers_and_cookies(raw_url)

    # 2. Inspect SSL/TLS if HTTPS
    ssl_result = None
    if parsed.scheme == "https" or not parsed.scheme:
        ssl_result = inspect_ssl(hostname, parsed.port or 443)

    return {
        "status": "success",
        "timestamp": datetime.utcnow().isoformat(),
        "targetUrl": raw_url,
        "hostname": hostname,
        "score": headers_result.get("score", 75),
        "grade": headers_result.get("grade", "B"),
        "headers": headers_result.get("headers", []),
        "cookies": headers_result.get("cookies", []),
        "findings": headers_result.get("findings", []),
        "ssl": ssl_result
    }

@router.post("/ssl-inspect", summary="Deep Inspect SSL/TLS Certificate & Cipher Suite")
async def post_ssl_inspect(req: SslRequest):
    hostname = req.hostname.strip()
    if not is_safe_target(hostname):
        raise HTTPException(status_code=400, detail="Private host addresses not permitted.")

    ssl_info = inspect_ssl(hostname, req.port)
    return {
        "status": "success",
        "hostname": hostname,
        "port": req.port,
        "ssl": ssl_info
    }

@router.get("/owasp-checklist", summary="Get OWASP API Top 10 Security Checklist & Test Vectors")
async def get_owasp_checklist():
    items = get_owasp_api_top10()
    return {
        "status": "success",
        "framework": "OWASP API Security Top 10 (2023 Edition)",
        "totalItems": len(items),
        "items": items
    }
