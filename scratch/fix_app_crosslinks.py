import os

app_dir = 'src/app'

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

count = 0
for root, _, files in os.walk(app_dir):
    for fname in files:
        if fname.endswith('.tsx') or fname.endswith('.ts'):
            fpath = os.path.join(root, fname)
            with open(fpath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            orig = content
            for old_v, new_v in replacements:
                content = content.replace(old_v, new_v)
            
            if content != orig:
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated cross-links in {fpath}")
                count += 1

print(f"Finished updating {count} files in src/app/")
