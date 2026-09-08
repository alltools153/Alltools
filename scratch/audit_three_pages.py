import urllib.request
import re
import json

pages = [
    ('Affiliate Disclosure', 'http://localhost:3000/affiliate-disclosure'),
    ('Editorial Policy', 'http://localhost:3000/editorial-policy'),
    ('Add Page Numbers to PDF', 'http://localhost:3000/tools/add-page-numbers')
]

print("=" * 80)
print("AUDIT RESULTS FOR THE 3 SPECIFIC PAGES")
print("=" * 80)

for title, url in pages:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    res = urllib.request.urlopen(req)
    html = res.read().decode('utf-8')
    
    has_aggregate = 'aggregateRating' in html or 'aggregaterating' in html
    has_review_schema = '"@type":"Review"' in html or '"@type": "Review"' in html
    has_fake_stars = '★★★★' in html or '⭐⭐⭐⭐' in html
    has_testimonial = 'testimonial' in html.lower()
    
    json_lds = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
    schema_types = []
    for block in json_lds:
        try:
            d = json.loads(block)
            schema_types.append(d.get('@type', 'Unknown'))
        except:
            pass
            
    is_clean = not (has_aggregate or has_review_schema or has_fake_stars or has_testimonial)
    
    print(f"Page Name                : {title}")
    print(f"URL Tested               : {url}")
    print(f"HTTP Status              : {res.status}")
    print(f"Contains aggregateRating : {has_aggregate}")
    print(f"Contains Review Schema   : {has_review_schema}")
    print(f"Contains Fake Stars      : {has_fake_stars}")
    print(f"Contains Testimonials    : {has_testimonial}")
    print(f"Active Schemas           : {schema_types}")
    print(f"VERDICT                  : {'100% CLEAN - NO FAKE REVIEWS' if is_clean else 'FLAGGED'}")
    print("-" * 80)
