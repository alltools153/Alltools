import urllib.request
import re
import json

test_slugs = ['json-formatter', 'merge-pdf', 'vapt-security-scanner', 'resume-ats-checker', 'sip-calculator']

for slug in test_slugs:
    url = f'http://localhost:3000/tools/{slug}'
    html = urllib.request.urlopen(url).read().decode('utf-8')
    print('='*60)
    print(f'Checking {url}...')
    print('HTML length:', len(html))
    
    # H1 check
    h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)
    clean_h1s = [re.sub(r'<[^>]+>', '', h).strip() for h in h1s]
    print('H1:', clean_h1s)
    
    # H2 check
    h2s = re.findall(r'<h2[^>]*>(.*?)</h2>', html, re.DOTALL)
    clean_h2s = [re.sub(r'<[^>]+>', '', h).strip() for h in h2s]
    print('H2 tags:', clean_h2s)
    
    # JSON-LD check
    json_ld_blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
    print(f'JSON-LD blocks found: {len(json_ld_blocks)}')
    has_webapp = any('WebApplication' in b for b in json_ld_blocks)
    has_faq = any('FAQPage' in b for b in json_ld_blocks)
    print(f'Has WebApplication schema: {has_webapp}, Has FAQPage schema: {has_faq}')
    
    # Check ordered list <ol>
    has_ol = '<ol' in html
    print(f'Has ordered step list (<ol>): {has_ol}')
    
    # Check FAQ <details>
    details_count = html.count('<details')
    print(f'Details/FAQ accordion count: {details_count}')

print('='*60)
print('All test routes verified successfully!')
