import urllib.request
import re
import json

test_urls = [
    'http://localhost:3000/',
    'http://localhost:3000/tools/json-formatter',
    'http://localhost:3000/tools/vapt-scanner',
    'http://localhost:3000/tools/age-calculator',
    'http://localhost:3000/tools/merge-pdf',
    'http://localhost:3000/seo-keywords',
    'http://localhost:3000/document-tools',
    'http://localhost:3000/dev-tools',
    'http://localhost:3000/about',
    'http://localhost:3000/developer',
]

print("=" * 70)
print("AUDITING ALL ROUTES FOR FAKE REVIEWS / RATINGS / SCHEMAS")
print("=" * 70)

all_clean = True
for url in test_urls:
    try:
        res = urllib.request.urlopen(url)
        html = res.read().decode('utf-8')
        
        # Check for fake review indicators
        has_aggregate = 'aggregateRating' in html or 'AggregateRating' in html
        has_fake_review = 'reviewRating' in html or 'reviewBody' in html or '"review"' in html
        has_fake_stars = '★★★★' in html or '⭐⭐⭐⭐' in html
        
        is_clean = not (has_aggregate or has_fake_review or has_fake_stars)
        if not is_clean:
            all_clean = False
            
        status_str = "CLEAN (0 Fake Reviews/Ratings)" if is_clean else "FLAGGED"
        print(f"{url:<45} | {status_str}")
        
    except Exception as e:
        print(f"{url:<45} | ERROR: {e}")
        all_clean = False

print("=" * 70)
print(f"VERIFICATION RESULT: ALL ROUTES 100% CLEAN OF FAKE REVIEWS: {all_clean}")
print("=" * 70)
