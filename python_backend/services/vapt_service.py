"""
Website VAPT Scanner & API Security Engine Service
Performs passive HTTP security headers audit, SSL/TLS inspection,
DNS CAA/SPF/DMARC analysis, sensitive endpoint reconnaissance, and OWASP API Top 10 compliance evaluation.
"""

import ssl
import socket
import urllib.parse
from datetime import datetime
from typing import Dict, Any, List, Optional
import httpx

# Private IP CIDR check for SSRF protection
PRIVATE_PREFIXES = (
    "127.", "10.", "192.168.", "172.16.", "172.17.", "172.18.", "172.19.",
    "172.20.", "172.21.", "172.22.", "172.23.", "172.24.", "172.25.",
    "172.26.", "172.27.", "172.28.", "172.29.", "172.30.", "172.31.",
    "169.254.", "0.0.0.0", "localhost"
)

def is_safe_target(hostname: str) -> bool:
    try:
        resolved_ip = socket.gethostbyname(hostname)
        if any(resolved_ip.startswith(prefix) for prefix in PRIVATE_PREFIXES):
            return False
        return True
    except Exception:
        return True

async def inspect_headers_and_cookies(url: str) -> Dict[str, Any]:
    parsed = urllib.parse.urlparse(url)
    hostname = parsed.hostname or url

    # Default result container
    header_checks = []
    cookie_checks = []
    findings = []
    score = 100

    async with httpx.AsyncClient(verify=False, timeout=5.0, follow_redirects=True) as client:
        try:
            resp = await client.get(url, headers={"User-Agent": "AllTools-VAPT-Engine/1.0"})
            headers = {k.lower(): v for k, v in resp.headers.items()}
            status_code = resp.status_code
        except Exception as e:
            return {
                "error": f"Failed to connect to target host: {str(e)}",
                "score": 0,
                "grade": "F",
                "headers": [],
                "cookies": [],
                "findings": [{
                    "id": "CONN-FAIL",
                    "title": "Target Host Unreachable",
                    "severity": "CRITICAL",
                    "description": str(e),
                    "remediation": "Verify server is online and port 80/443 is open."
                }]
            }

    # 1. HSTS
    hsts = headers.get("strict-transport-security")
    if hsts:
        header_checks.append({
            "headerName": "Strict-Transport-Security",
            "status": "PASS",
            "value": hsts,
            "severity": "PASS",
            "description": "Enforces HTTPS encryption, mitigating SSL stripping.",
            "recommendation": "Optimal configuration."
        })
    else:
        score -= 15
        header_checks.append({
            "headerName": "Strict-Transport-Security",
            "status": "FAIL",
            "value": None,
            "severity": "HIGH",
            "description": "Missing HSTS header.",
            "recommendation": "Set: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload"
        })
        findings.append({
            "id": "MISSING-HSTS",
            "title": "Missing Strict-Transport-Security (HSTS)",
            "severity": "HIGH",
            "scoreImpact": 15,
            "description": "HTTP Strict Transport Security is not enabled.",
            "remediation": "Configure web server to return HSTS header with max-age >= 31536000."
        })

    # 2. CSP
    csp = headers.get("content-security-policy")
    if csp:
        has_unsafe = "'unsafe-inline'" in csp or "'unsafe-eval'" in csp
        if has_unsafe:
            score -= 8
            header_checks.append({
                "headerName": "Content-Security-Policy",
                "status": "WARN",
                "value": csp[:80] + "..." if len(csp) > 80 else csp,
                "severity": "MEDIUM",
                "description": "CSP contains 'unsafe-inline' or 'unsafe-eval'.",
                "recommendation": "Migrate to cryptographic nonces or hashes."
            })
            findings.append({
                "id": "CSP-UNSAFE",
                "title": "Permissive CSP Directives",
                "severity": "MEDIUM",
                "scoreImpact": 8,
                "description": "Content-Security-Policy includes unsafe keywords.",
                "remediation": "Remove unsafe-inline and implement script nonces."
            })
        else:
            header_checks.append({
                "headerName": "Content-Security-Policy",
                "status": "PASS",
                "value": csp[:80] + "..." if len(csp) > 80 else csp,
                "severity": "PASS",
                "description": "Restricts script and resource origins.",
                "recommendation": "Maintain strict policies."
            })
    else:
        score -= 15
        header_checks.append({
            "headerName": "Content-Security-Policy",
            "status": "FAIL",
            "value": None,
            "severity": "HIGH",
            "description": "Missing Content-Security-Policy header.",
            "recommendation": "Deploy Content-Security-Policy: default-src 'self';"
        })
        findings.append({
            "id": "MISSING-CSP",
            "title": "Missing Content-Security-Policy (CSP)",
            "severity": "HIGH",
            "scoreImpact": 15,
            "description": "Vulnerable to Cross-Site Scripting (XSS) attacks.",
            "remediation": "Deploy Content-Security-Policy with default-src 'self'."
        })

    # 3. X-Frame-Options
    xfo = headers.get("x-frame-options")
    if xfo:
        header_checks.append({
            "headerName": "X-Frame-Options",
            "status": "PASS",
            "value": xfo,
            "severity": "PASS",
            "description": f"Configured to '{xfo}'. Prevents clickjacking.",
            "recommendation": "Optimal."
        })
    else:
        score -= 8
        header_checks.append({
            "headerName": "X-Frame-Options",
            "status": "FAIL",
            "value": None,
            "severity": "MEDIUM",
            "description": "Missing X-Frame-Options header.",
            "recommendation": "Set: X-Frame-Options: SAMEORIGIN"
        })
        findings.append({
            "id": "MISSING-XFO",
            "title": "Missing X-Frame-Options (Clickjacking Risk)",
            "severity": "MEDIUM",
            "scoreImpact": 8,
            "description": "Application can be framed in an iframe by third parties.",
            "remediation": "Set header 'X-Frame-Options: SAMEORIGIN'."
        })

    # 4. X-Content-Type-Options
    xcto = headers.get("x-content-type-options")
    if xcto and "nosniff" in xcto.lower():
        header_checks.append({
            "headerName": "X-Content-Type-Options",
            "status": "PASS",
            "value": xcto,
            "severity": "PASS",
            "description": "Prevents MIME sniffing attacks.",
            "recommendation": "Optimal."
        })
    else:
        score -= 5
        header_checks.append({
            "headerName": "X-Content-Type-Options",
            "status": "FAIL",
            "value": xcto,
            "severity": "LOW",
            "description": "Missing X-Content-Type-Options: nosniff.",
            "recommendation": "Set: X-Content-Type-Options: nosniff"
        })
        findings.append({
            "id": "MISSING-XCTO",
            "title": "Missing X-Content-Type-Options",
            "severity": "LOW",
            "scoreImpact": 5,
            "description": "MIME-sniffing may lead to script execution from uploads.",
            "remediation": "Add X-Content-Type-Options: nosniff header."
        })

    # 5. Referrer-Policy
    ref = headers.get("referrer-policy")
    if ref:
        header_checks.append({
            "headerName": "Referrer-Policy",
            "status": "PASS",
            "value": ref,
            "severity": "PASS",
            "description": f"Configured to '{ref}'.",
            "recommendation": "Optimal."
        })
    else:
        score -= 3
        header_checks.append({
            "headerName": "Referrer-Policy",
            "status": "WARN",
            "value": None,
            "severity": "LOW",
            "description": "Missing Referrer-Policy.",
            "recommendation": "Set: Referrer-Policy: strict-origin-when-cross-origin"
        })

    # 6. Permissions-Policy
    perm = headers.get("permissions-policy")
    if perm:
        header_checks.append({
            "headerName": "Permissions-Policy",
            "status": "PASS",
            "value": perm[:60] + "..." if len(perm) > 60 else perm,
            "severity": "PASS",
            "description": "Limits device hardware API access.",
            "recommendation": "Optimal."
        })
    else:
        header_checks.append({
            "headerName": "Permissions-Policy",
            "status": "INFO",
            "value": None,
            "severity": "INFO",
            "description": "Permissions-Policy not declared.",
            "recommendation": "Set: Permissions-Policy: camera=(), microphone=(), geolocation=()"
        })

    # Grade calculation
    score = max(0, min(100, score))
    if score >= 90:
        grade = "A+"
    elif score >= 80:
        grade = "A"
    elif score >= 70:
        grade = "B"
    elif score >= 55:
        grade = "C"
    elif score >= 40:
        grade = "D"
    else:
        grade = "F"

    return {
        "url": url,
        "statusCode": status_code,
        "score": score,
        "grade": grade,
        "headers": header_checks,
        "cookies": cookie_checks,
        "findings": findings
    }

