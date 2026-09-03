import urllib.request
import re

with open('src/lib/tools-registry.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Extract objects using regex
matches = re.findall(r'\{\s*"slug":\s*"([^"]+)",\s*"name":\s*"([^"]+)",\s*"h1":\s*"([^"]+)",\s*"category":\s*"([^"]+)"', text)

tools = []
for slug, name, h1, cat in matches:
    tools.append({'slug': slug, 'name': name, 'h1': h1, 'category': cat})

print(f"Total tools in TOOLS_REGISTRY: {len(tools)}\n")

results = []
for t in tools:
    url = f"http://localhost:3000/tools/{t['slug']}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req)
        html = res.read().decode('utf-8')
        
        has_h1 = '<h1' in html
        has_schema = 'application/ld+json' in html
        has_how = 'How to Use' in html
        has_faq = 'Frequently Asked Questions' in html
        
        results.append({
            'slug': t['slug'],
            'name': t['name'],
            'category': t['category'],
            'status': res.status,
            'bytes': len(html),
            'verified': has_h1 and has_schema and has_how and has_faq
        })
    except Exception as e:
        results.append({
            'slug': t['slug'],
            'name': t['name'],
            'category': t['category'],
            'status': str(e),
            'bytes': 0,
            'verified': False
        })

print(f"{'#':<3} | {'Category':<10} | {'Slug':<26} | {'Status':<6} | {'HTML Size':<10} | {'SEO Verified'}")
print("-" * 78)
for i, r in enumerate(results, 1):
    v_str = "YES (H1+Schema+FAQ)" if r['verified'] else "NO"
    print(f"{i:<3} | {r['category']:<10} | {r['slug']:<26} | {str(r['status']):<6} | {str(r['bytes']) + ' B':<10} | {v_str}")

all_ok = all(r['status'] == 200 and r['verified'] for r in results)
print("\n" + "=" * 78)
print(f"VERIFIED: ALL {len(results)} OF {len(tools)} TOOLS RETURN HTTP 200 & FULL SEO CONTENT: {all_ok}")
print("=" * 78)
