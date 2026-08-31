export interface ToolBlueprint {
  slug: string;
  name: string;
  category: 'Developer Tools' | 'Security Tools' | 'PDF Studio' | 'Utility Tools' | 'Finance Tools' | 'AI Tools';
  path: string;
  primaryKeyword: string;
  searchVolume: string;
  kd: string;
  intent: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  ogTitle: string;
  ogDescription: string;
  keywords: string[];
  faqs: Array<{ q: string; a: string }>;
  howToSteps?: Array<{ step: string; instruction: string }>;
  siloLinks: Array<{ name: string; href: string; type: 'primary' | 'cross' }>;
}

export const SEO_MASTER_BLUEPRINT: Record<string, ToolBlueprint> = {
  // Category 1: Developer Tools
  'regex-tester': {
    slug: 'regex-tester',
    name: 'Regex Tester & Debugger',
    category: 'Developer Tools',
    path: '/regex-tester',
    primaryKeyword: 'regex tester',
    searchVolume: '450,000/mo',
    kd: '72%',
    intent: 'Utility / Tool',
    seoTitle: 'Regex Tester & Debugger Online – Real-Time Regular Expression Validator',
    metaDescription: 'Test, validate, and debug regular expressions online in real-time. Supports JavaScript, Python, PCRE, Go regex flavors with visual match highlighting.',
    h1: 'Online Regex Tester, Debugger & Cheat Sheet',
    ogTitle: 'Free Online Regex Tester & Debugger',
    ogDescription: 'Build and test regex expressions instantly with syntax highlighting and match explanations.',
    keywords: [
      'regex tester', 'regular expression tester', 'regex debugger', 'online regex tester',
      'test regex online', 'regex validator', 'regex tester javascript python',
      'extract match groups regex tester', 'multiline regex tester online'
    ],
    faqs: [
      {
        q: 'Which regex flavors are supported?',
        a: 'Full support for ECMAScript (JavaScript), Python re, PCRE, Golang, and Java regex syntaxes.'
      },
      {
        q: 'How do regular expressions work?',
        a: 'Regular expressions use patterns of characters and metacharacters to find, match, and replace substrings in text.'
      },
      {
        q: 'How to match email using regex?',
        a: 'A common standard email pattern is ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$ which validates username, domain, and TLD.'
      }
    ],
    howToSteps: [
      { step: 'Enter Regex Pattern', instruction: 'Type your regular expression pattern in the pattern bar with optional flags (g, i, m, s).' },
      { step: 'Paste Test String', instruction: 'Input or paste the target text to evaluate in the test editor.' },
      { step: 'Inspect Matches & Groups', instruction: 'Review real-time highlighted matches, capture group tables, and substitution output.' }
    ],
    siloLinks: [
      { name: 'JSON Formatter', href: '/json-formatter', type: 'primary' },
      { name: 'Base64 Encoder / Decoder', href: '/base64-encoder-decoder', type: 'primary' },
      { name: 'Cron Expression Generator', href: '/cron-expression-generator', type: 'primary' },
      { name: 'AI SQL Generator', href: '/sql-generator', type: 'cross' }
    ]
  },

  'json-formatter': {
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator',
    category: 'Developer Tools',
    path: '/json-formatter',
    primaryKeyword: 'json formatter',
    searchVolume: '820,000/mo',
    kd: '78%',
    intent: 'Utility / Tool',
    seoTitle: 'JSON Formatter & Validator – Beautify, Parse & Clean JSON Online',
    metaDescription: 'Free online JSON Formatter and Validator. Format, beautify, minify, and debug invalid JSON code instantly with tree view and syntax checking.',
    h1: 'Online JSON Formatter, Beautifier & Validator',
    ogTitle: 'Online JSON Formatter & Validator',
    ogDescription: 'Beautify and inspect JSON strings with real-time error detection.',
    keywords: [
      'json formatter', 'json validator', 'json beautifier', 'json parser online',
      'format json', 'clean json online', 'format json string online free',
      'json tree viewer and editor', 'validate json syntax errors online', 'minify and beautify json'
    ],
    faqs: [
      {
        q: 'Is my JSON data sent to any server?',
        a: 'No, all JSON parsing, formatting, and validation happens 100% locally in your browser.'
      },
      {
        q: 'How to fix invalid JSON errors?',
        a: 'Common syntax issues include missing closing brackets, trailing commas, single quotes instead of double quotes, and unquoted keys.'
      },
      {
        q: 'What is the difference between minify and beautify?',
        a: 'Beautify indents JSON with spaces (2 or 4) for human readability, whereas minify strips all whitespace to minimize payload size.'
      }
    ],
    siloLinks: [
      { name: 'JWT Decoder', href: '/jwt-decoder', type: 'primary' },
      { name: 'Base64 Encoder / Decoder', href: '/base64-encoder-decoder', type: 'primary' },
      { name: 'Regex Tester', href: '/regex-tester', type: 'primary' },
      { name: 'UUID Generator', href: '/uuid-generator', type: 'cross' }
    ]
  },

  'jwt-decoder': {
    slug: 'jwt-decoder',
    name: 'JWT Decoder & Token Inspector',
    category: 'Developer Tools',
    path: '/jwt-decoder',
    primaryKeyword: 'jwt decoder',
    searchVolume: '210,000/mo',
    kd: '54%',
    intent: 'Utility / Dev',
    seoTitle: 'JWT Decoder Online – Inspect & Decode JSON Web Tokens Client-Side',
    metaDescription: 'Decode JSON Web Tokens (JWT) instantly online. View header, payload, claims, and signature with zero server transmission. 100% private.',
    h1: 'Fast & Private JWT Token Decoder',
    ogTitle: 'JWT Decoder – Decode & Inspect JWTs Privately',
    ogDescription: 'Inspect JWT claims, headers, and expiration dates instantly.',
    keywords: [
      'jwt decoder', 'jwt io decoder', 'decode jwt token online', 'json web token parser',
      'jwt payload viewer', 'decode jwt token without secret key', 'check jwt expiration online',
      'inspect jwt header payload signature', 'decode jwt payload client side'
    ],
    faqs: [
      {
        q: 'Can I decode a JWT without having the secret key?',
        a: 'Yes. A JWT payload is Base64Url-encoded, so anyone can inspect the claims without the secret key.'
      },
      {
        q: 'Is decoding JWT safe online?',
        a: 'Yes on AllTools, because decoding executes entirely in client-side JavaScript without any network API transmissions.'
      },
      {
        q: 'What is the exp claim in JWT?',
        a: 'The exp claim specifies the Unix epoch timestamp when the token expires and becomes invalid.'
      }
    ],
    siloLinks: [
      { name: 'JSON Formatter', href: '/json-formatter', type: 'primary' },
      { name: 'Base64 Encoder', href: '/base64-encoder-decoder', type: 'primary' },
      { name: 'Password Generator', href: '/password-generator', type: 'cross' },
      { name: 'SSL Certificate Checker', href: '/ssl-certificate-checker', type: 'cross' }
    ]
  },

  'sql-generator': {
    slug: 'sql-generator',
    name: 'AI SQL Query Generator',
    category: 'Developer Tools',
    path: '/sql-generator',
    primaryKeyword: 'ai sql generator',
    searchVolume: '90,000/mo',
    kd: '38%',
    intent: 'Commercial / Utility',
    seoTitle: 'AI SQL Query Generator – Convert Text to SQL Free Online',
    metaDescription: 'Generate clean, optimized SQL queries from plain English using AI. Supports MySQL, PostgreSQL, MS SQL, Snowflake, and SQLite. Try free.',
    h1: 'AI SQL Query Generator (Text to SQL in Seconds)',
    ogTitle: 'AI SQL Generator – Write SQL Using Plain English',
    ogDescription: 'Build joins, aggregations, and subqueries with automated AI prompts.',
    keywords: [
      'ai sql generator', 'text to sql ai', 'natural language to sql', 'free ai sql writer',
      'generate sql query online', 'generate mysql postgres queries with ai', 'ai prompt to sql query generator'
    ],
    faqs: [
      {
        q: 'What SQL dialects does the AI support?',
        a: 'PostgreSQL, MySQL, SQL Server, Oracle, BigQuery, Snowflake, and SQLite.'
      },
      {
        q: 'Can AI write complex SQL joins and subqueries?',
        a: 'Yes, provide schema details or plain English requirements to generate multi-table INNER/LEFT JOINs and aggregation logic.'
      }
    ],
    siloLinks: [
      { name: 'JSON Formatter', href: '/json-formatter', type: 'primary' },
      { name: 'Cron Expression Generator', href: '/cron-expression-generator', type: 'primary' },
      { name: 'Regex Tester', href: '/regex-tester', type: 'primary' },
      { name: 'Resume ATS Checker', href: '/resume-ats-checker', type: 'cross' }
    ]
  },

  'gitignore-generator': {
    slug: 'gitignore-generator',
    name: 'Git Ignore Generator',
    category: 'Developer Tools',
    path: '/gitignore-generator',
    primaryKeyword: 'gitignore generator',
    searchVolume: '75,000/mo',
    kd: '32%',
    intent: 'Utility / Dev',
    seoTitle: '.gitignore Generator – Create Custom .gitignore Files Instantly',
    metaDescription: 'Easily create tailored .gitignore files for Node.js, Python, Java, React, VS Code, JetBrains, macOS, and 200+ technologies in one click.',
    h1: 'Custom .gitignore File Generator & Templates',
    ogTitle: 'Free .gitignore File Generator',
    ogDescription: 'Generate clean .gitignore templates for any stack.',
    keywords: [
      'gitignore generator', 'git ignore builder', 'generate gitignore online', 'create gitignore file',
      'gitignore templates', 'gitignore generator for node python react unity', 'combined gitignore template for monorepo'
    ],
    faqs: [
      {
        q: 'Can I combine multiple languages and IDEs?',
        a: 'Yes, select multiple tags (e.g., Python, macOS, PyCharm) to merge ignore rules automatically.'
      },
      {
        q: 'What should always be in a .gitignore file?',
        a: 'Environment variables (.env), OS artifacts (.DS_Store, Thumbs.db), build outputs (/dist, /build, /target), and dependency folders (/node_modules, /venv).'
      }
    ],
    siloLinks: [
      { name: 'UUID Generator', href: '/uuid-generator', type: 'primary' },
      { name: 'Base64 Encoder', href: '/base64-encoder-decoder', type: 'primary' },
      { name: 'Cron Expression Generator', href: '/cron-expression-generator', type: 'primary' },
      { name: 'AI SQL Generator', href: '/sql-generator', type: 'cross' }
    ]
  },

  'base64-encoder-decoder': {
    slug: 'base64-encoder-decoder',
    name: 'Base64 Encoder & Decoder',
    category: 'Developer Tools',
    path: '/base64-encoder-decoder',
    primaryKeyword: 'base64 encode decode',
    searchVolume: '680,000/mo',
    kd: '76%',
    intent: 'Utility / Dev',
    seoTitle: 'Base64 Encoder & Decoder – Convert Text, URLs & Images Online',
    metaDescription: 'Quickly encode and decode Base64 strings, files, URLs, and images. Real-time conversion, UTF-8 and URL-safe formats supported.',
    h1: 'Base64 Encoder and Decoder Online',
    ogTitle: 'Base64 Encoder & Decoder Online',
    ogDescription: 'Convert text, files, and image data URIs to and from Base64.',
    keywords: [
      'base64 encode decode', 'base64 decoder online', 'base64 converter', 'string to base64',
      'base64 to image', 'base64 decode url safe online', 'encode image to base64 data uri'
    ],
    faqs: [
      {
        q: 'What is the difference between Base64 and Base64URL?',
        a: 'Base64URL replaces "+" and "/" with "-" and "_" to prevent URL parameter conflicts.'
      },
      {
        q: 'How does Base64 encoding work?',
        a: 'Base64 encoding takes binary data and converts it into a set of 64 printable ASCII characters (A-Z, a-z, 0-9, +, /).'
      }
    ],
    siloLinks: [
      { name: 'JWT Decoder', href: '/jwt-decoder', type: 'primary' },
      { name: 'JSON Formatter', href: '/json-formatter', type: 'primary' },
      { name: 'QR Code Generator', href: '/qr-generator', type: 'cross' },
      { name: 'Image Compressor', href: '/image-compressor', type: 'cross' }
    ]
  },

  'uuid-generator': {
    slug: 'uuid-generator',
    name: 'UUID / GUID Generator',
    category: 'Developer Tools',
    path: '/uuid-generator',
    primaryKeyword: 'uuid generator',
    searchVolume: '310,000/mo',
    kd: '61%',
    intent: 'Utility / Dev',
    seoTitle: 'UUID & GUID Generator – Bulk Generate Version 1 & 4 UUIDs Online',
    metaDescription: 'Generate cryptographically secure UUIDs (v1, v4, v7) in bulk. Copy, format uppercase/lowercase, and download lists instantly.',
    h1: 'Online UUID & GUID Generator (v1, v4, v7)',
    ogTitle: 'Fast Online UUID / GUID Generator',
    ogDescription: 'Generate unique identifiers in bulk with custom format options.',
    keywords: [
      'uuid generator', 'guid generator online', 'uuid v4 generator', 'bulk uuid generator',
      'random uuid maker', 'generate 1000 uuid v4 online', 'cryptographically secure uuid generator'
    ],
    faqs: [
      {
        q: 'Are the generated UUIDs random and secure?',
        a: "Yes, they use the Web Crypto API's cryptographically secure pseudo-random number generator (CSPRNG)."
      },
      {
        q: 'How many possible UUID v4 combinations exist?',
        a: 'A UUID v4 contains 122 random bits, yielding 2^122 (or ~5.3 × 10^36) possible unique values with virtually zero probability of collision.'
      }
    ],
    siloLinks: [
      { name: 'Password Generator', href: '/password-generator', type: 'primary' },
      { name: 'JSON Formatter', href: '/json-formatter', type: 'primary' },
      { name: 'Git Ignore Generator', href: '/gitignore-generator', type: 'primary' },
      { name: 'AI SQL Generator', href: '/sql-generator', type: 'cross' }
    ]
  },

  'cron-expression-generator': {
    slug: 'cron-expression-generator',
    name: 'Cron Expression Generator & Editor',
    category: 'Developer Tools',
    path: '/cron-expression-generator',
    primaryKeyword: 'cron expression generator',
    searchVolume: '290,000/mo',
    kd: '58%',
    intent: 'Utility / Dev',
    seoTitle: 'Cron Expression Generator & Crontab Schedule Builder Online',
    metaDescription: 'Build, test, and describe cron expressions easily with interactive UI. Generate Linux crontab, Quartz, and AWS EventBridge schedules.',
    h1: 'Cron Expression Generator & Human-Readable Schedule Builder',
    ogTitle: 'Cron Expression Generator & Builder',
    ogDescription: 'Generate accurate crontab schedules with human-readable descriptions.',
    keywords: [
      'cron expression generator', 'crontab generator', 'cron tab builder', 'cron schedule maker',
      'cron syntax generator', 'cron expression generator every 5 minutes', 'crontab every 5 minutes generator'
    ],
    faqs: [
      {
        q: 'What are the 5 standard cron fields?',
        a: 'Minute (0-59), Hour (0-23), Day of Month (1-31), Month (1-12), and Day of Week (0-6).'
      },
      {
        q: 'What do the 5 asterisks (* * * * *) in crontab mean?',
        a: 'Five asterisks in crontab syntax means the command executes every single minute of every day.'
      }
    ],
    siloLinks: [
      { name: 'Regex Tester', href: '/regex-tester', type: 'primary' },
      { name: 'AI SQL Generator', href: '/sql-generator', type: 'primary' },
      { name: 'Git Ignore Generator', href: '/gitignore-generator', type: 'primary' },
      { name: 'UUID Generator', href: '/uuid-generator', type: 'cross' }
    ]
  },

  'dns-lookup': {
    slug: 'dns-lookup',
    name: 'DNS Lookup & Records Checker',
    category: 'Developer Tools',
    path: '/dns-lookup',
    primaryKeyword: 'dns lookup',
    searchVolume: '380,000/mo',
    kd: '65%',
    intent: 'Utility / WebOps',
    seoTitle: 'DNS Lookup Tool – Check Domain DNS Records (A, MX, TXT, CNAME)',
    metaDescription: 'Perform instant DNS lookups on any domain. Query A, AAAA, MX, CNAME, TXT, NS, and SOA records across worldwide servers.',
    h1: 'Online DNS Lookup & Domain Records Inspector',
    ogTitle: 'DNS Lookup Tool – Query All DNS Records',
    ogDescription: 'Check live DNS status and propagation worldwide.',
    keywords: [
      'dns lookup', 'dns checker', 'nslookup online', 'check dns records', 'find domain ip',
      'mx record lookup', 'lookup txt a aaaa cname mx records', 'check global dns propagation online'
    ],
    faqs: [
      {
        q: 'What DNS record types can this tool query?',
        a: 'It queries A, AAAA, CNAME, MX, TXT, NS, SOA, PTR, and SRV records.'
      },
      {
        q: 'What is the difference between an A Record and a CNAME Record?',
        a: 'An A Record maps a hostname to a direct IPv4 address, while a CNAME Record maps an alias name to another canonical domain name.'
      }
    ],
    siloLinks: [
      { name: 'WHOIS Lookup', href: '/whois-lookup', type: 'primary' },
      { name: 'SPF / DKIM / DMARC Checker', href: '/email-security', type: 'primary' },
      { name: 'SSL Certificate Checker', href: '/ssl-certificate-checker', type: 'primary' },
      { name: 'VAPT Scanner', href: '/vapt-scanner', type: 'cross' }
    ]
  },

  'whois-lookup': {
    slug: 'whois-lookup',
    name: 'WHOIS Lookup',
    category: 'Developer Tools',
    path: '/whois-lookup',
    primaryKeyword: 'whois lookup',
    searchVolume: '520,000/mo',
    kd: '74%',
    intent: 'Utility / Informational',
    seoTitle: 'WHOIS Lookup – Check Domain Ownership, Registrar & Expiry Date',
    metaDescription: 'Perform a free WHOIS search to inspect domain owner, registrar, creation & expiration dates, nameservers, and IP registration data.',
    h1: 'WHOIS Domain Lookup & IP Inspector',
    ogTitle: 'WHOIS Lookup – Domain Registration & Owner Search',
    ogDescription: 'Get instant registrar, nameserver, and age data for any domain.',
    keywords: [
      'whois lookup', 'whois domain search', 'check domain owner', 'domain whois database',
      'lookup domain registration', 'find domain registrar and expiration date', 'check if domain is expired whois'
    ],
    faqs: [
      {
        q: 'Why are some WHOIS contact details redacted?',
        a: 'Registrars use GDPR/Privacy Protection services to shield personal contact details from public web scrapers.'
      },
      {
        q: 'How do I find when a domain was registered?',
        a: 'The Creation Date / Registration Date field in the WHOIS lookup displays the exact timestamp when the domain was first registered.'
      }
    ],
    siloLinks: [
      { name: 'DNS Lookup', href: '/dns-lookup', type: 'primary' },
      { name: 'SSL Certificate Checker', href: '/ssl-certificate-checker', type: 'primary' },
      { name: 'SPF / DKIM / DMARC Checker', href: '/email-security', type: 'primary' },
      { name: 'VAPT Scanner', href: '/vapt-scanner', type: 'cross' }
    ]
  },

  // Category 2: Security Tools
  'vapt-scanner': {
    slug: 'vapt-scanner',
    name: 'Online VAPT Scanner',
    category: 'Security Tools',
    path: '/vapt-scanner',
    primaryKeyword: 'vapt scanner',
    searchVolume: '35,000/mo',
    kd: '42%',
    intent: 'Commercial / Security',
    seoTitle: 'Free VAPT Scanner Online – Website Vulnerability & Penetration Test',
    metaDescription: 'Scan websites for OWASP Top 10 vulnerabilities, security misconfigurations, and outdated headers with our fast online VAPT scanner.',
    h1: 'Online VAPT Scanner – Automated Security & Vulnerability Audit',
    ogTitle: 'Free Website VAPT & Vulnerability Scanner',
    ogDescription: "Audit your website's security posture against top cyber threats.",
    keywords: [
      'vapt scanner', 'vulnerability assessment tool', 'online penetration testing scanner',
      'website vulnerability checker', 'vapt testing online', 'automated owasp top 10 scanner',
      'website security headers vapt test'
    ],
    faqs: [
      {
        q: 'What vulnerabilities does this VAPT tool detect?',
        a: 'Missing security headers (CSP, HSTS, X-Frame-Options), open infrastructure ports, outdated server banners, and SSL/TLS configuration weaknesses.'
      },
      {
        q: 'What are the 4 pillars of VAPT testing?',
        a: '1. Network Vulnerability Scanning; 2. Web Application Pen Testing; 3. Configuration & Header Audit; 4. Remediation Reporting & Verification.'
      }
    ],
    siloLinks: [
      { name: 'SSL Certificate Checker', href: '/ssl-certificate-checker', type: 'primary' },
      { name: 'SPF / DKIM / DMARC Checker', href: '/email-security', type: 'primary' },
      { name: 'DNS Lookup', href: '/dns-lookup', type: 'cross' },
      { name: 'WHOIS Lookup', href: '/whois-lookup', type: 'cross' }
    ]
  },

  'email-security': {
    slug: 'email-security',
    name: 'SPF / DKIM / DMARC Checker',
    category: 'Security Tools',
    path: '/email-security',
    primaryKeyword: 'dmarc checker',
    searchVolume: '110,000/mo',
    kd: '39%',
    intent: 'Utility / Email Deliverability',
    seoTitle: 'SPF, DKIM & DMARC Checker – Validate Domain Email Security Records',
    metaDescription: 'Instantly validate SPF, DKIM, and DMARC records for your domain. Ensure Gmail/Yahoo inbox deliverability and prevent email spoofing.',
    h1: 'SPF, DKIM & DMARC Record Validator',
    ogTitle: 'SPF, DKIM & DMARC Record Checker',
    ogDescription: "Test your domain's email authentication and spam score in seconds.",
    keywords: [
      'dmarc checker', 'spf record checker', 'dkim checker online', 'email deliverability test',
      'check domain spf dmarc', 'verify dkim record online free', 'verify spf dkim dmarc alignment online'
    ],
    faqs: [
      {
        q: 'Why are SPF, DKIM, and DMARC mandatory now?',
        a: 'Google and Yahoo enforce strict email authentication policies for senders to eliminate phishing and spoofing.'
      },
      {
        q: 'What is DMARC in email security?',
        a: 'DMARC (Domain-based Message Authentication, Reporting, and Conformance) tells receiving mail servers how to treat unauthenticated emails (none, quarantine, or reject).'
      }
    ],
    siloLinks: [
      { name: 'DNS Lookup', href: '/dns-lookup', type: 'primary' },
      { name: 'SSL Certificate Checker', href: '/ssl-certificate-checker', type: 'primary' },
      { name: 'WHOIS Lookup', href: '/whois-lookup', type: 'primary' },
      { name: 'VAPT Scanner', href: '/vapt-scanner', type: 'cross' }
    ]
  },

  'password-generator': {
    slug: 'password-generator',
    name: 'Password Generator',
    category: 'Security Tools',
    path: '/password-generator',
    primaryKeyword: 'password generator',
    searchVolume: '1,800,000/mo',
    kd: '82%',
    intent: 'Utility / Security',
    seoTitle: 'Random Password Generator – Create Strong, Secure Passwords Online',
    metaDescription: 'Generate strong, highly secure, and random passwords or passphrases with our free online tool. Client-side encryption ensures total privacy.',
    h1: 'Secure Random Password Generator',
    ogTitle: 'Strong Random Password Generator',
    ogDescription: 'Instantly create uncrackable, randomized passwords and passphrases.',
    keywords: [
      'password generator', 'random password generator', 'strong password maker', 'secure password generator',
      'generate password online', 'random password generator with symbols and numbers', 'memorable passphrase generator'
    ],
    faqs: [
      {
        q: 'Is it safe to generate passwords online?',
        a: 'Yes, this tool runs entirely on your browser using Web Crypto API. No passwords are ever saved or transmitted.'
      },
      {
        q: 'How long should a secure password be?',
        a: 'Security experts recommend a minimum of 16 characters including uppercase, lowercase, numbers, and symbols to resist brute-force attacks.'
      }
    ],
    siloLinks: [
      { name: 'Password Strength Checker', href: '/password-strength-checker', type: 'primary' },
      { name: 'UUID Generator', href: '/uuid-generator', type: 'primary' },
      { name: 'Base64 Encoder', href: '/base64-encoder-decoder', type: 'cross' },
      { name: 'JWT Decoder', href: '/jwt-decoder', type: 'cross' }
    ]
  },

  'password-strength-checker': {
    slug: 'password-strength-checker',
    name: 'Password Strength Checker',
    category: 'Security Tools',
    path: '/password-strength-checker',
    primaryKeyword: 'password strength checker',
    searchVolume: '160,000/mo',
    kd: '44%',
    intent: 'Informational / Security',
    seoTitle: 'Password Strength Checker – How Secure Is Your Password?',
    metaDescription: 'Test how strong your password is in real-time. Calculate brute-force crack times, bit entropy, and vulnerability patterns privately client-side.',
    h1: 'Password Strength Checker & Brute Force Estimator',
    ogTitle: 'Password Strength & Entropy Checker',
    ogDescription: 'Find out how long it takes a supercomputer to crack your password.',
    keywords: [
      'password strength checker', 'how secure is my password', 'test password strength',
      'password entropy tester', 'password crack time checker', 'calculate time to brute force password'
    ],
    faqs: [
      {
        q: 'Does this tool store the password I type?',
        a: "Never. All calculations (zxcvbn entropy modeling) execute in your browser's local memory."
      },
      {
        q: 'What is password entropy?',
        a: 'Password entropy measures the unpredictable randomness of a password in bits; 60+ bits is considered robust against modern GPU cracking clusters.'
      }
    ],
    siloLinks: [
      { name: 'Password Generator', href: '/password-generator', type: 'primary' },
      { name: 'JWT Decoder', href: '/jwt-decoder', type: 'primary' },
      { name: 'VAPT Scanner', href: '/vapt-scanner', type: 'cross' },
      { name: 'SSL Certificate Checker', href: '/ssl-certificate-checker', type: 'cross' }
    ]
  },

  'ssl-certificate-checker': {
    slug: 'ssl-certificate-checker',
    name: 'SSL Certificate Checker',
    category: 'Security Tools',
    path: '/ssl-certificate-checker',
    primaryKeyword: 'ssl checker',
    searchVolume: '220,000/mo',
    kd: '59%',
    intent: 'Utility / DevOps',
    seoTitle: 'SSL Certificate Checker – Verify SSL Installation & Expiry Date',
    metaDescription: 'Check domain SSL/TLS certificate validity, issuer authority, expiration date, SANs, and certificate chain trust issues in seconds.',
    h1: 'SSL / TLS Certificate Checker & Chain Validator',
    ogTitle: 'SSL Certificate Checker Online',
    ogDescription: 'Troubleshoot SSL installation errors and certificate expiration instantly.',
    keywords: [
      'ssl checker', 'ssl certificate checker', 'check ssl expiration', 'test ssl cert online',
      'verify tls certificate', 'check ssl certificate chain validity', 'buy ssl certificate check validity'
    ],
    faqs: [
      {
        q: 'What information does the SSL Checker provide?',
        a: 'Issuer CA, Validity Dates, Subject Alternative Names (SAN), Chain completeness, and cipher strength.'
      },
      {
        q: 'Why is an SSL certificate important?',
        a: 'SSL encrypts sensitive traffic between users and servers, ensures HTTPS data integrity, and improves Google search rankings.'
      }
    ],
    siloLinks: [
      { name: 'DNS Lookup', href: '/dns-lookup', type: 'primary' },
      { name: 'WHOIS Lookup', href: '/whois-lookup', type: 'primary' },
      { name: 'VAPT Scanner', href: '/vapt-scanner', type: 'primary' },
      { name: 'SPF / DKIM / DMARC Checker', href: '/email-security', type: 'cross' }
    ]
  },

  // Category 3: PDF Studio
  'document-tools': {
    slug: 'document-tools',
    name: 'PDF Studio Suite',
    category: 'PDF Studio',
    path: '/document-tools',
    primaryKeyword: 'online pdf editor',
    searchVolume: '5,400,000/mo',
    kd: '85%',
    intent: 'Utility / Hub',
    seoTitle: 'PDF Studio – 25+ Free Online PDF Tools to Merge, Compress & Convert',
    metaDescription: 'All-in-one free online PDF Studio. Merge, split, compress, convert PDF to Word/Excel/JPG, sign, and password-protect PDFs with zero file limits.',
    h1: 'PDF Studio: 25+ Free Online PDF Editing & Conversion Tools',
    ogTitle: 'PDF Studio – Free Online PDF Tools Suite',
    ogDescription: 'Merge, compress, convert, and protect PDF files in seconds with no watermarks.',
    keywords: [
      'online pdf editor', 'pdf tools', 'merge pdf', 'compress pdf', 'pdf to word',
      'split pdf', 'sign pdf', 'protect pdf', 'unlock pdf', 'pdf converter', 'word to pdf'
    ],
    faqs: [
      {
        q: 'Are my uploaded PDF documents secure?',
        a: 'Yes, files are processed using in-server pure JavaScript engines and deleted immediately after conversion.'
      },
      {
        q: 'Can I convert Word DOCX and Excel XLSX to PDF?',
        a: 'Yes, AllTools provides high-speed, in-memory conversion for Word, Excel, and PowerPoint with zero external software requirements.'
      }
    ],
    siloLinks: [
      { name: 'Image Compressor', href: '/image-compressor', type: 'primary' },
      { name: 'QR Code Generator', href: '/qr-generator', type: 'primary' },
      { name: 'Base64 Encoder', href: '/base64-encoder-decoder', type: 'cross' },
      { name: 'Resume ATS Checker', href: '/resume-ats-checker', type: 'cross' }
    ]
  },

  // Category 4: Utility Tools
  'age-calculator': {
    slug: 'age-calculator',
    name: 'Age Calculator',
    category: 'Utility Tools',
    path: '/age-calculator',
    primaryKeyword: 'age calculator',
    searchVolume: '2,200,000/mo',
    kd: '79%',
    intent: 'Utility / Direct Answer',
    seoTitle: 'Age Calculator – Calculate Exact Age in Years, Months, Days & Hours',
    metaDescription: 'Calculate your exact age from date of birth in years, months, weeks, days, hours, and minutes. Includes next birthday countdown.',
    h1: 'Online Age Calculator & Date of Birth Breakdown',
    ogTitle: 'Exact Age Calculator Online',
    ogDescription: 'Calculate your exact age, days lived, and next birthday countdown.',
    keywords: [
      'age calculator', 'calculate age online', 'birthday age calculator', 'date of birth calculator',
      'how old am i calculator', 'exact age in years months days hours minutes', 'calculate age from date of birth to current date'
    ],
    faqs: [
      {
        q: 'How does the age calculator handle leap years?',
        a: 'The algorithm accounts for 366-day leap years across the entire date range for 100% precision.'
      },
      {
        q: 'How to calculate exact age between two dates?',
        a: 'Subtract birth year from target year, adjusting backwards by 1 year if current month/day precedes birth month/day. Count elapsed full months and remaining calendar days.'
      }
    ],
    siloLinks: [
      { name: 'Bengali Calendar', href: '/bengali-calendar', type: 'primary' },
      { name: 'GST Calculator', href: '/gst-calculator', type: 'primary' },
      { name: 'SIP Calculator', href: '/sip-calculator', type: 'primary' },
      { name: 'QR Code Generator', href: '/qr-generator', type: 'cross' }
    ]
  },

  'bengali-calendar': {
    slug: 'bengali-calendar',
    name: 'Bengali Calendar (বাংলা ক্যালেন্ডার)',
    category: 'Utility Tools',
    path: '/bengali-calendar',
    primaryKeyword: 'bengali calendar',
    searchVolume: '450,000/mo',
    kd: '34%',
    intent: 'Regional / Informational',
    seoTitle: "Bengali Calendar 1431-1432 – Today's Bangla Date, Panjika & Festivals",
    metaDescription: "Check today's Bengali date, complete 1431-1432 Bangla Panjika, Tithi, Durga Puja holidays, and marriage Shubh Muhurat timings online.",
    h1: 'Bengali Calendar (বাংলা ক্যালেন্ডার) & Daily Panjika',
    ogTitle: 'Bengali Calendar & Panjika Online',
    ogDescription: 'Accurate Bengali dates, festive calendar, and Shubh Muhurat.',
    keywords: [
      'bengali calendar', 'bangla calendar', 'bangla calendar today date', 'bengali panjika',
      'bangla date today', 'bangla calendar 1431 1432', 'bengali calendar 1431 shubh muhurat', 'today bengali date in west bengal'
    ],
    faqs: [
      {
        q: 'Does this show both Indian and Bangladeshi Bengali calendar dates?',
        a: 'Yes, it includes toggle modes for both traditional Indian Suryasidhanta/Drik and revised Bangladeshi formats.'
      },
      {
        q: 'How to find Shubh Muhurat dates for marriage in Bengali Calendar?',
        a: 'The panjika section displays auspicious Lagna and Shubho Bibaho dates calculated according to astrological planetary positions.'
      }
    ],
    siloLinks: [
      { name: 'Age Calculator', href: '/age-calculator', type: 'primary' },
      { name: 'GST Calculator', href: '/gst-calculator', type: 'primary' },
      { name: 'Indian Stock Market Live', href: '/stock-market', type: 'cross' },
      { name: 'QR Code Generator', href: '/qr-generator', type: 'cross' }
    ]
  },

  'qr-generator': {
    slug: 'qr-generator',
    name: 'QR Code Generator',
    category: 'Utility Tools',
    path: '/qr-generator',
    primaryKeyword: 'qr code generator',
    searchVolume: '1,950,000/mo',
    kd: '83%',
    intent: 'Utility / Commercial',
    seoTitle: 'Free QR Code Generator – Create Custom QR Codes with Logo (PNG, SVG)',
    metaDescription: 'Generate free, customized QR codes for URLs, WiFi, UPI payments, VCards, and text. Add logos, colors, and download in high-res PNG or SVG.',
    h1: 'Free Custom QR Code Generator with Logo & Colors',
    ogTitle: 'Free QR Code Maker with Logo Support',
    ogDescription: 'Create permanent, high-resolution QR codes in seconds.',
    keywords: [
      'qr code generator', 'create qr code', 'free qr code maker', 'qr generator online',
      'custom qr code with logo', 'create qr code for wifi password free', 'free high resolution vector svg qr code generator'
    ],
    faqs: [
      {
        q: 'Do the generated QR codes ever expire?',
        a: 'No. Static QR codes encode data directly into the pixel pattern and will work forever with no scan limits.'
      },
      {
        q: 'How to create a QR code for WiFi login?',
        a: 'Select the WiFi tab, enter your SSID Network Name, Encryption Type (WPA/WPA2), and Password to generate an instant auto-connect code.'
      }
    ],
    siloLinks: [
      { name: 'Image Compressor', href: '/image-compressor', type: 'primary' },
      { name: 'Base64 Encoder', href: '/base64-encoder-decoder', type: 'primary' },
      { name: 'PDF Studio', href: '/document-tools', type: 'primary' },
      { name: 'Age Calculator', href: '/age-calculator', type: 'cross' }
    ]
  },

  'image-compressor': {
    slug: 'image-compressor',
    name: 'Image Compressor',
    category: 'Utility Tools',
    path: '/image-compressor',
    primaryKeyword: 'image compressor',
    searchVolume: '1,400,000/mo',
    kd: '77%',
    intent: 'Utility / Tool',
    seoTitle: 'Image Compressor Online – Compress JPG, PNG & WebP Without Quality Loss',
    metaDescription: 'Compress and reduce image file sizes up to 90% without visible quality loss. Batch optimize JPG, PNG, and WebP images directly in your browser.',
    h1: 'Smart Online Image Compressor (JPG, PNG, WebP)',
    ogTitle: 'Free Online Image Compressor',
    ogDescription: 'Shrink image sizes by 80%+ while preserving crisp visual clarity.',
    keywords: [
      'image compressor', 'compress image online', 'reduce image size', 'compress jpeg',
      'compress png without losing quality', 'webp converter', 'compress image to 50kb 100kb online'
    ],
    faqs: [
      {
        q: 'Is there a file upload size limit?',
        a: 'Since image compression runs directly on your device via client-side processing, you can compress files up to 50MB with instant preview.'
      },
      {
        q: 'How to compress an image to under 200 KB for online portals?',
        a: 'Select the Max 200 KB preset button, and the smart multi-pass algorithm will scale and re-encode the file to fit within the exact file size threshold.'
      }
    ],
    siloLinks: [
      { name: 'PDF Studio', href: '/document-tools', type: 'primary' },
      { name: 'Base64 Encoder', href: '/base64-encoder-decoder', type: 'primary' },
      { name: 'QR Code Generator', href: '/qr-generator', type: 'primary' },
      { name: 'Resume ATS Checker', href: '/resume-ats-checker', type: 'cross' }
    ]
  },

  // Category 5: Finance Tools
  'stock-market': {
    slug: 'stock-market',
    name: 'Indian Stock Market Live Updates',
    category: 'Finance Tools',
    path: '/stock-market',
    primaryKeyword: 'indian stock market live',
    searchVolume: '1,100,000/mo',
    kd: '71%',
    intent: 'Informational / Tool',
    seoTitle: 'Indian Stock Market Live – Nifty 50, Sensex & NSE BSE Share Prices Today',
    metaDescription: 'Track live Indian stock market updates, Nifty 50, Sensex, Bank Nifty, top gainers/losers, heatmaps, and real-time NSE/BSE stock charts.',
    h1: 'Live Indian Stock Market (Nifty 50, Sensex & NSE Tracker)',
    ogTitle: 'Live Indian Stock Market Updates – Nifty & Sensex',
    ogDescription: 'Real-time quotes, indices, and market breadth for NSE and BSE.',
    keywords: [
      'indian stock market live', 'nifty 50 live share price', 'sensex live today',
      'share market live chart', 'bse nse live market watch', 'nifty bank live index today chart'
    ],
    faqs: [
      {
        q: 'What are the trading hours for NSE and BSE?',
        a: 'Normal trading session is open Monday to Friday from 9:15 AM to 3:30 PM IST.'
      },
      {
        q: 'What is the difference between Nifty 50 and Sensex?',
        a: 'Nifty 50 tracks the 50 largest companies listed on the National Stock Exchange (NSE), while Sensex tracks 30 prominent companies on the Bombay Stock Exchange (BSE).'
      }
    ],
    siloLinks: [
      { name: 'SIP Calculator', href: '/sip-calculator', type: 'primary' },
      { name: 'GST Calculator', href: '/gst-calculator', type: 'primary' },
      { name: 'Age Calculator', href: '/age-calculator', type: 'cross' },
      { name: 'Bengali Calendar', href: '/bengali-calendar', type: 'cross' }
    ]
  },

  'gst-calculator': {
    slug: 'gst-calculator',
    name: 'GST Calculator (India)',
    category: 'Finance Tools',
    path: '/gst-calculator',
    primaryKeyword: 'gst calculator',
    searchVolume: '650,000/mo',
    kd: '62%',
    intent: 'Utility / Finance',
    seoTitle: 'GST Calculator India – Calculate Inclusive & Exclusive GST (5%, 12%, 18%, 28%)',
    metaDescription: 'Free online GST calculator for India. Calculate CGST, SGST, IGST inclusive and exclusive amounts with one click. Clear breakdown table included.',
    h1: 'Online GST Calculator (Inclusive & Exclusive Rate Breakdown)',
    ogTitle: 'Online GST Calculator – Indian Tax Rates',
    ogDescription: 'Calculate GST, CGST, and SGST breakdowns instantly.',
    keywords: [
      'gst calculator', 'online gst calculator india', 'calculate gst amount', 'gst reverse calculator',
      'igst cgst sgst calculator', 'calculate gst inclusive and exclusive price', 'reverse gst calculator india'
    ],
    faqs: [
      {
        q: 'What is the formula for calculating GST?',
        a: 'GST Amount = (Original Cost × GST Rate%) / 100. Post-GST Price = Original Cost + GST Amount.'
      },
      {
        q: 'How to remove GST from total price?',
        a: 'To remove GST from an inclusive amount: Pre-GST Amount = Total Inclusive Amount × (100 / (100 + GST%)). For example, if total is $118 with 18% GST: 118 × (100 / 118) = $100 base price.'
      }
    ],
    siloLinks: [
      { name: 'SIP Calculator', href: '/sip-calculator', type: 'primary' },
      { name: 'Indian Stock Market Live', href: '/stock-market', type: 'primary' },
      { name: 'Age Calculator', href: '/age-calculator', type: 'cross' },
      { name: 'QR Code Generator', href: '/qr-generator', type: 'cross' }
    ]
  },

  'sip-calculator': {
    slug: 'sip-calculator',
    name: 'SIP Calculator',
    category: 'Finance Tools',
    path: '/sip-calculator',
    primaryKeyword: 'sip calculator',
    searchVolume: '1,500,000/mo',
    kd: '75%',
    intent: 'Financial Planning',
    seoTitle: 'SIP Calculator – Calculate Mutual Fund SIP Returns & Maturity Value',
    metaDescription: 'Calculate maturity wealth and estimated returns on your monthly Mutual Fund SIP investments with interactive compounding charts and step-up options.',
    h1: 'SIP Calculator – Mutual Fund Wealth & Compounding Estimator',
    ogTitle: 'Mutual Fund SIP Calculator Online',
    ogDescription: 'Forecast your wealth growth, total invested sum, and compounding returns.',
    keywords: [
      'sip calculator', 'mutual fund sip calculator', 'sip return calculator', 'systematic investment plan calculator',
      'step up sip calculator', 'step up sip calculator monthly', 'sip return calculator for 5 10 15 20 years'
    ],
    faqs: [
      {
        q: 'What is the formula for SIP calculation?',
        a: 'The SIP formula is: M = P × [((1 + i)^n – 1) / i] × (1 + i). Here, M is maturity amount, P is periodic monthly deposit, i is periodic interest rate (annual return / 12 / 100), and n is total monthly deposits.'
      },
      {
        q: 'What is a Step-Up SIP?',
        a: 'A Step-Up SIP automatically increases your monthly investment amount by a fixed percentage or sum every year as your income grows.'
      }
    ],
    siloLinks: [
      { name: 'Indian Stock Market Live', href: '/stock-market', type: 'primary' },
      { name: 'GST Calculator', href: '/gst-calculator', type: 'primary' },
      { name: 'Age Calculator', href: '/age-calculator', type: 'cross' },
      { name: 'Resume ATS Checker', href: '/resume-ats-checker', type: 'cross' }
    ]
  },

  // Category 6: AI Tools
  'resume-ats-checker': {
    slug: 'resume-ats-checker',
    name: 'Resume ATS Checker & Keyword Optimizer',
    category: 'AI Tools',
    path: '/resume-ats-checker',
    primaryKeyword: 'resume ats checker',
    searchVolume: '180,000/mo',
    kd: '46%',
    intent: 'Commercial / Career',
    seoTitle: 'Free Resume ATS Checker – Check ATS Score & Match Job Description',
    metaDescription: 'Scan your CV with our AI Resume ATS Checker. Get instant ATS compatibility score, formatting feedback, and missing job keywords for free.',
    h1: 'AI Resume ATS Checker & Formatting Scanner',
    ogTitle: 'Free AI Resume ATS Checker',
    ogDescription: 'Optimize your resume score to beat applicant tracking systems and land interviews.',
    keywords: [
      'resume ats checker', 'ats resume scanner', 'check resume ats score', 'free ats resume checker',
      'ats friendly resume tester', 'resume parser online', 'ats resume format for freshers'
    ],
    faqs: [
      {
        q: 'What does an ATS score check?',
        a: 'Keyword density matches from the job post, clean layout (no tables/text boxes), standard headers, and PDF parseability.'
      },
      {
        q: 'What is a good ATS resume score?',
        a: 'An ATS score of 80% or higher is considered good. A score between 75% and 79% is acceptable, while anything below 70% indicates critical formatting errors, missing keywords, or unreadable styling.'
      }
    ],
    siloLinks: [
      { name: 'PDF Studio', href: '/document-tools', type: 'primary' },
      { name: 'AI SQL Generator', href: '/sql-generator', type: 'cross' },
      { name: 'Password Generator', href: '/password-generator', type: 'cross' }
    ]
  }
};