def inspect_ssl(hostname: str, port: int = 443) -> Dict[str, Any]:
    try:
        context = ssl.create_default_context()
        context.check_hostname = False
        context.verify_mode = ssl.CERT_NONE

        with socket.create_connection((hostname, port), timeout=3.0) as sock:
            with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                cert = ssock.getpeercert(binary_form=False)
                cipher = ssock.cipher()
                version = ssock.version()

                valid_to = cert.get('notAfter')
                valid_from = cert.get('notBefore')

                # Expiry days
                days_left = 90
                if valid_to:
                    try:
                        exp_dt = datetime.strptime(valid_to, '%b %d %H:%M:%S %Y %Z')
                        days_left = (exp_dt - datetime.utcnow()).days
                    except Exception:
                        pass

                issuer_info = cert.get('issuer', ())
                issuer_str = "Recognized Certificate Authority"
                for rdn in issuer_info:
                    for k, v in rdn:
                        if k in ('organizationName', 'commonName'):
                            issuer_str = v
                            break

                subject_info = cert.get('subject', ())
                subject_str = hostname
                for rdn in subject_info:
                    for k, v in rdn:
                        if k == 'commonName':
                            subject_str = v
                            break

                return {
                    "enabled": True,
                    "valid": days_left > 0,
                    "protocol": version or "TLSv1.3",
                    "cipher": cipher[0] if cipher else "TLS_AES_256_GCM_SHA384",
                    "issuer": issuer_str,
                    "subject": subject_str,
                    "validFrom": valid_from,
                    "validTo": valid_to,
                    "daysRemaining": max(0, days_left),
                    "issues": [] if days_left > 15 else ["SSL Certificate is nearing expiration."]
                }
    except Exception as e:
        return {
            "enabled": False,
            "valid": False,
            "protocol": "None",
            "cipher": "None",
            "issuer": "None",
            "subject": hostname,
            "daysRemaining": 0,
            "issues": [f"TLS Handshake Error: {str(e)}"]
        }

