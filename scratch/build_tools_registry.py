# Python script to build src/lib/tools-registry.ts
import os
import json

out_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src', 'lib', 'tools-registry.ts'))

# We define each tool accurately
tools = [
    # Developer
    {
        "slug": "json-formatter",
        "name": "JSON Formatter & Validator",
        "h1": "Online JSON Formatter, Beautifier & Tree Viewer",
        "category": "developer",
        "title": "JSON Formatter & Validator Online – Beautify, Minify & Inspect JSON",
        "description": "Free online JSON Formatter and Validator. Beautify, parse, minify, and inspect JSON in real time with interactive tree view and zero server transmission.",
        "keywords": ["json formatter", "json beautifier", "json validator", "online json parser", "minify json", "json tree viewer"],
        "howItWorks": [
            "Paste or upload your raw JSON string into the input editor.",
            "Choose formatting options (2-space, 4-space indentation, or minify).",
            "Review real-time syntax error markers if your JSON syntax is invalid.",
            "Explore the interactive object tree view and copy or download the formatted output."
        ],
        "faq": [
            {"question": "Is my JSON data sent to any remote server?", "answer": "No. All formatting, parsing, and tree visualization execute 100% locally in your web browser via client-side JavaScript."},
            {"question": "Can this tool fix invalid JSON syntax?", "answer": "The validator highlights the exact line and character where parsing failed (such as missing closing brackets or trailing commas) so you can fix errors quickly."},
            {"question": "What is the difference between beautify and minify?", "answer": "Beautifying adds indentation and line breaks for human readability, whereas minifying removes all unnecessary whitespace to minimize payload size."}
        ]
    },
    {
        "slug": "regex-tester",
        "name": "Regex Tester & VM",
        "h1": "Regex Tester, Debugger & Visual Cheat Sheet",
        "category": "developer",
        "title": "Regex Tester & Debugger Online – Real-Time Regular Expression Validator",
        "description": "Test and debug regular expressions online with real-time match highlighting, flag toggles, capture group tables, and an interactive regex cheat sheet.",
        "keywords": ["regex tester", "regex debugger", "regular expression tester", "regex online validator", "test regex javascript python"],
        "howItWorks": [
            "Enter your regular expression pattern in the pattern input bar.",
            "Toggle regex flags such as Global (g), Case-Insensitive (i), and Multiline (m).",
            "Type or paste your test text in the test string area.",
            "Inspect highlighted match results, capture group indices, and replacement output."
        ],
        "faq": [
            {"question": "Which regex flavors are supported?", "answer": "The tester supports ECMAScript (JavaScript), Python re, PCRE, Golang, and Java compatible regular expressions."},
            {"question": "How do I match an email address with regex?", "answer": "A standard robust pattern is ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$ which validates username, domain, and TLD."},
            {"question": "Does this tool work completely offline in browser?", "answer": "Yes, regular expression evaluation is performed in-browser using your local JavaScript engine."}
        ]
    },
    {
        "slug": "jwt-decoder",
        "name": "JWT Decoder & Inspector",
        "h1": "Fast & Private JWT Token Decoder & Claims Inspector",
        "category": "developer",
        "title": "JWT Decoder Online – Inspect Header, Payload & Signature Privately",
        "description": "Decode JSON Web Tokens (JWT) instantly online. Inspect header, payload claims, expiration timestamp, and token structure with zero server network calls.",
        "keywords": ["jwt decoder", "decode jwt token", "jwt inspector", "json web token claims", "jwt expiration check"],
        "howItWorks": [
            "Paste an encoded JWT string (Header.Payload.Signature) into the token input box.",
            "View color-coded segmentation separating Header, Payload, and Signature components.",
            "Inspect decoded JSON claims including issuer (iss), subject (sub), and expiration (exp).",
            "Verify live token validity and expiration countdown timer."
        ],
        "faq": [
            {"question": "Can I decode a JWT without knowing the secret key?", "answer": "Yes. The Header and Payload of a JWT are Base64Url-encoded, so anyone can inspect the claims without needing the private signing secret."},
            {"question": "Is it safe to decode production JWTs here?", "answer": "Yes. Decoding runs entirely on your local machine using client-side Web APIs with zero network requests."},
            {"question": "What does the 'exp' claim represent?", "answer": "The 'exp' (Expiration Time) claim specifies the Unix timestamp after which the JWT is considered invalid and must be rejected."}
        ]
    },
    {
        "slug": "sql-generator",
        "name": "AI SQL Query Generator",
        "h1": "AI SQL Query Generator (Text to SQL in Seconds)",
        "category": "developer",
        "title": "AI SQL Query Generator – Convert Natural Language to SQL Online",
        "description": "Generate clean, optimized SQL queries from plain English text prompts using AI. Supports MySQL, PostgreSQL, SQLite, SQL Server, and Oracle.",
        "keywords": ["ai sql generator", "text to sql", "convert text to sql online", "natural language sql generator", "postgres query generator"],
        "howItWorks": [
            "Type a natural language prompt describing the query you need.",
            "Select your target SQL dialect (PostgreSQL, MySQL, SQLite, SQL Server, or Oracle).",
            "Click Generate to receive formatted SQL queries with clause explanations.",
            "Copy the query or export it directly into your database client."
        ],
        "faq": [
            {"question": "Which SQL database dialects are supported?", "answer": "Full support for PostgreSQL, MySQL, SQLite, Microsoft SQL Server, Snowflake, and Oracle SQL."},
            {"question": "Can the AI generate complex JOIN queries?", "answer": "Yes, specify table names and relations in plain English, and the engine generates appropriate INNER, LEFT, or RIGHT JOINs with GROUP BY aggregations."},
            {"question": "Is login or an API key required?", "answer": "No, you can generate queries immediately in the browser without signups or API configuration."}
        ]
    },
    {
        "slug": "gitignore-generator",
        "name": "Git Ignore Generator",
        "h1": "Custom .gitignore Generator & Multi-Stack Templates",
        "category": "developer",
        "title": ".gitignore Generator – Create Custom .gitignore Files for Any Stack",
        "description": "Generate comprehensive .gitignore templates for Node.js, Python, React, Java, Docker, Terraform, Kubernetes, VS Code, and 200+ technologies.",
        "keywords": ["gitignore generator", "git ignore file builder", "create gitignore online", "gitignore template node python", "vscode gitignore"],
        "howItWorks": [
            "Search and select technologies, frameworks, and operating systems from the directory.",
            "The generator merges matching ignore patterns and comments into a unified template.",
            "Review generated sections covering build outputs, secrets, and IDE artifacts.",
            "Copy to clipboard or download the raw .gitignore file into your repository."
        ],
        "faq": [
            {"question": "Can I combine multiple languages in one .gitignore?", "answer": "Yes, select tags such as Python, Node.js, and macOS to combine all rules cleanly without conflicts."},
            {"question": "What files should never be committed to Git?", "answer": "Environment files (.env), credential files, OS caches (.DS_Store, Thumbs.db), and dependency folders (node_modules, venv)."},
            {"question": "How do I apply the .gitignore in an existing project?", "answer": "Save the file as .gitignore in the root folder of your Git repository and run 'git rm -r --cached .' if tracked files need to be ignored."}
        ]
    },
    {
        "slug": "base64-encoder-decoder",
        "name": "Base64 Encoder & Decoder",
        "h1": "Base64 Encoder & Decoder Online (Text, URL & File)",
        "category": "developer",
        "title": "Base64 Encoder & Decoder – Convert Text, Files & Data URIs Online",
        "description": "Encode text, binary files, and images to Base64 or decode Base64 strings back to plain text. Full support for UTF-8 and URL-safe Base64 standards.",
        "keywords": ["base64 encoder", "base64 decoder", "base64 converter online", "string to base64", "base64 image data uri"],
        "howItWorks": [
            "Select Encode or Decode mode depending on your workflow.",
            "Paste your text or upload a binary file/image into the input field.",
            "Toggle URL-Safe mode if using Base64 strings in web query parameters.",
            "Copy the resulting Base64 string or download the decoded binary file."
        ],
        "faq": [
            {"question": "What is Base64 encoding?", "answer": "Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format using 64 printable characters."},
            {"question": "What is URL-Safe Base64?", "answer": "URL-safe Base64 replaces the '+' and '/' characters with '-' and '_' so the string can be transmitted safely in URL parameters without percent-encoding."},
            {"question": "Can I generate Base64 Data URIs for images?", "answer": "Yes, drop an image to generate an instant 'data:image/png;base64,...' URI ready for HTML and CSS embedding."}
        ]
    },
    {
        "slug": "uuid-generator",
        "name": "UUID & GUID Generator",
        "h1": "Online UUID v4 Generator & Bulk GUID Synthesizer",
        "category": "developer",
        "title": "UUID v4 Generator Online – Bulk RFC 4122 GUID Maker",
        "description": "Synthesize cryptographically secure Version 4 UUIDs and GUIDs in bulk. Customize hyphens, uppercase/lowercase, and export in JSON or plain text.",
        "keywords": ["uuid generator", "guid generator online", "uuid v4 generator", "bulk uuid generator", "rfc 4122 unique id"],
        "howItWorks": [
            "Select the number of UUIDs to generate (from 1 to 100+).",
            "Choose formatting options (uppercase, lowercase, with or without hyphens).",
            "Click Generate to produce cryptographically random identifiers.",
            "Copy single IDs or download the complete list in JSON or CSV format."
        ],
        "faq": [
            {"question": "How are UUID v4 identifiers generated?", "answer": "They use the browser's Web Crypto API (crypto.getRandomValues) to generate 122 cryptographically secure random bits."},
            {"question": "Can two UUID v4 values ever collide?", "answer": "The probability of a collision is approximately 1 in 2.71 × 10^18, making collisions practically impossible."},
            {"question": "What is the difference between a UUID and a GUID?", "answer": "GUID is Microsoft's terminology for universally unique identifiers that conform to the standard RFC 4122 UUID specification."}
        ]
    },
    {
        "slug": "cron-expression-generator",
        "name": "Cron Expression Generator",
        "h1": "Cron Expression Generator & Crontab Visual Builder",
        "category": "developer",
        "title": "Cron Expression Generator – Visual Crontab Schedule Builder Online",
        "description": "Build, validate, and decode 5-field crontab expressions with interactive selectors. See human-readable schedule descriptions and upcoming execution times.",
        "keywords": ["cron expression generator", "crontab generator", "crontab schedule builder", "cron explainer online", "crontab guru online"],
        "howItWorks": [
            "Use interactive dropdowns to set Minutes, Hours, Day of Month, Month, and Day of Week.",
            "Review the generated standard 5-field cron string in real time.",
            "Read the plain English sentence describing exactly when the cron executes.",
            "Verify the schedule against the next 5 upcoming execution timestamps."
        ],
        "faq": [
            {"question": "What do the 5 fields in crontab represent?", "answer": "From left to right: Minute (0-59), Hour (0-23), Day of Month (1-31), Month (1-12), and Day of Week (0-6)."},
            {"question": "What does '* * * * *' mean in cron?", "answer": "Five asterisks indicate that the scheduled command executes every single minute of every hour, every day."},
            {"question": "How do I run a cron job every 15 minutes?", "answer": "Use '*/15 * * * *' to trigger the task every 15 minutes."}
        ]
    },
    {
        "slug": "dev-tools",
        "name": "Developer Micro-Suite Hub",
        "h1": "Developer Tools Micro-Suite & Unified Workspace",
        "category": "developer",
        "title": "Developer Utilities Hub – JSON, Regex, JWT & Web Tools in One Place",
        "description": "Unified multi-tab developer workspace combining JSON beautifier, Regex tester, and JWT token inspector in one high-performance interface.",
        "keywords": ["developer tools hub", "web developer utilities", "online developer suite", "json regex jwt hub"],
        "howItWorks": [
            "Switch between JSON, Regex, and JWT workspaces with a single click.",
            "Work on payloads and patterns without navigating across different tabs.",
            "Benefit from zero server transmission with 100% client-side memory safety.",
            "Copy formatted outputs directly into your code editor."
        ],
        "faq": [
            {"question": "Why use a unified dev hub?", "answer": "It reduces context switching and eliminates the need to open multiple disparate websites for daily development tasks."},
            {"question": "Does the hub save state when switching tabs?", "answer": "Yes, active editors maintain their text state during your active browser session."}
        ]
    },

    # Security
    {
        "slug": "vapt-security-scanner",
        "name": "Website VAPT Security Scanner",
        "h1": "Website VAPT Security Scanner & OWASP Top 10 Audit",
        "category": "security",
        "title": "Website VAPT Security Scanner Online – Free Vulnerability & Headers Audit",
        "description": "Scan websites for OWASP vulnerabilities, missing HTTP security headers (CSP, HSTS, X-Frame-Options), SSL/TLS cipher suites, and cookie security flags.",
        "keywords": ["vapt scanner", "website vulnerability scanner", "owasp security audit", "http security headers check", "passive penetration testing tool"],
        "howItWorks": [
            "Enter your target domain or URL (e.g. example.com).",
            "Click Run Security Audit to trigger non-invasive passive checks.",
            "Review verified HTTP headers, SSL certificates, DNS records, and cookie flags.",
            "Follow actionable remediation recommendations to fix discovered misconfigurations."
        ],
        "faq": [
            {"question": "Is this VAPT scanner safe to use on any website?", "answer": "Yes. The scanner performs purely passive, non-intrusive evaluations (HTTP headers, SSL handshakes, and public DNS records) with zero active exploitation."},
            {"question": "Which security headers does the scanner check?", "answer": "It verifies Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy."},
            {"question": "What is an OWASP Top 10 audit?", "answer": "An audit evaluating your web application against the most critical web security risks identified by the Open Web Application Security Project."}
        ]
    },
    {
        "slug": "vapt-scanner",
        "name": "Website VAPT Scanner",
        "h1": "Online Website Vulnerability & Penetration Audit",
        "category": "security",
        "title": "Online VAPT Scanner – Automated Security & Vulnerability Audit",
        "description": "Fast, automated online VAPT security scanner checking HTTP response headers, SSL/TLS certificates, open socket exposure, and DNS records.",
        "keywords": ["vapt scanner", "penetration testing tool online", "web security check", "owasp scanner"],
        "howItWorks": [
            "Input the website domain you want to audit.",
            "Initiate the scan to analyze SSL, headers, and DNS records.",
            "Inspect the safety score and detailed vulnerability findings.",
            "Download or export the security audit report."
        ],
        "faq": [
            {"question": "How often should I scan my website?", "answer": "Security audits should be conducted after every major release and at least monthly to detect expired certificates and header regressions."}
        ]
    },
    {
        "slug": "nmap-audit",
        "name": "N-Map Port & Socket Scanner",
        "h1": "Online Port Scanner & Socket Exposure Inspection",
        "category": "security",
        "title": "Online Port Scanner – Check Open TCP Ports & Firewall Rules",
        "description": "Inspect open network ports on your domain non-destructively. Check standard HTTP, HTTPS, SSH, SMTP, and database socket exposure safely.",
        "keywords": ["online port scanner", "nmap online", "check open ports", "tcp port scanner", "firewall port test"],
        "howItWorks": [
            "Provide the target domain or public IP address.",
            "Select standard port range (Web, Mail, SSH, Database).",
            "Review responsive ports and service banner identification.",
            "Close unnecessary open ports to harden your firewall configuration."
        ],
        "faq": [
            {"question": "Which standard ports are tested?", "answer": "Ports 80 (HTTP), 443 (HTTPS), 22 (SSH), 21 (FTP), 25 (SMTP), 3306 (MySQL), 5432 (PostgreSQL), and 8080 (Web Proxy)."},
            {"question": "Why should unnecessary ports be closed?", "answer": "Open unused ports provide potential attack surfaces for attackers to exploit unpatched service vulnerabilities."}
        ]
    },
    {
        "slug": "ssl-checker",
        "name": "SSL Certificate Checker",
        "h1": "SSL / TLS Certificate Checker & Expiration Countdown",
        "category": "security",
        "title": "SSL Certificate Checker Online – Verify Validity, Issuer & Expiry",
        "description": "Verify SSL/TLS certificate installation, certificate authority issuer, expiration countdown, Subject Alternative Names (SAN), and cipher suite security.",
        "keywords": ["ssl checker", "ssl certificate checker", "check ssl expiration date", "verify tls certificate", "ssl chain validator"],
        "howItWorks": [
            "Enter the domain name you want to verify (e.g. google.com).",
            "The checker performs an in-server TLS handshake on port 443.",
            "Inspect certificate authority (CA), valid date ranges, and days remaining.",
            "Review Subject Alternative Names (SAN) and cipher strength."
        ],
        "faq": [
            {"question": "Why is monitoring SSL expiration critical?", "answer": "An expired SSL certificate displays a prominent security warning in browsers, immediately blocking visitors and damaging brand credibility."},
            {"question": "What is a SAN in an SSL certificate?", "answer": "Subject Alternative Names (SAN) allow a single SSL certificate to secure multiple hostnames and subdomains."},
            {"question": "How far in advance should I renew my SSL certificate?", "answer": "It is recommended to renew certificates at least 30 days before expiration to prevent unexpected downtime."}
        ]
    },
    {
        "slug": "ssl-certificate-checker",
        "name": "SSL Certificate Checker Tool",
        "h1": "SSL Certificate Checker & Expiration Verifier",
        "category": "security",
        "title": "SSL Certificate Checker – Check Certificate Chain & Expiry Online",
        "description": "Comprehensive SSL certificate checker to test domain certificates, expiration dates, cryptographic cipher suites, and root CA trust chains.",
        "keywords": ["ssl certificate checker", "check ssl online", "ssl expiry alert"],
        "howItWorks": [
            "Type your website domain.",
            "Analyze the complete TLS certificate chain.",
            "Check validity dates and protocol support (TLS 1.2, TLS 1.3)."
        ],
        "faq": [
            {"question": "Does this tool support TLS 1.3?", "answer": "Yes, it tests modern TLS 1.3 as well as legacy protocols."}
        ]
    },
    {
        "slug": "dns-lookup",
        "name": "DNS Records Lookup",
        "h1": "DNS Records Lookup & Global Nameserver Inspector",
        "category": "security",
        "title": "DNS Lookup Tool – Check A, AAAA, MX, TXT, CNAME & NS Records",
        "description": "Perform instant global DNS lookups on any domain. Query A, AAAA, MX, CNAME, TXT, NS, and SOA records with raw zone output.",
        "keywords": ["dns lookup", "check dns records", "mx record lookup", "nslookup online", "dns checker", "txt record lookup"],
        "howItWorks": [
            "Enter any fully qualified domain name (FQDN).",
            "Select specific record types (A, MX, TXT, CNAME) or query all.",
            "Review authoritative nameserver responses and TTL values.",
            "Export DNS zone results or copy individual record values."
        ],
        "faq": [
            {"question": "What is the difference between an A record and a CNAME record?", "answer": "An A record points a hostname directly to an IPv4 address, while a CNAME record creates an alias pointing to another hostname."},
            {"question": "What are MX records used for?", "answer": "Mail Exchanger (MX) records designate the mail servers responsible for receiving email messages on behalf of your domain."},
            {"question": "How long does DNS propagation take?", "answer": "DNS propagation typically completes within a few minutes up to 48 hours depending on TTL (Time-To-Live) cache settings."}
        ]
    },
    {
        "slug": "whois-lookup",
        "name": "WHOIS / RDAP Domain Lookup",
        "h1": "WHOIS Domain Lookup & RDAP Registration Search",
        "category": "security",
        "title": "WHOIS Lookup Online – Check Domain Registration, Owner & Expiry",
        "description": "Check domain name registration status, ICANN registrar, creation and expiration timestamps, authoritative nameservers, and domain lock statuses.",
        "keywords": ["whois lookup", "domain whois search", "check domain owner", "domain registration lookup", "rdap domain lookup"],
        "howItWorks": [
            "Input the domain name you want to research.",
            "Query authoritative ICANN RDAP and WHOIS registries.",
            "Review registration date, expiration date, registrar, and nameservers.",
            "Verify transfer safety lock status and registry domain IDs."
        ],
        "faq": [
            {"question": "Why are some registrant contact details hidden?", "answer": "Registrars implement WHOIS Privacy / GDPR protection to conceal personal contact details from public web scrapers."},
            {"question": "What is RDAP?", "answer": "Registration Data Access Protocol (RDAP) is the modern, secure, JSON-based successor to the legacy WHOIS protocol."},
            {"question": "How do I check if a domain is expired?", "answer": "Inspect the 'Registry Expiry Date' field in the WHOIS result. If the date has passed, the domain is in grace or redemption periods."}
        ]
    },
    {
        "slug": "email-security",
        "name": "SPF / DKIM / DMARC Checker",
        "h1": "SPF, DKIM & DMARC Email Security Record Validator",
        "category": "security",
        "title": "SPF, DKIM & DMARC Checker – Test Domain Email Authentication Online",
        "description": "Inspect domain email authentication records, prevent spoofing and phishing risks, and test DMARC enforcement policies for Gmail and Yahoo compliance.",
        "keywords": ["dmarc checker", "spf record checker", "dkim checker online", "email security audit", "email deliverability test"],
        "howItWorks": [
            "Enter your email-sending domain name.",
            "The system queries DNS for TXT records starting with v=spf1 and v=DMARC1.",
            "Evaluate your DMARC policy enforcement (p=none, p=quarantine, or p=reject).",
            "Review alignment and syntax warnings to ensure high email deliverability."
        ],
        "faq": [
            {"question": "Why are SPF, DKIM, and DMARC essential in 2026?", "answer": "Major email providers like Google and Yahoo require senders to enforce email authentication to eliminate spam, spoofing, and phishing."},
            {"question": "What does a DMARC policy of 'p=reject' mean?", "answer": "It instructs receiving mail servers to automatically reject and block any incoming email that fails SPF and DKIM authentication checks."},
            {"question": "How does SPF work?", "answer": "SPF (Sender Policy Framework) lists the authorized IP addresses and mail servers permitted to send email on behalf of your domain."}
        ]
    },
    {
        "slug": "password-generator",
        "name": "Secure Password Generator",
        "h1": "Cryptographically Secure Random Password Generator",
        "category": "security",
        "title": "Random Password Generator – Create Strong Passwords Online",
        "description": "Generate high-entropy, cryptographically random passwords and passphrases. Filter ambiguous characters and generate multiple passwords securely client-side.",
        "keywords": ["password generator", "random password generator", "strong password maker", "secure password generator", "generate password online"],
        "howItWorks": [
            "Select desired password length (16+ characters recommended).",
            "Choose character sets (Uppercase, Lowercase, Numbers, Symbols).",
            "Toggle 'Exclude Ambiguous' to avoid confusing characters like 'l' and '1'.",
            "Click Generate to copy a cryptographically secure password."
        ],
        "faq": [
            {"question": "Is it safe to generate passwords in the browser?", "answer": "Yes. Passwords are generated exclusively on your local machine using the Web Crypto API (crypto.getRandomValues) with zero server transmission."},
            {"question": "What is the recommended password length?", "answer": "Security authorities recommend at least 16 characters including uppercase, lowercase, numbers, and symbols to resist modern brute-force GPU attacks."},
            {"question": "Can generated passwords be recovered if lost?", "answer": "No, because passwords are never logged or stored on any server."}
        ]
    },
    {
        "slug": "password-strength-checker",
        "name": "Password Strength & Entropy Checker",
        "h1": "Password Strength Checker & Brute-Force Estimator",
        "category": "security",
        "title": "Password Strength Checker – Real-Time Entropy & Crack Time Score",
        "description": "Test your password strength privately in real time. Calculate Shannon entropy in bits, brute-force GPU crack times, and common dictionary pattern vulnerabilities.",
        "keywords": ["password strength checker", "how secure is my password", "password entropy tester", "brute force crack time calculator"],
        "howItWorks": [
            "Type a password or test phrase into the evaluator.",
            "Review the real-time strength meter and Shannon bit entropy score.",
            "Inspect estimated crack times across supercomputers and offline GPU clusters.",
            "Read specific suggestions to eliminate sequential numbers and dictionary words."
        ],
        "faq": [
            {"question": "Does this tool transmit or store my password?", "answer": "Never. All entropy modeling and pattern checks run entirely in browser memory."},
            {"question": "What is password entropy?", "answer": "Password entropy measures the unpredictable randomness of a password in bits. Passwords with 60+ bits are generally resistant to brute-force attacks."},
            {"question": "How does dictionary pattern detection work?", "answer": "It identifies common word roots, keyboard sequences (like 'qwerty'), and predictable substitutions (like 'p@ssword')."}
        ]
    },

    # Utility & Career
    {
        "slug": "resume-ats-checker",
        "name": "Resume ATS Compatibility Checker",
        "h1": "AI Resume ATS Compatibility Checker & CV Parser",
        "category": "utility",
        "title": "Resume ATS Checker – Test Your Resume ATS Score Free Online",
        "description": "Scan and score your resume for Applicant Tracking Systems (ATS). Audit section headings, contact information, keyword matches, and parseability.",
        "keywords": ["resume ats checker", "ats resume scanner", "check resume ats score", "free ats resume checker", "ats friendly resume tester"],
        "howItWorks": [
            "Paste your resume text or upload your CV document.",
            "The parser checks for standard sections (Experience, Education, Skills, Contact).",
            "Review your comprehensive ATS compatibility score from 0 to 100.",
            "Implement recommended fixes for action verbs, keyword density, and formatting."
        ],
        "faq": [
            {"question": "What is an ATS?", "answer": "An Applicant Tracking System (ATS) is automated software used by employers to screen, parse, and rank resumes before a human recruiter reviews them."},
            {"question": "What is considered a good ATS score?", "answer": "A score of 80% or higher is considered strong. Scores below 70% indicate formatting issues, missing contact details, or inadequate section headings."},
            {"question": "Do tables and columns hurt ATS readability?", "answer": "Yes, multi-column tables and floating text boxes often confuse ATS parsers, causing text to be scrambled or dropped."}
        ]
    },
    {
        "slug": "qr-generator",
        "name": "QR Code Generator Studio",
        "h1": "Custom QR Code Generator Studio with Logo & Colors",
        "category": "utility",
        "title": "Free QR Code Generator – Create Custom QR Codes (PNG, SVG)",
        "description": "Generate permanent, customized QR codes for URLs, WiFi credentials, vCards, emails, and plain text. Download high-resolution PNG and vector SVG formats.",
        "keywords": ["qr code generator", "create qr code", "free qr code maker", "qr code generator with logo", "wifi qr code generator"],
        "howItWorks": [
            "Select the data type (URL, Plain Text, WiFi Network, Email, or vCard).",
            "Customize QR code foreground and background colors.",
            "Preview the generated high-resolution matrix in real time.",
            "Download your QR code in crisp PNG or scalable vector SVG format."
        ],
        "faq": [
            {"question": "Do generated QR codes expire?", "answer": "No. The QR codes created here are static and encode data directly into the matrix, meaning they work permanently without scan limits."},
            {"question": "How do I create a WiFi login QR code?", "answer": "Select the WiFi tab, input your SSID network name, encryption type (WPA/WPA2), and password to generate an auto-connect code."},
            {"question": "Is SVG better than PNG for printing?", "answer": "Yes, SVG is a vector format that scales infinitely without pixelation, making it ideal for business cards, billboards, and brochures."}
        ]
    },
    {
        "slug": "image-compressor",
        "name": "Image Compressor Studio",
        "h1": "Smart Online Image Compressor (JPG, PNG, WebP)",
        "category": "utility",
        "title": "Image Compressor Online – Compress JPG, PNG & WebP Images",
        "description": "Compress and optimize JPG, PNG, and WebP images up to 90% without visible quality loss. Batch resize and compress photos directly in browser memory.",
        "keywords": ["image compressor", "compress image online", "reduce image size", "compress png without quality loss", "compress photo to 100kb"],
        "howItWorks": [
            "Drag and drop one or multiple images into the compression studio.",
            "Adjust the quality slider or choose file size presets (e.g. Max 100KB, Max 200KB).",
            "Compare original and compressed sizes with live visual quality preview.",
            "Download individual optimized images or batch download all as a ZIP file."
        ],
        "faq": [
            {"question": "Are my photos uploaded to a remote server?", "answer": "No, compression executes locally in your browser using HTML5 Canvas and WebAssembly with zero data transmission."},
            {"question": "How to compress an image to under 100 KB for government portals?", "answer": "Use the preset button for 100 KB, and the smart multi-pass algorithm adjusts dimension scaling and quality to match the exact size cap."},
            {"question": "What image formats are supported?", "answer": "Full support for JPEG, PNG, WebP, and AVIF image formats."}
        ]
    },
    {
        "slug": "age-calculator",
        "name": "Age Milestone & Planetary Calculator",
        "h1": "Age Calculator, Chronological Milestones & Planetary Age",
        "category": "utility",
        "title": "Age Calculator – Calculate Exact Age in Years, Months, Days & Hours",
        "description": "Calculate your exact age from date of birth down to seconds. Explore 9 planetary orbital ages, biological heartbeats, life in weeks grid, and zodiac traits.",
        "keywords": ["age calculator", "calculate age online", "date of birth to age", "how old am i", "planetary age calculator"],
        "howItWorks": [
            "Select your date of birth using the interactive date picker.",
            "View exact elapsed years, months, days, hours, and live seconds ticker.",
            "Inspect your planetary age across Mercury, Venus, Mars, and Jupiter.",
            "Review your next birthday countdown, total heartbeats, and Chinese lunar zodiac."
        ],
        "faq": [
            {"question": "How does the calculator handle leap years?", "answer": "The astronomical algorithm accounts for all 366-day leap years across your lifespan for 100% calendar precision."},
            {"question": "What is planetary age?", "answer": "Planetary age calculates how many times other planets in the solar system have orbited the Sun since your birth (e.g., a Mars year is 687 Earth days)."},
            {"question": "How is the next birthday countdown computed?", "answer": "It computes the exact days, hours, and minutes remaining until your birth date occurs in the current or upcoming calendar year."}
        ]
    },
    {
        "slug": "bengali-panjika",
        "name": "Bengali Calendar & Panjika",
        "h1": "বাংলা পঞ্জিকা ও ক্যালেন্ডার ১৪৩১-১৪৩৩ (Bengali Panjika)",
        "category": "utility",
        "title": "Bengali Calendar 1431-1433 – Today's Bangla Date, Panjika & Shubh Muhurat",
        "description": "Surya Siddhanta astronomical Bengali Panjika. Real-time Tithi, Nakshatra, Durga Puja festival calendar, and Shubh Bibaho marriage Muhurat dates.",
        "keywords": ["bengali calendar", "bangla calendar today date", "bengali panjika", "bangla date today", "durga puja calendar", "shubh muhurat"],
        "howItWorks": [
            "View today's exact Bengali date (Day, Month, Year 1431-1433).",
            "Check current astronomical Tithi, Nakshatra, Yoga, and Karana.",
            "Inspect live 6-period daily Bengali clock (Bhor, Sokal, Dupur, Bikel, Sondhya, Raat).",
            "Explore auspicious Amrita Yoga and Rahu Kalam timings."
        ],
        "faq": [
            {"question": "Which astronomical standard is used?", "answer": "Calculations follow the traditional Surya Siddhanta and Drik Siddhanta standards recognized in West Bengal and Bangladesh."},
            {"question": "Can I convert English Gregorian dates to Bengali dates?", "answer": "Yes, the integrated converter translates any English calendar date to its exact Bengali counterpart."}
        ]
    },
    {
        "slug": "bengali-calendar",
        "name": "Bengali Calendar 1431-1433",
        "h1": "Bangla Calendar 1431-1433 & Daily Panjika Almanac",
        "category": "utility",
        "title": "Bengali Calendar 1431-1433 – Daily Tithi, Festivals & Bangla Date",
        "description": "Daily Bengali Calendar and Panjika almanac featuring Durga Puja schedules, Ekadashi fasts, Poila Boishakh, and auspicious marriage muhurats.",
        "keywords": ["bengali calendar", "bangla panjika", "bangla date today", "ekadashi dates"],
        "howItWorks": [
            "Select any month from Boishakh to Choitro.",
            "Inspect daily tithis, festive holidays, and planetary phases."
        ],
        "faq": [
            {"question": "Does it show Durga Puja timings?", "answer": "Yes, complete Mahashtami, Sandhi Puja, and Nabami Nirghanto timings are included."}
        ]
    },

    # Finance
    {
        "slug": "gst-calculator",
        "name": "GST Tax Calculator",
        "h1": "GST Tax Calculator (India) – Inclusive & Exclusive Rates",
        "category": "finance",
        "title": "GST Calculator India – Calculate Inclusive & Exclusive GST (5%, 12%, 18%, 28%)",
        "description": "Free online GST Calculator for India. Calculate CGST, SGST, and IGST breakdowns for 5%, 12%, 18%, and 28% tax slabs in inclusive or exclusive modes.",
        "keywords": ["gst calculator", "online gst calculator india", "calculate gst amount", "reverse gst calculator", "cgst sgst igst calculator"],
        "howItWorks": [
            "Enter the transaction base amount in Rupees.",
            "Choose standard GST slab (5%, 12%, 18%, or 28%) or enter custom percentage.",
            "Toggle between GST Exclusive (add tax) and GST Inclusive (remove tax) modes.",
            "Review detailed breakdown of CGST, SGST, IGST, and final invoice price."
        ],
        "faq": [
            {"question": "What is the formula to calculate GST?", "answer": "For GST Exclusive: GST Amount = (Base Amount × GST%) / 100. Total = Base Amount + GST Amount."},
            {"question": "How do you calculate reverse (inclusive) GST?", "answer": "Pre-GST Base Amount = Total Amount × (100 / (100 + GST%)). For example, at 18% GST on Rs 118: 118 × (100/118) = Rs 100 base."},
            {"question": "What is the difference between CGST, SGST, and IGST?", "answer": "CGST and SGST apply to intra-state transactions split equally between Central and State governments. IGST applies to inter-state sales."}
        ]
    },
    {
        "slug": "sip-calculator",
        "name": "SIP Wealth Calculator",
        "h1": "SIP Calculator – Mutual Fund Compounding & Wealth Projections",
        "category": "finance",
        "title": "SIP Calculator – Mutual Fund SIP Returns & Compounding Estimator",
        "description": "Calculate estimated returns and maturity wealth on your monthly Mutual Fund SIP investments with compounding charts, inflation adjustments, and annual step-up growth.",
        "keywords": ["sip calculator", "mutual fund sip calculator", "systematic investment plan calculator", "sip compounding returns", "step up sip calculator"],
        "howItWorks": [
            "Enter your planned monthly investment amount.",
            "Specify expected annual return rate percentage (e.g. 12% to 15%).",
            "Select investment tenure in years (e.g. 5, 10, 15, 20 years).",
            "Review total amount invested, estimated wealth gain, and interactive growth charts."
        ],
        "faq": [
            {"question": "What is a Systematic Investment Plan (SIP)?", "answer": "A SIP allows an investor to deposit a fixed sum into a mutual fund scheme at regular intervals (monthly) to benefit from rupee cost averaging and compound interest."},
            {"question": "What is a Step-Up SIP?", "answer": "A Step-Up SIP automatically increases your monthly investment contribution by a set percentage (e.g. 10%) each year as your salary increases."},
            {"question": "What is the formula used for SIP calculations?", "answer": "M = P × [((1 + i)^n – 1) / i] × (1 + i), where M is maturity sum, P is monthly deposit, i is monthly interest rate, and n is total monthly contributions."}
        ]
    },
    {
        "slug": "stock-market",
        "name": "Indian Stock Market Live Updates",
        "h1": "Indian Stock Market Live Tracker – SENSEX, NIFTY 50 & Indices",
        "category": "finance",
        "title": "Indian Stock Market Live – Nifty 50, Sensex & NSE BSE Indices Tracker",
        "description": "Real-time tracker for Indian stock market indices including BSE Sensex, NSE Nifty 50, Bank Nifty, top gainers, losers, and market breadth.",
        "keywords": ["indian stock market live", "nifty 50 live share price", "sensex live today", "bse nse market watch", "bank nifty live index"],
        "howItWorks": [
            "Monitor live index values for SENSEX, NIFTY 50, and sectoral indices.",
            "Review percentage gains, losses, and day's high/low ranges.",
            "Analyze market breadth indicators and top moving stocks.",
            "Refresh real-time data feeds during Indian trading hours."
        ],
        "faq": [
            {"question": "What are Indian stock market trading hours?", "answer": "Trading on NSE and BSE is open Monday through Friday from 9:15 AM to 3:30 PM IST."},
            {"question": "What is the difference between Nifty 50 and Sensex?", "answer": "Nifty 50 tracks 50 major stocks listed on the National Stock Exchange (NSE), while Sensex tracks 30 large-cap stocks on the Bombay Stock Exchange (BSE)."}
        ]
    },

    # PDF Studio (all 31 tools)
    {
        "slug": "merge-pdf",
        "name": "Merge PDF",
        "h1": "Merge PDF Files Online – Combine Multiple PDFs Free",
        "category": "pdf",
        "title": "Merge PDF Online Free – Combine PDF Documents",
        "description": "Merge and combine multiple PDF documents into a single organized file in seconds. Drag-and-drop page reordering with zero file retention.",
        "keywords": ["merge pdf", "combine pdf files", "join pdf online", "concatenate pdf free"],
        "howItWorks": [
            "Upload two or more PDF files into the merge workspace.",
            "Drag and drop thumbnails to organize files into your preferred sequence.",
            "Click Merge PDF to join documents in memory.",
            "Download your unified PDF document immediately."
        ],
        "faq": [
            {"question": "Is there a limit on how many PDFs I can merge?", "answer": "No, you can merge multiple PDF documents without artificial file caps."},
            {"question": "Are my documents secure?", "answer": "Yes, documents are processed in memory and never stored permanently on our servers."}
        ]
    },
    {
        "slug": "split-pdf",
        "name": "Split PDF",
        "h1": "Split PDF Pages Online – Extract Pages into Separate Files",
        "category": "pdf",
        "title": "Split PDF Online Free – Extract Pages from PDF Document",
        "description": "Split PDF documents by custom page ranges or extract every single page into separate downloadable PDF files in seconds.",
        "keywords": ["split pdf", "extract pages from pdf", "divide pdf online", "separate pdf pages"],
        "howItWorks": [
            "Upload the PDF document you want to split.",
            "Specify page ranges (e.g. 1-3, 5, 8-10) or choose 'Extract All Pages'.",
            "Click Split PDF to process the document.",
            "Download the resulting individual PDF files as a ZIP archive."
        ],
        "faq": [
            {"question": "Can I extract only specific pages?", "answer": "Yes, enter custom page ranges like 1-5, 7, 9 to extract only desired pages."}
        ]
    },
    {
        "slug": "compress-pdf",
        "name": "Compress PDF",
        "h1": "Compress PDF Online – Reduce PDF File Size Without Quality Loss",
        "category": "pdf",
        "title": "Compress PDF Online Free – Reduce PDF File Size",
        "description": "Compress PDF documents significantly while maintaining clear text and crisp image quality. Fast, private, and watermark-free.",
        "keywords": ["compress pdf", "reduce pdf size", "shrink pdf online", "compress pdf to 100kb 200kb"],
        "howItWorks": [
            "Drop your large PDF document into the compressor.",
            "Choose compression level (Extreme, Recommended, or Light).",
            "Click Compress PDF to optimize document structure and image streams.",
            "Download your optimized, lightweight PDF file."
        ],
        "faq": [
            {"question": "Will compressing a PDF affect its visual readability?", "answer": "The recommended optimization removes redundant metadata and applies lossless image compression, preserving high visual clarity."}
        ]
    },
    {
        "slug": "word-to-pdf",
        "name": "Word to PDF",
        "h1": "Word to PDF Converter – Convert DOCX to PDF Online",
        "category": "pdf",
        "title": "Word to PDF Converter Online – Convert DOCX to PDF Free",
        "description": "Convert Microsoft Word DOC and DOCX documents into universal, print-ready PDF files with exact formatting preservation.",
        "keywords": ["word to pdf", "convert docx to pdf", "doc to pdf online free"],
        "howItWorks": [
            "Select and upload your Microsoft Word (.docx) file.",
            "The converter renders document fonts, tables, and images accurately.",
            "Download the converted, universal PDF file."
        ],
        "faq": [
            {"question": "Does this tool preserve fonts and tables?", "answer": "Yes, Word styling, margins, headers, and tables are preserved accurately."}
        ]
    },
    {
        "slug": "excel-to-pdf",
        "name": "Excel to PDF",
        "h1": "Excel to PDF Converter – Convert XLSX Spreadsheets to PDF",
        "category": "pdf",
        "title": "Excel to PDF Converter – Convert XLSX Sheets to Print-Ready PDF",
        "description": "Convert Microsoft Excel spreadsheets (.xlsx, .xls) into clean, paginated PDF tables ready for printing and sharing.",
        "keywords": ["excel to pdf", "convert xlsx to pdf", "spreadsheet to pdf online"],
        "howItWorks": [
            "Upload your Excel spreadsheet.",
            "Configure page orientation (Portrait or Landscape) to fit columns.",
            "Download your formatted PDF report."
        ],
        "faq": [
            {"question": "Can wide spreadsheets fit onto a single PDF page?", "answer": "Yes, the layout engine scales table widths to fit neatly on standard A4 or Letter sheets."}
        ]
    },
    {
        "slug": "powerpoint-to-pdf",
        "name": "PowerPoint to PDF",
        "h1": "PowerPoint to PDF Converter – Convert PPTX Slides to PDF",
        "category": "pdf",
        "title": "PowerPoint to PDF Converter Online – Convert PPTX to PDF Free",
        "description": "Convert Microsoft PowerPoint presentations (.pptx, .ppt) into crisp, shareable PDF slide decks.",
        "keywords": ["powerpoint to pdf", "pptx to pdf", "convert slides to pdf"],
        "howItWorks": [
            "Upload your PowerPoint presentation file.",
            "Each slide is converted sequentially into high-resolution PDF pages.",
            "Download the finished PDF deck."
        ],
        "faq": [
            {"question": "Are slide transitions included in the PDF?", "answer": "PDFs represent static printed pages, so each slide is rendered as a clean static page."}
        ]
    },
    {
        "slug": "jpg-to-pdf",
        "name": "JPG to PDF",
        "h1": "JPG to PDF Converter – Turn Photos into a PDF Document",
        "category": "pdf",
        "title": "JPG to PDF Converter Online – Convert JPG Images to PDF Free",
        "description": "Convert multiple JPG/JPEG photos, receipts, or scans into a single, beautifully formatted PDF document.",
        "keywords": ["jpg to pdf", "convert jpg to pdf", "images to pdf online"],
        "howItWorks": [
            "Upload one or more JPG/JPEG images.",
            "Reorder image pages and adjust page margins if needed.",
            "Click Convert to synthesize a multi-page PDF."
        ],
        "faq": [
            {"question": "Can I combine multiple photos into one PDF?", "answer": "Yes, upload multiple JPGs to merge them into a single multi-page PDF."}
        ]
    },
    {
        "slug": "png-to-pdf",
        "name": "PNG to PDF",
        "h1": "PNG to PDF Converter – Convert Transparent PNGs to PDF",
        "category": "pdf",
        "title": "PNG to PDF Converter Online – Convert PNG Images to PDF Free",
        "description": "Convert PNG images and screenshots into print-ready PDF files with full alpha transparency handling.",
        "keywords": ["png to pdf", "convert png to pdf online free"],
        "howItWorks": ["Upload PNG images.", "Set page layout.", "Download converted PDF."]
    },
    {
        "slug": "txt-to-pdf",
        "name": "TXT to PDF",
        "h1": "TXT to PDF Converter – Convert Plain Text Files to PDF",
        "category": "pdf",
        "title": "TXT to PDF Converter Online – Convert Plain Text to PDF Document",
        "description": "Convert plain text (.txt) files and code snippets into cleanly formatted, paginated PDF documents.",
        "keywords": ["txt to pdf", "text to pdf online", "convert txt file to pdf"],
        "howItWorks": ["Upload or paste text file.", "Choose font and margins.", "Generate PDF."]
    },
    {
        "slug": "html-to-pdf",
        "name": "HTML to PDF",
        "h1": "HTML to PDF Converter – Render Webpages and HTML to PDF",
        "category": "pdf",
        "title": "HTML to PDF Converter Online – Render Webpages to PDF Free",
        "description": "Render HTML documents and web pages into print-ready PDFs with CSS styling, typography, and image assets intact.",
        "keywords": ["html to pdf", "convert html to pdf online", "webpage to pdf converter"],
        "howItWorks": ["Upload HTML file or URL.", "Render CSS and layout.", "Download PDF."]
    },
    {
        "slug": "pdf-to-word",
        "name": "PDF to Word",
        "h1": "PDF to Word Converter – Convert PDF to Editable DOCX",
        "category": "pdf",
        "title": "PDF to Word Converter Online – Convert PDF to Editable DOCX Free",
        "description": "Convert PDF documents into fully editable Microsoft Word DOCX files. Preserves paragraphs, formatting, and tables.",
        "keywords": ["pdf to word", "convert pdf to docx", "pdf to word converter online"],
        "howItWorks": ["Upload PDF document.", "Extract text, fonts, and tables.", "Download editable DOCX."]
    },
    {
        "slug": "pdf-to-excel",
        "name": "PDF to Excel",
        "h1": "PDF to Excel Converter – Extract Tables from PDF to XLSX",
        "category": "pdf",
        "title": "PDF to Excel Converter Online – Extract PDF Tables to XLSX Sheets",
        "description": "Extract tabular data from PDF files directly into structured Microsoft Excel (.xlsx) spreadsheets.",
        "keywords": ["pdf to excel", "convert pdf to xlsx", "extract tables from pdf to excel"],
        "howItWorks": ["Upload PDF containing data tables.", "Detect table boundaries.", "Download clean XLSX spreadsheet."]
    },
    {
        "slug": "pdf-to-powerpoint",
        "name": "PDF to PowerPoint",
        "h1": "PDF to PowerPoint Converter – Turn PDF Pages into PPTX Slides",
        "category": "pdf",
        "title": "PDF to PowerPoint Converter Online – Convert PDF to PPTX Free",
        "description": "Convert PDF documents into editable Microsoft PowerPoint presentations (.pptx). Each PDF page becomes a presentation slide.",
        "keywords": ["pdf to powerpoint", "pdf to pptx", "convert pdf to slides"],
        "howItWorks": ["Upload PDF file.", "Process each page into a slide layout.", "Download PPTX presentation."]
    },
    {
        "slug": "pdf-to-jpg",
        "name": "PDF to JPG",
        "h1": "PDF to JPG Converter – Export PDF Pages as JPG Images",
        "category": "pdf",
        "title": "PDF to JPG Converter Online – Extract PDF Pages as High-Res Images",
        "description": "Convert all or selected PDF pages into high-resolution JPG images. Download single images or batch archive.",
        "keywords": ["pdf to jpg", "convert pdf to image", "extract pdf pages as jpg"],
        "howItWorks": ["Upload PDF document.", "Select resolution DPI.", "Download image files."]
    },
    {
        "slug": "pdf-to-png",
        "name": "PDF to PNG",
        "h1": "PDF to PNG Converter – Extract PDF Pages as PNG Images",
        "category": "pdf",
        "title": "PDF to PNG Converter Online – Convert PDF to Lossless PNG Free",
        "description": "Convert PDF pages to lossless PNG images with high clarity for presentations and web publishing.",
        "keywords": ["pdf to png", "convert pdf to png online", "pdf to image png"],
        "howItWorks": ["Upload PDF.", "Render pages to PNG.", "Download lossless image files."]
    },
    {
        "slug": "pdf-to-text",
        "name": "PDF to Text",
        "h1": "PDF to Text Converter – Extract Plain TXT from PDF",
        "category": "pdf",
        "title": "PDF to Text Converter Online – Extract Selectable Text from PDF",
        "description": "Extract raw selectable text from any PDF document into clean, plain .txt format instantly.",
        "keywords": ["pdf to text", "extract text from pdf", "pdf to txt converter"],
        "howItWorks": ["Upload PDF.", "Extract textual content stream.", "Download plain TXT file."]
    },
    {
        "slug": "delete-pages",
        "name": "Delete PDF Pages",
        "h1": "Delete Pages from PDF Online – Remove Unwanted PDF Pages",
        "category": "pdf",
        "title": "Delete PDF Pages Online Free – Remove Pages from PDF Document",
        "description": "Select and remove unwanted pages from your PDF file. Keep only the pages you need and download a clean document.",
        "keywords": ["delete pages from pdf", "remove pages from pdf", "delete pdf pages online"],
        "howItWorks": ["Upload PDF.", "Click on page thumbnails you want to delete.", "Download trimmed PDF."]
    },
    {
        "slug": "extract-pages",
        "name": "Extract PDF Pages",
        "h1": "Extract Pages from PDF Online – Save Selected Pages as New PDF",
        "category": "pdf",
        "title": "Extract PDF Pages Online – Save Specific Pages into a New Document",
        "description": "Extract specific pages or page ranges from a PDF document and save them as an independent new PDF.",
        "keywords": ["extract pdf pages", "save pages from pdf", "pull pages from pdf"],
        "howItWorks": ["Upload PDF.", "Select target pages to extract.", "Download new isolated PDF."]
    },
    {
        "slug": "reorder-pages",
        "name": "Reorder PDF Pages",
        "h1": "Reorder PDF Pages Online – Rearrange Page Order Visually",
        "category": "pdf",
        "title": "Reorder PDF Pages Online Free – Rearrange Pages in PDF File",
        "description": "Rearrange and reorganize the order of pages in your PDF document with intuitive drag-and-drop thumbnail controls.",
        "keywords": ["reorder pdf pages", "rearrange pdf pages", "change pdf page order"],
        "howItWorks": ["Upload PDF.", "Drag and drop page cards to reorder.", "Download newly sorted PDF."]
    },
    {
        "slug": "rotate-pdf",
        "name": "Rotate PDF Pages",
        "h1": "Rotate PDF Pages Online – Rotate 90, 180, or 270 Degrees",
        "category": "pdf",
        "title": "Rotate PDF Online Free – Rotate PDF Pages Permanently",
        "description": "Rotate upside-down or sideways PDF pages permanently by 90, 180, or 270 degrees. Rotate single pages or entire documents.",
        "keywords": ["rotate pdf", "rotate pdf pages online", "rotate upside down pdf", "save rotated pdf"],
        "howItWorks": ["Upload PDF.", "Click rotate left or right on thumbnails.", "Download permanently rotated PDF."]
    },
    {
        "slug": "repair-pdf",
        "name": "Repair PDF",
        "h1": "Repair Corrupted PDF Online – Recover Damaged PDF Documents",
        "category": "pdf",
        "title": "Repair PDF Online Free – Fix Damaged & Corrupted PDF Files",
        "description": "Analyze and recover damaged, broken, or unreadable PDF files by rebuilding corrupt document cross-reference tables.",
        "keywords": ["repair pdf", "fix damaged pdf", "recover corrupt pdf online", "repair broken pdf file"],
        "howItWorks": ["Upload corrupted PDF.", "Rebuild cross-reference table and structure.", "Download repaired PDF."]
    },
    {
        "slug": "flatten-pdf",
        "name": "Flatten PDF",
        "h1": "Flatten PDF Form Fields & Interactive Annotations",
        "category": "pdf",
        "title": "Flatten PDF Online Free – Make PDF Forms & Annotations Read-Only",
        "description": "Flatten interactive form fields, checkboxes, and annotations into permanent, non-editable page content.",
        "keywords": ["flatten pdf", "flatten pdf form fields", "lock pdf form online"],
        "howItWorks": ["Upload fillable PDF.", "Flatten interactive form layers.", "Download read-only document."]
    },
    {
        "slug": "watermark-pdf",
        "name": "Watermark PDF",
        "h1": "Add Watermark to PDF Online – Stamp Text or Image Watermarks",
        "category": "pdf",
        "title": "Watermark PDF Online Free – Add Custom Text & Image Stamp to PDF",
        "description": "Add custom text or image watermarks across every page of your PDF. Customize opacity, position, rotation, and font styling.",
        "keywords": ["watermark pdf", "add watermark to pdf", "stamp pdf online", "confidential watermark pdf"],
        "howItWorks": ["Upload PDF.", "Type watermark text or upload brand logo.", "Adjust transparency and angle.", "Download watermarked document."]
    },
    {
        "slug": "add-page-numbers",
        "name": "Add Page Numbers to PDF",
        "h1": "Add Page Numbers to PDF – Header & Footer Pagination",
        "category": "pdf",
        "title": "Add Page Numbers to PDF Online Free – Paginate PDF Documents",
        "description": "Add customizable page numbering to your PDF document. Select positioning (top, bottom, left, center, right) and number formatting.",
        "keywords": ["add page numbers to pdf", "paginate pdf online", "pdf page numbering tool"],
        "howItWorks": ["Upload PDF.", "Choose page number position and format ('Page X of Y').", "Apply and download."]
    },
    {
        "slug": "crop-pdf",
        "name": "Crop PDF Margins",
        "h1": "Crop PDF Pages Online – Trim Margins & Whitespace",
        "category": "pdf",
        "title": "Crop PDF Online Free – Trim Margins & Whitespace from PDF",
        "description": "Crop PDF pages to trim unwanted margins, printer marks, and whitespace. Apply crop box to specific pages or all pages.",
        "keywords": ["crop pdf", "trim pdf margins", "remove whitespace from pdf online"],
        "howItWorks": ["Upload PDF.", "Drag bounding box to define crop area.", "Apply crop and download."]
    },
    {
        "slug": "protect-pdf",
        "name": "Protect PDF",
        "h1": "Password Protect PDF Online – Encrypt PDF with AES-256",
        "category": "pdf",
        "title": "Password Protect PDF Online Free – Encrypt PDF Document with AES",
        "description": "Secure your confidential PDF documents with strong AES encryption. Add opening passwords and restrict printing, copying, and editing permissions.",
        "keywords": ["protect pdf", "password protect pdf", "encrypt pdf online free", "set pdf password"],
        "howItWorks": ["Upload PDF.", "Enter strong password and select permission restrictions.", "Download encrypted PDF."]
    },
    {
        "slug": "unlock-pdf",
        "name": "Unlock PDF",
        "h1": "Unlock PDF Online – Remove Password & Editing Permissions",
        "category": "pdf",
        "title": "Unlock PDF Online Free – Remove PDF Password and Security",
        "description": "Remove password protection and printing/copying restrictions from PDF files you are authorized to access.",
        "keywords": ["unlock pdf", "remove password from pdf", "decrypt pdf online", "remove pdf permissions"],
        "howItWorks": ["Upload protected PDF.", "Enter current password to authorize unlock.", "Download unlocked PDF without restrictions."]
    },
    {
        "slug": "remove-metadata",
        "name": "Remove PDF Metadata",
        "h1": "Remove Metadata from PDF – Sanitize Document Properties",
        "category": "pdf",
        "title": "Remove PDF Metadata Online Free – Sanitize PDF Properties for Privacy",
        "description": "Strip author names, software creation stamps, GPS coordinates, and identifying metadata from PDF files for total privacy.",
        "keywords": ["remove metadata from pdf", "sanitize pdf properties", "clean pdf metadata online"],
        "howItWorks": ["Upload PDF.", "Strip Title, Author, Subject, Keywords, and Creator stamps.", "Download sanitized PDF."]
    },
    {
        "slug": "ocr-pdf",
        "name": "OCR PDF",
        "h1": "OCR PDF Online – Optical Character Recognition & Searchable Text",
        "category": "pdf",
        "title": "OCR PDF Online Free – Make Scanned PDFs Searchable & Copyable",
        "description": "Extract text from scanned PDF documents using Optical Character Recognition (OCR). Produce a searchable PDF with selectable text.",
        "keywords": ["ocr pdf", "optical character recognition pdf", "make scanned pdf searchable", "ocr pdf online free"],
        "howItWorks": ["Upload scanned PDF file.", "Select language of document.", "Run OCR text recognition.", "Download searchable PDF."]
    },
    {
        "slug": "image-to-text",
        "name": "Image to Text OCR",
        "h1": "Image to Text OCR – Extract Text from Photos & Screenshots",
        "category": "pdf",
        "title": "Image to Text OCR Online – Extract Text from Photos and Images Free",
        "description": "Extract editable text from images, photos, and screenshots using high-accuracy Optical Character Recognition.",
        "keywords": ["image to text", "extract text from image", "photo ocr online", "picture to text converter"],
        "howItWorks": ["Upload image (JPG, PNG).", "OCR engine detects characters.", "Copy or download extracted text."]
    },
    {
        "slug": "scan-to-pdf",
        "name": "Scan to PDF",
        "h1": "Scan to PDF – Turn Camera Photos into Searchable PDF",
        "category": "pdf",
        "title": "Scan to PDF Online Free – Convert Scanned Documents into Searchable PDF",
        "description": "Combine camera photos and scanned paper documents into a clean, searchable PDF with automated OCR text recognition.",
        "keywords": ["scan to pdf", "convert scan to pdf", "mobile camera scan to pdf"],
        "howItWorks": ["Upload photos of document pages.", "Apply OCR and straighten pages.", "Download multi-page searchable PDF."]
    }
]

