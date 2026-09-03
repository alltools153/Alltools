import os

files = ['src/components/Navbar.tsx', 'src/components/Footer.tsx']

replacements = [
    ('href="/regex-tester"', 'href="/tools/regex-tester"'),
    ('href="/json-formatter"', 'href="/tools/json-formatter"'),
    ('href="/jwt-decoder"', 'href="/tools/jwt-decoder"'),
    ('href="/sql-generator"', 'href="/tools/sql-generator"'),
    ('href="/vapt-scanner"', 'href="/tools/vapt-scanner"'),
    ('href="/bengali-calendar"', 'href="/tools/bengali-calendar"'),
    ('href="/age-calculator"', 'href="/tools/age-calculator"'),
    ('href="/stock-market"', 'href="/tools/stock-market"'),
    ('href="/gst-calculator"', 'href="/tools/gst-calculator"'),
    ('href="/sip-calculator"', 'href="/tools/sip-calculator"'),
    ('href="/resume-ats-checker"', 'href="/tools/resume-ats-checker"'),
    ('href="/qr-generator"', 'href="/tools/qr-generator"'),
    ('href="/image-compressor"', 'href="/tools/image-compressor"'),
    ('href="/base64-encoder-decoder"', 'href="/tools/base64-encoder-decoder"'),
    ('href="/uuid-generator"', 'href="/tools/uuid-generator"'),
    ('href="/cron-expression-generator"', 'href="/tools/cron-expression-generator"'),
    ('href="/ssl-certificate-checker"', 'href="/tools/ssl-certificate-checker"'),
    ('href="/dns-lookup"', 'href="/tools/dns-lookup"'),
    ('href="/whois-lookup"', 'href="/tools/whois-lookup"'),
    ('href="/email-security"', 'href="/tools/email-security"'),
    ('href="/password-generator"', 'href="/tools/password-generator"'),
    ('href="/password-strength-checker"', 'href="/tools/password-strength-checker"'),
]

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    count = 0
    for old_val, new_val in replacements:
        c = content.count(old_val)
        if c > 0:
            content = content.replace(old_val, new_val)
            count += c
            
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated {count} links in {fpath}")