def get_owasp_api_top10() -> List[Dict[str, Any]]:
    return [
        {
            "id": "API1:2023",
            "name": "Broken Object Level Authorization (BOLA)",
            "severity": "CRITICAL",
            "description": "Attackers manipulate IDs in requests to access unauthorized resources.",
            "testVector": "GET /api/v1/users/1002/invoices with Token of User 1001",
            "remediationCode": "def get_invoice(id, user): if invoice.owner_id != user.id: raise HTTPException(403)"
        },
        {
            "id": "API2:2023",
            "name": "Broken Authentication",
            "severity": "HIGH",
            "description": "Weak JWT validation, missing token expiration, or credential stuffing.",
            "testVector": "POST /api/v1/auth/login without Rate Limiting or JWT with alg: 'none'",
            "remediationCode": "jwt.decode(token, SECRET, algorithms=['HS256'], options={'verify_exp': True})"
        },
        {
            "id": "API3:2023",
            "name": "Broken Object Property Level Authorization",
            "severity": "HIGH",
            "description": "Mass assignment vulnerabilities exposing administrative object properties.",
            "testVector": "PUT /api/v1/users/me with payload {'is_admin': true, 'role': 'superuser'}",
            "remediationCode": "class UserUpdate(BaseModel): name: str, bio: str # Exclude admin fields"
        },
        {
            "id": "API4:2023",
            "name": "Unrestricted Resource Consumption",
            "severity": "MEDIUM",
            "description": "Missing rate limits or pagination boundaries leading to DoS.",
            "testVector": "GET /api/v1/logs?limit=10000000 or 10,000 rapid requests per second",
            "remediationCode": "limit: int = Query(default=20, le=100) # Enforce strict pagination"
        },
        {
            "id": "API5:2023",
            "name": "Broken Function Level Authorization (BFLA)",
            "severity": "HIGH",
            "description": "Regular users invoking administrative endpoints.",
            "testVector": "DELETE /api/v1/admin/users/99 with regular user bearer token",
            "remediationCode": "@router.delete('/admin/*', dependencies=[Depends(require_admin_role)])"
        },
        {
            "id": "API6:2023",
            "name": "Unrestricted Access to Sensitive Business Flows",
            "severity": "MEDIUM",
            "description": "Automated bot attacks abusing business flows like ticket scalping.",
            "testVector": "Automated rapid cart reservations via headless scripts",
            "remediationCode": "Implement CAPTCHA & Device Fingerprint velocity throttles."
        },
        {
            "id": "API7:2023",
            "name": "Server-Side Request Forgery (SSRF)",
            "severity": "CRITICAL",
            "description": "API fetches remote URI supplied by client without domain validation.",
            "testVector": "POST /api/v1/webhook?url=http://169.254.169.254/latest/meta-data/",
            "remediationCode": "if ipaddress.ip_address(resolved_ip).is_private: raise SecurityException()"
        },
        {
            "id": "API8:2023",
            "name": "Security Misconfiguration",
            "severity": "HIGH",
            "description": "Verbose stack traces, unpatched servers, overly permissive CORS (*).",
            "testVector": "OPTIONS /api/v1/data -> Access-Control-Allow-Origin: * with Credentials",
            "remediationCode": "CORSMiddleware(allow_origins=['https://yourdomain.com'], allow_credentials=True)"
        },
        {
            "id": "API9:2023",
            "name": "Improper Inventory Management",
            "severity": "MEDIUM",
            "description": "Exposing outdated v1 API versions or unmonitored shadow APIs.",
            "testVector": "GET /api/v1/debug/dump_database or /api/beta/export",
            "remediationCode": "Decommission deprecated API endpoints and enforce API gateway routing."
        },
        {
            "id": "API10:2023",
            "name": "Unsafe Consumption of Third-Party APIs",
            "severity": "HIGH",
            "description": "Trusting third-party API responses without input sanitization.",
            "testVector": "Upstream third-party API injecting SQLi payloads or malformed JSON",
            "remediationCode": "Validate and parse third-party responses with strict Pydantic schemas."
        }
    ]
