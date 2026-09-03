import os
import re

tools = [
    'age-calculator', 'vapt-scanner', 'bengali-calendar', 'resume-ats-checker',
    'qr-generator', 'image-compressor', 'gst-calculator', 'sip-calculator',
    'stock-market', 'sql-generator', 'gitignore-generator', 'base64-encoder-decoder',
    'uuid-generator', 'cron-expression-generator', 'ssl-certificate-checker',
    'dns-lookup', 'whois-lookup', 'email-security', 'password-generator', 'password-strength-checker'
]

for t in tools:
    p = os.path.join('src', 'app', t, 'page.tsx')
    if os.path.exists(p):
        with open(p, encoding='utf-8') as f:
            c = f.read()
            m = re.search(r'export default function\s+([A-Za-z0-9_]+)', c)
            print(f'{t} -> {m.group(1) if m else "anonymous"}')
    else:
        print(f'{t} -> File does not exist')
