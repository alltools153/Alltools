import urllib.request
import re

html = urllib.request.urlopen('http://localhost:3000/').read().decode('utf-8')
nav_match = re.search(r'<nav[^>]*aria-label="Comprehensive Tool Directory"[^>]*>(.*?)</nav>', html, re.DOTALL)
if nav_match:
    nav_html = nav_match.group(1)
    footer_tools = re.findall(r'href="/tools/([^"]+)"', nav_html)
    print(f"Total /tools/ links in FooterDirectory on Homepage: {len(footer_tools)}")
    print(f"Unique /tools/ links in FooterDirectory: {len(set(footer_tools))}")
else:
    print("FooterDirectory not found in HTML")
