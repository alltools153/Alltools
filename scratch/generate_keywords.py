# Python script to generate comprehensive MASTER_SEO_KEYWORDS covering all 55+ tools and APIs

import json

keywords_data = [
    # General Platform
    {"keyword": "alltoolss online free", "toolName": "AllToolss Multi-Tool Suite", "toolHref": "/", "category": "general", "intent": "commercial", "volumeTier": "High", "lang": "en"},
    {"keyword": "alltoolss developer suite", "toolName": "AllToolss Multi-Tool Suite", "toolHref": "/", "category": "general", "intent": "commercial", "volumeTier": "High", "lang": "en"},
    {"keyword": "all tools online free", "toolName": "AllToolss Multi-Tool Suite", "toolHref": "/", "category": "general", "intent": "commercial", "volumeTier": "High", "lang": "en"},
    {"keyword": "multi tool web app nextjs", "toolName": "AllToolss Multi-Tool Suite", "toolHref": "/", "category": "general", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "free online developer utility toolkit", "toolName": "AllToolss Multi-Tool Suite", "toolHref": "/", "category": "general", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "all in one web tools hub", "toolName": "AllToolss Multi-Tool Suite", "toolHref": "/", "category": "general", "intent": "commercial", "volumeTier": "High", "lang": "en"},
    {"keyword": "online utility suite zero tracking", "toolName": "AllToolss Multi-Tool Suite", "toolHref": "/", "category": "general", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "client side private developer utilities", "toolName": "AllToolss Multi-Tool Suite", "toolHref": "/", "category": "general", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "in-server tools privacy first platform", "toolName": "AllToolss Multi-Tool Suite", "toolHref": "/", "category": "general", "intent": "commercial", "volumeTier": "High", "lang": "en"},
    {"keyword": "free online multi-tool suite without ads", "toolName": "AllToolss Multi-Tool Suite", "toolHref": "/", "category": "general", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # Developer Tools: JSON Formatter & Tree
    {"keyword": "json formatter online free", "toolName": "JSON Formatter & Tree", "toolHref": "/json-formatter", "category": "developer", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "json beautifier and validator tree view", "toolName": "JSON Formatter & Tree", "toolHref": "/json-formatter", "category": "developer", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "format json online without server upload", "toolName": "JSON Formatter & Tree", "toolHref": "/json-formatter", "category": "developer", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "json minify and compress online", "toolName": "JSON Formatter & Tree", "toolHref": "/json-formatter", "category": "developer", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "json syntax error validator client side", "toolName": "JSON Formatter & Tree", "toolHref": "/json-formatter", "category": "developer", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "best private json formatter without ads", "toolName": "JSON Formatter & Tree", "toolHref": "/json-formatter", "category": "developer", "intent": "commercial", "volumeTier": "Medium", "lang": "en"},

    # Developer Tools: Regex Tester & VM
    {"keyword": "regex tester online with match explanation", "toolName": "Regex Tester & VM", "toolHref": "/regex-tester", "category": "developer", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "regular expression validator javascript python", "toolName": "Regex Tester & VM", "toolHref": "/regex-tester", "category": "developer", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "regex cheat sheet and capture group inspector", "toolName": "Regex Tester & VM", "toolHref": "/regex-tester", "category": "developer", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "test regex pattern against string online", "toolName": "Regex Tester & VM", "toolHref": "/regex-tester", "category": "developer", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "visual regex tester with flag toggles", "toolName": "Regex Tester & VM", "toolHref": "/regex-tester", "category": "developer", "intent": "informational", "volumeTier": "Medium", "lang": "en"},

    # Developer Tools: JWT Decoder & Inspector
    {"keyword": "jwt decoder online secret check", "toolName": "JWT Decoder & Inspector", "toolHref": "/jwt-decoder", "category": "developer", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "json web token debugger claims inspector", "toolName": "JWT Decoder & Inspector", "toolHref": "/jwt-decoder", "category": "developer", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "decode jwt without sending to server", "toolName": "JWT Decoder & Inspector", "toolHref": "/jwt-decoder", "category": "developer", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "jwt expiration timestamp checker", "toolName": "JWT Decoder & Inspector", "toolHref": "/jwt-decoder", "category": "developer", "intent": "informational", "volumeTier": "Medium", "lang": "en"},
    {"keyword": "view jwt header payload claims online", "toolName": "JWT Decoder & Inspector", "toolHref": "/jwt-decoder", "category": "developer", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # Developer Tools: AI SQL Generator
    {"keyword": "ai sql query generator from text", "toolName": "AI SQL Query Generator", "toolHref": "/sql-generator", "category": "developer", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "convert natural language to sql online", "toolName": "AI SQL Query Generator", "toolHref": "/sql-generator", "category": "developer", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "text to sql postgres mysql sqlite oracle", "toolName": "AI SQL Query Generator", "toolHref": "/sql-generator", "category": "developer", "intent": "commercial", "volumeTier": "High", "lang": "en"},
    {"keyword": "generate complex sql join queries with ai", "toolName": "AI SQL Query Generator", "toolHref": "/sql-generator", "category": "developer", "intent": "informational", "volumeTier": "Medium", "lang": "en"},
    {"keyword": "free ai sql query builder without login", "toolName": "AI SQL Query Generator", "toolHref": "/sql-generator", "category": "developer", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # Developer Tools: Git Ignore Generator
    {"keyword": "gitignore generator online multi-stack", "toolName": "Git Ignore Generator", "toolHref": "/gitignore-generator", "category": "developer", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "generate gitignore for react python node docker", "toolName": "Git Ignore Generator", "toolHref": "/gitignore-generator", "category": "developer", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "combined gitignore generator for vscode terraform", "toolName": "Git Ignore Generator", "toolHref": "/gitignore-generator", "category": "developer", "intent": "informational", "volumeTier": "Medium", "lang": "en"},
    {"keyword": "create custom gitignore template online", "toolName": "Git Ignore Generator", "toolHref": "/gitignore-generator", "category": "developer", "intent": "transactional", "volumeTier": "Medium", "lang": "en"},

    # Developer Tools: Base64 Encoder / Decoder
    {"keyword": "base64 encoder decoder online", "toolName": "Base64 Encoder / Decoder", "toolHref": "/base64-encoder-decoder", "category": "developer", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "encode string to base64 online free", "toolName": "Base64 Encoder / Decoder", "toolHref": "/base64-encoder-decoder", "category": "developer", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "decode base64 to text or binary", "toolName": "Base64 Encoder / Decoder", "toolHref": "/base64-encoder-decoder", "category": "developer", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "base64 image encoder data uri generator", "toolName": "Base64 Encoder / Decoder", "toolHref": "/base64-encoder-decoder", "category": "developer", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "url safe base64 decode online", "toolName": "Base64 Encoder / Decoder", "toolHref": "/base64-encoder-decoder", "category": "developer", "intent": "transactional", "volumeTier": "Medium", "lang": "en"},

    # Developer Tools: UUID v4 Generator
    {"keyword": "uuid v4 generator online bulk", "toolName": "UUID v4 Generator", "toolHref": "/uuid-generator", "category": "developer", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "generate random uuid v4 without hyphens", "toolName": "UUID v4 Generator", "toolHref": "/uuid-generator", "category": "developer", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "guid generator online free rfc compliant", "toolName": "UUID v4 Generator", "toolHref": "/uuid-generator", "category": "developer", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "bulk uuid generator uppercase lowercase", "toolName": "UUID v4 Generator", "toolHref": "/uuid-generator", "category": "developer", "intent": "transactional", "volumeTier": "Medium", "lang": "en"},

    # Developer Tools: Cron Expression Generator
    {"keyword": "cron expression generator and descriptor", "toolName": "Cron Expression Generator", "toolHref": "/cron-expression-generator", "category": "developer", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "crontab guru schedule visual builder", "toolName": "Cron Expression Generator", "toolHref": "/cron-expression-generator", "category": "developer", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "human readable cron expression generator", "toolName": "Cron Expression Generator", "toolHref": "/cron-expression-generator", "category": "developer", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "cron schedule helper next execution times", "toolName": "Cron Expression Generator", "toolHref": "/cron-expression-generator", "category": "developer", "intent": "informational", "volumeTier": "Medium", "lang": "en"},

    # Developer Tools: Developer Micro-Suite Hub
    {"keyword": "developer tools hub workspace online", "toolName": "Developer Micro-Suite Hub", "toolHref": "/dev-tools", "category": "developer", "intent": "commercial", "volumeTier": "High", "lang": "en"},
    {"keyword": "all developer utilities in one tab", "toolName": "Developer Micro-Suite Hub", "toolHref": "/dev-tools", "category": "developer", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # Security Tools: Website VAPT Scanner
    {"keyword": "website vapt scanner online free", "toolName": "Website VAPT Security Scanner", "toolHref": "/vapt-scanner", "category": "security", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "free web application vulnerability scanner", "toolName": "Website VAPT Security Scanner", "toolHref": "/vapt-scanner", "category": "security", "intent": "commercial", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "http security headers checker hsts csp x-frame-options", "toolName": "Website VAPT Security Scanner", "toolHref": "/vapt-scanner", "category": "security", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "owasp api top 10 2023 checklist and audit tool", "toolName": "Website VAPT Security Scanner", "toolHref": "/vapt-scanner", "category": "security", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "passive website penetration testing audit tool", "toolName": "Website VAPT Security Scanner", "toolHref": "/vapt-scanner", "category": "security", "intent": "commercial", "volumeTier": "High", "lang": "en"},
    {"keyword": "check cookie httponly secure samesite flags", "toolName": "Website VAPT Security Scanner", "toolHref": "/vapt-scanner", "category": "security", "intent": "informational", "volumeTier": "Medium", "lang": "en"},

    # Security Tools: N-Map Port & Socket Scanner
    {"keyword": "online nmap port scanner check open ports", "toolName": "N-Map Port & Socket Scanner", "toolHref": "/vapt-scanner", "category": "security", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "scan website standard ports online free", "toolName": "N-Map Port & Socket Scanner", "toolHref": "/vapt-scanner", "category": "security", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "port 80 443 8080 open port checker", "toolName": "N-Map Port & Socket Scanner", "toolHref": "/vapt-scanner", "category": "security", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "network socket port scanner non intrusive", "toolName": "N-Map Port & Socket Scanner", "toolHref": "/vapt-scanner", "category": "security", "intent": "informational", "volumeTier": "Medium", "lang": "en"},

    # Security Tools: SSL Certificate Checker
    {"keyword": "ssl certificate checker online expiration date", "toolName": "SSL Certificate Checker", "toolHref": "/ssl-certificate-checker", "category": "security", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "tls cipher suite inspector and grade check", "toolName": "SSL Certificate Checker", "toolHref": "/ssl-certificate-checker", "category": "security", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "check ssl certificate validity and san domains", "toolName": "SSL Certificate Checker", "toolHref": "/ssl-certificate-checker", "category": "security", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "ssl expiry countdown alert checker", "toolName": "SSL Certificate Checker", "toolHref": "/ssl-certificate-checker", "category": "security", "intent": "informational", "volumeTier": "Medium", "lang": "en"},

    # Security Tools: DNS Records Lookup
    {"keyword": "dns lookup online query a mx txt aaaa ns cname", "toolName": "DNS Records Lookup", "toolHref": "/dns-lookup", "category": "security", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "check dns records and propagation status", "toolName": "DNS Records Lookup", "toolHref": "/dns-lookup", "category": "security", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "dnssec verification and soa lookup tool", "toolName": "DNS Records Lookup", "toolHref": "/dns-lookup", "category": "security", "intent": "informational", "volumeTier": "Medium", "lang": "en"},
    {"keyword": "query reverse dns ptr record online", "toolName": "DNS Records Lookup", "toolHref": "/dns-lookup", "category": "security", "intent": "transactional", "volumeTier": "Medium", "lang": "en"},

    # Security Tools: WHOIS / RDAP Lookup
    {"keyword": "whois lookup domain registrar expiration dates", "toolName": "WHOIS / RDAP Domain Lookup", "toolHref": "/whois-lookup", "category": "security", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "rdap domain search query nameservers", "toolName": "WHOIS / RDAP Domain Lookup", "toolHref": "/whois-lookup", "category": "security", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "check domain availability and registration status", "toolName": "WHOIS / RDAP Domain Lookup", "toolHref": "/whois-lookup", "category": "security", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "domain owner and creation date finder", "toolName": "WHOIS / RDAP Domain Lookup", "toolHref": "/whois-lookup", "category": "security", "intent": "informational", "volumeTier": "Medium", "lang": "en"},

    # Security Tools: SPF / DKIM / DMARC Email Security
    {"keyword": "spf dkim dmarc checker email security audit", "toolName": "SPF / DKIM / DMARC Checker", "toolHref": "/email-security", "category": "security", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "check domain email deliverability authentication", "toolName": "SPF / DKIM / DMARC Checker", "toolHref": "/email-security", "category": "security", "intent": "commercial", "volumeTier": "High", "lang": "en"},
    {"keyword": "dmarc policy validator p=reject p=none", "toolName": "SPF / DKIM / DMARC Checker", "toolHref": "/email-security", "category": "security", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "verify spf record syntax online free", "toolName": "SPF / DKIM / DMARC Checker", "toolHref": "/email-security", "category": "security", "intent": "transactional", "volumeTier": "Medium", "lang": "en"},

    # Security Tools: Password Generator
    {"keyword": "secure password generator random strong entropy", "toolName": "Secure Password Generator", "toolHref": "/password-generator", "category": "security", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "generate passwords with symbols numbers client side", "toolName": "Secure Password Generator", "toolHref": "/password-generator", "category": "security", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "random memorable passphrase generator online", "toolName": "Secure Password Generator", "toolHref": "/password-generator", "category": "security", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # Security Tools: Password Strength & Entropy
    {"keyword": "password strength and shannon entropy score", "toolName": "Password Strength & Entropy Checker", "toolHref": "/password-strength-checker", "category": "security", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "how strong is my password check entropy bits", "toolName": "Password Strength & Entropy Checker", "toolHref": "/password-strength-checker", "category": "security", "intent": "informational", "volumeTier": "Medium", "lang": "en"},
    {"keyword": "estimate password brute force crack time", "toolName": "Password Strength & Entropy Checker", "toolHref": "/password-strength-checker", "category": "security", "intent": "informational", "volumeTier": "High", "lang": "en"},

    # Career & Utility: Resume ATS Checker
    {"keyword": "resume ats checker free score and review", "toolName": "Resume ATS Compatibility Checker", "toolHref": "/resume-ats-checker", "category": "utility", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "ats resume compatibility scanner online", "toolName": "Resume ATS Compatibility Checker", "toolHref": "/resume-ats-checker", "category": "utility", "intent": "commercial", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "check resume against applicant tracking system", "toolName": "Resume ATS Compatibility Checker", "toolHref": "/resume-ats-checker", "category": "utility", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "ats friendly resume keywords match percentage", "toolName": "Resume ATS Compatibility Checker", "toolHref": "/resume-ats-checker", "category": "utility", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "free ats resume parser with formatting feedback", "toolName": "Resume ATS Compatibility Checker", "toolHref": "/resume-ats-checker", "category": "utility", "intent": "commercial", "volumeTier": "High", "lang": "en"},

    # Career & Utility: QR Code Generator
    {"keyword": "qr code generator custom color and logo", "toolName": "QR Code Generator Studio", "toolHref": "/qr-generator", "category": "utility", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "free qr code maker for url wifi vcard", "toolName": "QR Code Generator Studio", "toolHref": "/qr-generator", "category": "utility", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "create vector svg png qr code online", "toolName": "QR Code Generator Studio", "toolHref": "/qr-generator", "category": "utility", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "high resolution qr code generator without expiration", "toolName": "QR Code Generator Studio", "toolHref": "/qr-generator", "category": "utility", "intent": "commercial", "volumeTier": "High", "lang": "en"},

    # Career & Utility: Image Compressor
    {"keyword": "compress image online reduce kb without quality loss", "toolName": "Image Compressor Studio", "toolHref": "/image-compressor", "category": "utility", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "jpeg png webp image compressor in browser memory", "toolName": "Image Compressor Studio", "toolHref": "/image-compressor", "category": "utility", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "bulk image size reducer client side", "toolName": "Image Compressor Studio", "toolHref": "/image-compressor", "category": "utility", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "compress photo to 50kb 100kb 200kb online", "toolName": "Image Compressor Studio", "toolHref": "/image-compressor", "category": "utility", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},

    # Finance: GST Calculator
    {"keyword": "gst calculator online india cgst sgst igst", "toolName": "GST Tax Calculator", "toolHref": "/gst-calculator", "category": "finance", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "calculate gst inclusive and exclusive amount", "toolName": "GST Tax Calculator", "toolHref": "/gst-calculator", "category": "finance", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "gst tax calculation formula reverse gst calculator", "toolName": "GST Tax Calculator", "toolHref": "/gst-calculator", "category": "finance", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "gst rates 5 12 18 28 percentage slab calculator", "toolName": "GST Tax Calculator", "toolHref": "/gst-calculator", "category": "finance", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # Finance: SIP Calculator
    {"keyword": "sip calculator mutual fund expected returns", "toolName": "SIP Wealth Calculator", "toolHref": "/sip-calculator", "category": "finance", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "systematic investment plan growth calculator monthly", "toolName": "SIP Wealth Calculator", "toolHref": "/sip-calculator", "category": "finance", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "sip calculator with inflation adjustment", "toolName": "SIP Wealth Calculator", "toolHref": "/sip-calculator", "category": "finance", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "lumpsum investment compounding return calculator", "toolName": "SIP Wealth Calculator", "toolHref": "/sip-calculator", "category": "finance", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "sip vs lumpsum returns comparison chart", "toolName": "SIP Wealth Calculator", "toolHref": "/sip-calculator", "category": "finance", "intent": "informational", "volumeTier": "Medium", "lang": "en"},

    # Finance: Indian Stock Market Live Updates
    {"keyword": "sensex and nifty 50 live stock market updates", "toolName": "Indian Stock Market Live Updates", "toolHref": "/stock-market", "category": "finance", "intent": "informational", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "indian stock market indices real time feed", "toolName": "Indian Stock Market Live Updates", "toolHref": "/stock-market", "category": "finance", "intent": "informational", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "live bse sensex nse nifty percentage change", "toolName": "Indian Stock Market Live Updates", "toolHref": "/stock-market", "category": "finance", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "track indian stock market live ticker online", "toolName": "Indian Stock Market Live Updates", "toolHref": "/stock-market", "category": "finance", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # Cultural & Age: Age Calculator & Cosmic Bio
    {"keyword": "age calculator online free exact years months days", "toolName": "Age Milestone & Planetary Calculator", "toolHref": "/age-calculator", "category": "age", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "calculate exact age in years months days seconds", "toolName": "Age Milestone & Planetary Calculator", "toolHref": "/age-calculator", "category": "age", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "chronological age calculator with live ticker", "toolName": "Age Milestone & Planetary Calculator", "toolHref": "/age-calculator", "category": "age", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "date of birth to age calculator", "toolName": "Age Milestone & Planetary Calculator", "toolHref": "/age-calculator", "category": "age", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "how old am i today exact calculation", "toolName": "Age Milestone & Planetary Calculator", "toolHref": "/age-calculator", "category": "age", "intent": "informational", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "planetary age calculator calculate age on mars jupiter", "toolName": "Age Milestone & Planetary Calculator", "toolHref": "/age-calculator", "category": "age", "intent": "informational", "volumeTier": "Medium", "lang": "en"},
    {"keyword": "biological life milestone calculator heartbeats breaths", "toolName": "Age Milestone & Planetary Calculator", "toolHref": "/age-calculator", "category": "age", "intent": "informational", "volumeTier": "Medium", "lang": "en"},
    {"keyword": "chinese zodiac animal and lunar element by birthday", "toolName": "Age Milestone & Planetary Calculator", "toolHref": "/age-calculator", "category": "age", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "date difference working days calculator", "toolName": "Age Milestone & Planetary Calculator", "toolHref": "/age-calculator", "category": "age", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # Cultural & Regional: Bengali Calendar & Panjika
    {"keyword": "bengali calendar 1431 1432 1433", "toolName": "বাংলা পঞ্জিকা ও ক্যালেন্ডার", "toolHref": "/bengali-calendar", "category": "bengali", "intent": "informational", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "বাংলা ক্যালেন্ডার ১৪৩১ ১৪৩২ ১৪৩৩", "toolName": "বাংলা পঞ্জিকা ও ক্যালেন্ডার", "toolHref": "/bengali-calendar", "category": "bengali", "intent": "informational", "volumeTier": "Very High", "lang": "bn"},
    {"keyword": "bengali panjika today with tithi and nakshatra", "toolName": "বাংলা পঞ্জিকা ও ক্যালেন্ডার", "toolHref": "/bengali-calendar", "category": "bengali", "intent": "informational", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "আজকের বাংলা পঞ্জিকা তিথি ও নক্ষত্র", "toolName": "বাংলা পঞ্জিকা ও ক্যালেন্ডার", "toolHref": "/bengali-calendar", "category": "bengali", "intent": "informational", "volumeTier": "Very High", "lang": "bn"},
    {"keyword": "english to bengali date converter online", "toolName": "বাংলা পঞ্জিকা ও ক্যালেন্ডার", "toolHref": "/bengali-calendar", "category": "bengali", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "ইংরেজি থেকে বাংলা তারিখ রূপান্তর", "toolName": "বাংলা পঞ্জিকা ও ক্যালেন্ডার", "toolHref": "/bengali-calendar", "category": "bengali", "intent": "transactional", "volumeTier": "Very High", "lang": "bn"},
    {"keyword": "durga puja calendar dates schedule 2025 2026", "toolName": "বাংলা পঞ্জিকা ও ক্যালেন্ডার", "toolHref": "/bengali-calendar", "category": "bengali", "intent": "informational", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "দুর্গাপূজা ক্যালেন্ডার ও নির্ঘণ্ট সময়সূচী", "toolName": "বাংলা পঞ্জিকা ও ক্যালেন্ডার", "toolHref": "/bengali-calendar", "category": "bengali", "intent": "informational", "volumeTier": "Very High", "lang": "bn"},
    {"keyword": "bengali marriage auspicious dates subho bibaho lagna", "toolName": "বাংলা পঞ্জিকা ও ক্যালেন্ডার", "toolHref": "/bengali-calendar", "category": "bengali", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "amrita yoga mahendra yoga rahu kalam today", "toolName": "বাংলা পঞ্জিকা ও ক্যালেন্ডার", "toolHref": "/bengali-calendar", "category": "bengali", "intent": "informational", "volumeTier": "High", "lang": "en"},

    # PDF STUDIO: ALL 31 PDF TOOLS
    # 1. Hub
    {"keyword": "pdf studio online free tools suite", "toolName": "PDF Studio (25+ Tools)", "toolHref": "/document-tools", "category": "pdf", "intent": "commercial", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "free online pdf tools without upload limits", "toolName": "PDF Studio (25+ Tools)", "toolHref": "/document-tools", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},

    # 2. JPG to PDF
    {"keyword": "jpg to pdf converter online free", "toolName": "JPG to PDF", "toolHref": "/document-tools/jpg-to-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "convert multiple jpg images to single pdf", "toolName": "JPG to PDF", "toolHref": "/document-tools/jpg-to-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # 3. PNG to PDF
    {"keyword": "png to pdf converter online", "toolName": "PNG to PDF", "toolHref": "/document-tools/png-to-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "convert transparent png to pdf document", "toolName": "PNG to PDF", "toolHref": "/document-tools/png-to-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # 4. Word to PDF
    {"keyword": "word to pdf converter online docx", "toolName": "Word to PDF", "toolHref": "/document-tools/word-to-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "convert docx to pdf free without formatting loss", "toolName": "Word to PDF", "toolHref": "/document-tools/word-to-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # 5. Excel to PDF
    {"keyword": "excel to pdf converter online xlsx", "toolName": "Excel to PDF", "toolHref": "/document-tools/excel-to-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "convert excel spreadsheet to print ready pdf", "toolName": "Excel to PDF", "toolHref": "/document-tools/excel-to-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # 6. PowerPoint to PDF
    {"keyword": "powerpoint to pdf converter pptx online", "toolName": "PowerPoint to PDF", "toolHref": "/document-tools/powerpoint-to-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "convert ppt slides to pdf presentation", "toolName": "PowerPoint to PDF", "toolHref": "/document-tools/powerpoint-to-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # 7. TXT to PDF
    {"keyword": "txt to pdf converter online free", "toolName": "TXT to PDF", "toolHref": "/document-tools/txt-to-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "convert text notes file to paginated pdf", "toolName": "TXT to PDF", "toolHref": "/document-tools/txt-to-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "Medium", "lang": "en"},

    # 8. HTML to PDF
    {"keyword": "html to pdf converter render webpage online", "toolName": "HTML to PDF", "toolHref": "/document-tools/html-to-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "convert html with css to pdf document", "toolName": "HTML to PDF", "toolHref": "/document-tools/html-to-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # 9. PDF to Word
    {"keyword": "pdf to word converter online editable docx", "toolName": "PDF to Word", "toolHref": "/document-tools/pdf-to-word", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "convert pdf to docx without losing formatting", "toolName": "PDF to Word", "toolHref": "/document-tools/pdf-to-word", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},

    # 10. PDF to Excel
    {"keyword": "pdf to excel converter online extract tables", "toolName": "PDF to Excel", "toolHref": "/document-tools/pdf-to-excel", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "extract tabular data from pdf to xlsx spreadsheet", "toolName": "PDF to Excel", "toolHref": "/document-tools/pdf-to-excel", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # 11. PDF to PowerPoint
    {"keyword": "pdf to powerpoint converter pptx slides online", "toolName": "PDF to PowerPoint", "toolHref": "/document-tools/pdf-to-powerpoint", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # 12. PDF to JPG
    {"keyword": "pdf to jpg converter high resolution online", "toolName": "PDF to JPG", "toolHref": "/document-tools/pdf-to-jpg", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "extract pages from pdf as jpg images", "toolName": "PDF to JPG", "toolHref": "/document-tools/pdf-to-jpg", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # 13. PDF to PNG
    {"keyword": "pdf to png converter extract images online", "toolName": "PDF to PNG", "toolHref": "/document-tools/pdf-to-png", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},

    # 14. PDF to Text
    {"keyword": "pdf to text converter extract plain txt", "toolName": "PDF to Text", "toolHref": "/document-tools/pdf-to-text", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # 15. Merge PDF
    {"keyword": "merge pdf online free without file upload", "toolName": "Merge PDF", "toolHref": "/document-tools/merge-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "combine multiple pdfs into one document", "toolName": "Merge PDF", "toolHref": "/document-tools/merge-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},

    # 16. Split PDF
    {"keyword": "split pdf pages into separate files online", "toolName": "Split PDF", "toolHref": "/document-tools/split-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "divide pdf by custom page ranges", "toolName": "Split PDF", "toolHref": "/document-tools/split-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # 17. Delete Pages
    {"keyword": "delete pages from pdf online free", "toolName": "Delete Pages", "toolHref": "/document-tools/delete-pages", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "remove unwanted pages from pdf document", "toolName": "Delete Pages", "toolHref": "/document-tools/delete-pages", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # 18. Extract Pages
    {"keyword": "extract pages from pdf create new document", "toolName": "Extract Pages", "toolHref": "/document-tools/extract-pages", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # 19. Reorder Pages
    {"keyword": "reorder pdf pages rearrange page order online", "toolName": "Reorder Pages", "toolHref": "/document-tools/reorder-pages", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # 20. Rotate PDF
    {"keyword": "rotate pdf pages 90 180 degrees permanently", "toolName": "Rotate PDF", "toolHref": "/document-tools/rotate-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},

    # 21. Compress PDF
    {"keyword": "compress pdf reduce file size online memory", "toolName": "Compress PDF", "toolHref": "/document-tools/compress-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "shrink pdf to 100kb 200kb 500kb online free", "toolName": "Compress PDF", "toolHref": "/document-tools/compress-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},

    # 22. Repair PDF
    {"keyword": "repair corrupted pdf file recover pages", "toolName": "Repair PDF", "toolHref": "/document-tools/repair-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # 23. Flatten PDF
    {"keyword": "flatten pdf form fields and interactive annotations", "toolName": "Flatten PDF", "toolHref": "/document-tools/flatten-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "Medium", "lang": "en"},

    # 24. Watermark PDF
    {"keyword": "add watermark to pdf document text image stamp", "toolName": "Watermark PDF", "toolHref": "/document-tools/watermark-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # 25. Add Page Numbers
    {"keyword": "add page numbers to pdf header footer custom format", "toolName": "Add Page Numbers", "toolHref": "/document-tools/add-page-numbers", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # 26. Crop PDF
    {"keyword": "crop pdf margins trim whitespace online", "toolName": "Crop PDF", "toolHref": "/document-tools/crop-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # 27. Protect PDF
    {"keyword": "password protect pdf encrypt aes 256", "toolName": "Protect PDF", "toolHref": "/document-tools/protect-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},

    # 28. Unlock PDF
    {"keyword": "unlock pdf remove password and permissions", "toolName": "Unlock PDF", "toolHref": "/document-tools/unlock-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},

    # 29. Remove Metadata
    {"keyword": "remove metadata from pdf sanitize document properties", "toolName": "Remove Metadata", "toolHref": "/document-tools/remove-metadata", "category": "pdf", "intent": "transactional", "volumeTier": "Medium", "lang": "en"},

    # 30. OCR PDF
    {"keyword": "ocr pdf scan extract searchable text online", "toolName": "OCR PDF", "toolHref": "/document-tools/ocr-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "make scanned pdf searchable optical character recognition", "toolName": "OCR PDF", "toolHref": "/document-tools/ocr-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # 31. Image to Text
    {"keyword": "image to text ocr extract text from photo", "toolName": "Image to Text", "toolHref": "/document-tools/image-to-text", "category": "pdf", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},

    # 32. Scan to PDF
    {"keyword": "scan to pdf turn camera photos into searchable pdf", "toolName": "Scan to PDF", "toolHref": "/document-tools/scan-to-pdf", "category": "pdf", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # REST APIs & Developer Endpoints
    {"keyword": "vapt security scan rest api endpoint free", "toolName": "VAPT Scan API", "toolHref": "/api-hub", "category": "api", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "age milestone calculation rest api json", "toolName": "Age Calculation API", "toolHref": "/api-hub", "category": "api", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "bengali panjika api tithi nakshatra json", "toolName": "Bengali Panjika API", "toolHref": "/api-hub", "category": "api", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "pdf conversion api free rest endpoint", "toolName": "Document Conversion API", "toolHref": "/api-hub", "category": "api", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "ocr text extraction rest api developer api", "toolName": "OCR Extraction API", "toolHref": "/api-hub", "category": "api", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "alltools swagger openapi documentation endpoint", "toolName": "API Hub & Swagger Docs", "toolHref": "/api-hub", "category": "api", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "fastapi microservices endpoints for web utilities", "toolName": "API Hub & Swagger Docs", "toolHref": "/api-hub", "category": "api", "intent": "informational", "volumeTier": "Medium", "lang": "en"},
    {"keyword": "network diagnostic api ssl whois dns endpoints", "toolName": "API Hub & Swagger Docs", "toolHref": "/api-hub", "category": "api", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "free rest api for date conversion and panjika", "toolName": "Bengali Panjika API", "toolHref": "/api-hub", "category": "api", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "post vapt scan json api developer integration", "toolName": "VAPT Scan API", "toolHref": "/api-hub", "category": "api", "intent": "transactional", "volumeTier": "Medium", "lang": "en"},
    {"keyword": "python fastapi backend endpoints swagger redoc", "toolName": "API Hub & Swagger Docs", "toolHref": "/api-hub", "category": "api", "intent": "informational", "volumeTier": "Medium", "lang": "en"},
    {"keyword": "automated website security audit webhook api", "toolName": "VAPT Scan API", "toolHref": "/api-hub", "category": "api", "intent": "transactional", "volumeTier": "Medium", "lang": "en"}
]

print(f"Generated {len(keywords_data)} keywords across all tools.")
