import re

def scan_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    links = re.findall(r'href=[\'\"]([^\'\"]+)[\'\"]', content)
    links += re.findall(r'href:\s*[\'\"]([^\'\"]+)[\'\"]', content)
    return links

print("=== Links in src/app/page.tsx ===")
page_links = scan_file('src/app/page.tsx')
for l in sorted(set(page_links)):
    if not l.startswith('#') and not l.startswith('http'):
        print(f"  {l}")

print("\n=== Links in src/lib/allToolsList.ts ===")
alltools_links = scan_file('src/lib/allToolsList.ts')
for l in sorted(set(alltools_links)):
    print(f"  {l}")

print("\n=== Links in src/components/FooterDirectory.tsx ===")
footer_links = scan_file('src/components/FooterDirectory.tsx')
for l in sorted(set(footer_links)):
    print(f"  {l}")
