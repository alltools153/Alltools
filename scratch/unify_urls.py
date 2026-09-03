import os
import re

base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# 1. Update src/lib/allToolsList.ts
all_tools_path = os.path.join(base_dir, 'src', 'lib', 'allToolsList.ts')
with open(all_tools_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace direct tool hrefs with /tools/[slug]
replacements = {
    "href: '/regex-tester'": "href: '/tools/regex-tester'",
    "href: '/json-formatter'": "href: '/tools/json-formatter'",
    "href: '/jwt-decoder'": "href: '/tools/jwt-decoder'",
    "href: '/sql-generator'": "href: '/tools/sql-generator'",
    "href: '/gitignore-generator'": "href: '/tools/gitignore-generator'",
    "href: '/base64-encoder-decoder'": "href: '/tools/base64-encoder-decoder'",
    "href: '/uuid-generator'": "href: '/tools/uuid-generator'",
    "href: '/cron-expression-generator'": "href: '/tools/cron-expression-generator'",
    "href: '/vapt-scanner'": "href: '/tools/vapt-scanner'",
    "href: '/ssl-certificate-checker'": "href: '/tools/ssl-certificate-checker'",
    "href: '/dns-lookup'": "href: '/tools/dns-lookup'",
    "href: '/whois-lookup'": "href: '/tools/whois-lookup'",
    "href: '/email-security'": "href: '/tools/email-security'",
    "href: '/password-generator'": "href: '/tools/password-generator'",
    "href: '/password-strength-checker'": "href: '/tools/password-strength-checker'",
    "href: '/bengali-calendar'": "href: '/tools/bengali-calendar'",
    "href: '/age-calculator'": "href: '/tools/age-calculator'",
    "href: '/resume-ats-checker'": "href: '/tools/resume-ats-checker'",
    "href: '/qr-generator'": "href: '/tools/qr-generator'",
    "href: '/image-compressor'": "href: '/tools/image-compressor'",
    "href: '/stock-market'": "href: '/tools/stock-market'",
    "href: '/gst-calculator'": "href: '/tools/gst-calculator'",
    "href: '/sip-calculator'": "href: '/tools/sip-calculator'",
}

for old_str, new_str in replacements.items():
    content = content.replace(old_str, new_str)

# Also replace /document-tools/[tool] with /tools/[tool] in allToolsList.ts
content = re.sub(r"href:\s*'/document-tools/([a-z0-9-]+)'", r"href: '/tools/\1'", content)

with open(all_tools_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated allToolsList.ts with canonical /tools/[slug] URLs.")

# 2. Update src/app/page.tsx
page_path = os.path.join(base_dir, 'src', 'app', 'page.tsx')
with open(page_path, 'r', encoding='utf-8') as f:
    page_content = f.read()

page_replacements = {
    'href="/regex-tester"': 'href="/tools/regex-tester"',
    'href="/json-formatter"': 'href="/tools/json-formatter"',
    'href="/jwt-decoder"': 'href="/tools/jwt-decoder"',
    'href="/sql-generator"': 'href="/tools/sql-generator"',
    'href="/gitignore-generator"': 'href="/tools/gitignore-generator"',
    'href="/base64-encoder-decoder"': 'href="/tools/base64-encoder-decoder"',
    'href="/uuid-generator"': 'href="/tools/uuid-generator"',
    'href="/cron-expression-generator"': 'href="/tools/cron-expression-generator"',
    'href="/vapt-scanner"': 'href="/tools/vapt-scanner"',
    'href="/nmap-scanner"': 'href="/tools/nmap-audit"',
    'href="/ssl-certificate-checker"': 'href="/tools/ssl-certificate-checker"',
    'href="/dns-lookup"': 'href="/tools/dns-lookup"',
    'href="/whois-lookup"': 'href="/tools/whois-lookup"',
    'href="/email-security"': 'href="/tools/email-security"',
    'href="/password-generator"': 'href="/tools/password-generator"',
    'href="/password-strength-checker"': 'href="/tools/password-strength-checker"',
    'href="/resume-ats-checker"': 'href="/tools/resume-ats-checker"',
    'href="/age-calculator"': 'href="/tools/age-calculator"',
    'href="/bengali-calendar"': 'href="/tools/bengali-calendar"',
    'href="/qr-generator"': 'href="/tools/qr-generator"',
    'href="/image-compressor"': 'href="/tools/image-compressor"',
    'href="/stock-market"': 'href="/tools/stock-market"',
    'href="/gst-calculator"': 'href="/tools/gst-calculator"',
    'href="/sip-calculator"': 'href="/tools/sip-calculator"',
    "href: '/document-tools/merge-pdf'": "href: '/tools/merge-pdf'",
    "href: '/document-tools/split-pdf'": "href: '/tools/split-pdf'",
    "href: '/document-tools/compress-pdf'": "href: '/tools/compress-pdf'",
    "href: '/document-tools/word-to-pdf'": "href: '/tools/word-to-pdf'",
    "href: '/document-tools/excel-to-pdf'": "href: '/tools/excel-to-pdf'",
    "href: '/document-tools/ocr-pdf'": "href: '/tools/ocr-pdf'",
    "href: '/document-tools/protect-pdf'": "href: '/tools/protect-pdf'",
    "href: '/document-tools/watermark-pdf'": "href: '/tools/watermark-pdf'",
    'href="/document-tools/merge-pdf"': 'href="/tools/merge-pdf"',
}

for old_str, new_str in page_replacements.items():
    page_content = page_content.replace(old_str, new_str)

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(page_content)
print("Updated src/app/page.tsx with canonical /tools/[slug] URLs.")

# 3. Update src/lib/seoKeywords.ts
keywords_path = os.path.join(base_dir, 'src', 'lib', 'seoKeywords.ts')
with open(keywords_path, 'r', encoding='utf-8') as f:
    kw_content = f.read()

# Replace any toolHref: '/something' (except '/' and '/api-hub') with '/tools/something'
kw_replacements = {
    "toolHref: '/json-formatter'": "toolHref: '/tools/json-formatter'",
    "toolHref: '/regex-tester'": "toolHref: '/tools/regex-tester'",
    "toolHref: '/jwt-decoder'": "toolHref: '/tools/jwt-decoder'",
    "toolHref: '/sql-generator'": "toolHref: '/tools/sql-generator'",
    "toolHref: '/gitignore-generator'": "toolHref: '/tools/gitignore-generator'",
    "toolHref: '/base64-encoder-decoder'": "toolHref: '/tools/base64-encoder-decoder'",
    "toolHref: '/uuid-generator'": "toolHref: '/tools/uuid-generator'",
    "toolHref: '/cron-expression-generator'": "toolHref: '/tools/cron-expression-generator'",
    "toolHref: '/vapt-scanner'": "toolHref: '/tools/vapt-scanner'",
    "toolHref: '/ssl-certificate-checker'": "toolHref: '/tools/ssl-certificate-checker'",
    "toolHref: '/dns-lookup'": "toolHref: '/tools/dns-lookup'",
    "toolHref: '/whois-lookup'": "toolHref: '/tools/whois-lookup'",
    "toolHref: '/email-security'": "toolHref: '/tools/email-security'",
    "toolHref: '/password-generator'": "toolHref: '/tools/password-generator'",
    "toolHref: '/password-strength-checker'": "toolHref: '/tools/password-strength-checker'",
    "toolHref: '/resume-ats-checker'": "toolHref: '/tools/resume-ats-checker'",
    "toolHref: '/qr-generator'": "toolHref: '/tools/qr-generator'",
    "toolHref: '/image-compressor'": "toolHref: '/tools/image-compressor'",
    "toolHref: '/gst-calculator'": "toolHref: '/tools/gst-calculator'",
    "toolHref: '/sip-calculator'": "toolHref: '/tools/sip-calculator'",
    "toolHref: '/stock-market'": "toolHref: '/tools/stock-market'",
    "toolHref: '/age-calculator'": "toolHref: '/tools/age-calculator'",
    "toolHref: '/bengali-calendar'": "toolHref: '/tools/bengali-calendar'",
}

for old_str, new_str in kw_replacements.items():
    kw_content = kw_content.replace(old_str, new_str)

kw_content = re.sub(r"toolHref:\s*'/document-tools/([a-z0-9-]+)'", r"toolHref: '/tools/\1'", kw_content)

with open(keywords_path, 'w', encoding='utf-8') as f:
    f.write(kw_content)
print("Updated seoKeywords.ts with canonical /tools/[slug] URLs.")
