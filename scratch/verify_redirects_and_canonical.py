import urllib.request
import re

class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None  # Do not follow redirects so we can inspect status code and Location header

opener = urllib.request.build_opener(NoRedirectHandler)

test_routes = [
    ('/json-formatter', '/tools/json-formatter'),
    ('/regex-tester', '/tools/regex-tester'),
    ('/jwt-decoder', '/tools/jwt-decoder'),
    ('/vapt-scanner', '/tools/vapt-scanner'),
    ('/age-calculator', '/tools/age-calculator'),
    ('/resume-ats-checker', '/tools/resume-ats-checker'),
    ('/bengali-calendar', '/tools/bengali-calendar'),
    ('/document-tools/merge-pdf', '/tools/merge-pdf'),
    ('/document-tools/split-pdf', '/tools/split-pdf'),
    ('/sip-calculator', '/tools/sip-calculator'),
]

print("=== 1. Testing HTTP 308/301 Permanent Redirects ===")
for path, expected_dest in test_routes:
    url = f"http://localhost:3000{path}"
    try:
        req = urllib.request.Request(url)
        res = opener.open(req)
        print(f"FAILED (No redirect): {path} -> {res.status}")
    except urllib.error.HTTPError as e:
        location = e.headers.get('Location')
        print(f"Status {e.code} for {path} -> Location: {location} (Matches expected: {location == expected_dest or location == 'http://localhost:3000' + expected_dest})")

print("\n=== 2. Testing Homepage HTML Link Uniformity ===")
home_html = urllib.request.urlopen("http://localhost:3000/").read().decode('utf-8')

# Search for any lingering short tool links
legacy_patterns = [
    'href="/json-formatter"', 'href="/vapt-scanner"', 'href="/age-calculator"',
    'href="/jwt-decoder"', 'href="/regex-tester"', 'href="/document-tools/merge-pdf"'
]
for p in legacy_patterns:
    found = p in home_html
    print(f"Check legacy pattern {p}: {'Found (DISCREPANCY!)' if found else 'CLEAN (Not found)'}")

# Verify canonical /tools/ patterns exist in Hero & Cards
canonical_patterns = [
    'href="/tools/json-formatter"', 'href="/tools/vapt-scanner"', 'href="/tools/age-calculator"',
    'href="/tools/merge-pdf"', 'href="/tools/resume-ats-checker"'
]
for p in canonical_patterns:
    found = p in home_html
    print(f"Check canonical pattern {p}: {'FOUND (Verified)' if found else 'MISSING!'}")

print("\n=== 3. Testing Target /tools/[slug] Status ===")
target_routes = ['/tools/json-formatter', '/tools/vapt-scanner', '/tools/age-calculator', '/tools/merge-pdf']
for r in target_routes:
    res = urllib.request.urlopen(f"http://localhost:3000{r}")
    print(f"Status for {r}: {res.status} OK (HTML bytes: {len(res.read())})")