# Ensure default howItWorks and faq for any tools missing them
for t in tools:
    if "howItWorks" not in t or not t["howItWorks"]:
        t["howItWorks"] = [
            f"Open the {t['name']} workspace in your browser.",
            "Input or upload your files or parameters into the editor.",
            "Configure options and click run or convert.",
            "Review, copy, or download your processed output instantly."
        ]
    if "faq" not in t or not t["faq"]:
        t["faq"] = [
            {"question": f"Is {t['name']} free to use?", "answer": f"Yes, {t['name']} is 100% free with no registration, usage limits, or hidden fees."},
            {"question": "Are my files or data private?", "answer": "Yes. All processing executes in-memory or directly client-side in your web browser with zero persistent file storage."}
        ]

ts_content = """export interface ToolMetadata {
  slug: string;
  name: string;
  h1: string;
  category: 'developer' | 'security' | 'pdf' | 'finance' | 'utility';
  title: string;
  description: string;
  keywords: string[];
  faq: { question: string; answer: string }[];
  howItWorks: string[];
}

export const TOOLS_REGISTRY: ToolMetadata[] = """ + json.dumps(tools, indent=2) + """;

export function getToolMetadataBySlug(slug: string): ToolMetadata | undefined {
  return TOOLS_REGISTRY.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolMetadata['category']): ToolMetadata[] {
  return TOOLS_REGISTRY.filter((t) => t.category === category);
}
"""

with open(out_path, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Successfully generated {len(tools)} tools in {out_path}")
