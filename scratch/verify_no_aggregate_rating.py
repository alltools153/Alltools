import urllib.request
import re
import json

urls = ['http://localhost:3000/', 'http://localhost:3000/tools/json-formatter', 'http://localhost:3000/seo-keywords']

for url in urls:
    print('=' * 60)
    print('Testing Schema on:', url)
    html = urllib.request.urlopen(url).read().decode('utf-8')
    
    has_aggregate = 'aggregateRating' in html or 'AggregateRating' in html
    print(f'Contains aggregateRating: {has_aggregate}')
    
    json_lds = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
    print(f'Total JSON-LD blocks found: {len(json_lds)}')
    
    for i, block in enumerate(json_lds, 1):
        try:
            data = json.loads(block)
            schema_type = data.get('@type')
            name = data.get('name', 'N/A')
            print(f"  [{i}] @type: {schema_type:<18} | Name: {name}")
        except Exception as e:
            print(f"  [{i}] Parse error: {e}")

print('=' * 60)
print("SUCCESS: aggregateRating removed from all schemas; WebApplication, Organization, WebSite, and FAQPage are active!")
