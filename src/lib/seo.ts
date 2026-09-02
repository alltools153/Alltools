import { Metadata } from 'next';
import { SEO_MASTER_BLUEPRINT } from './seoMasterBlueprint';

export function getBlueprintMetadata(slug: string): Metadata {
  const bp = SEO_MASTER_BLUEPRINT[slug];
  if (!bp) {
    const fallback = TOOLS_METADATA_CONFIG[slug] || {
      title: 'AllToolss Online Utility',
      description: 'Free high-performance online utility on AllToolss suite.',
      path: `/${slug}`,
      category: 'Utilities',
    };
    return constructToolMetadata(fallback);
  }

  return constructToolMetadata({
    title: bp.seoTitle,
    description: bp.metaDescription,
    path: bp.path,
    category: bp.category,
    keywords: bp.keywords,
  });
}

export const SITE_CONFIG = {
  name: 'AllToolss',
  siteName: 'AllToolss Multi-Tool Suite',
  title: 'AllToolss — Enterprise Developer, Security, PDF, Finance & AI Utilities',
  description: 'Production-ready suite of 40+ high-performance tools: JSON Formatter, Regex Tester, JWT Decoder, AI SQL Generator, Resume ATS Scanner, SSL & DNS Checker, 25+ PDF Tools, GST & SIP Wealth Calculators.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://alltoolss.com',
  primaryDomain: 'alltoolss.com',
  secondaryDomain: 'alltoolss.in',
  primaryUrl: 'https://alltoolss.com',
  secondaryUrl: 'https://alltoolss.in',
  domains: ['alltoolss.com', 'alltoolss.in'],
  author: 'Santanu Batabyal',
  twitterHandle: '@alltools_dev',
};

export interface ToolSeoOptions {
  title: string;
  description: string;
  path: string;
  category?: string;
  keywords?: string[];
  ogImage?: string;
}

/**
 * Builds comprehensive, social-bot optimized metadata for any tool page.
 * Sets unique title, description, canonical URL, OpenGraph tags, and Twitter Cards with dynamic OG images.
 */
export function constructToolMetadata({
  title,
  description,
  path,
  category = 'Utilities',
  keywords = [],
  ogImage,
}: ToolSeoOptions): Metadata {
  const canonicalUrl = `${SITE_CONFIG.url}${path}`;
  const fullTitle = title.includes(SITE_CONFIG.name) ? title : `${title} | ${SITE_CONFIG.name}`;

  // Generate dynamic 1200x630 branded OG preview image if custom image not provided
  const dynamicOgImage =
    ogImage ||
    `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}&cat=${encodeURIComponent(category)}`;

  return {
    title: title, // Root layout template will format to `${title} | AllToolss`
    description,
    keywords: [
      'online tools',
      'developer utilities',
      'security scanner',
      'pdf studio',
      category.toLowerCase(),
      ...keywords,
    ],
    authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.url }],
    creator: SITE_CONFIG.author,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': `https://alltoolss.com${path}`,
        'en-IN': `https://alltoolss.in${path}`,
        'x-default': `https://alltoolss.com${path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: dynamicOgImage,
          width: 1200,
          height: 630,
          alt: `${title} | ${SITE_CONFIG.name}`,
          type: 'image/png',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [dynamicOgImage],
      creator: SITE_CONFIG.twitterHandle,
      site: SITE_CONFIG.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Comprehensive SEO Dictionary for All Standalone Tool Pages
 */
export const TOOLS_METADATA_CONFIG: Record<string, ToolSeoOptions> = {
  // Developer Tools
  'json-formatter': {
    title: 'JSON Formatter & Validator',
    description: 'Format, validate, beautify and minify JSON instantly with interactive syntax tree view and syntax error locator.',
    path: '/json-formatter',
    category: 'Developer Tools',
    keywords: ['json formatter', 'json validator', 'beautify json', 'minify json', 'format json online', 'json parser', 'json tree'],
  },
  'jwt-decoder': {
    title: 'JWT Decoder & Token Inspector',
    description: 'Decode JWT tokens securely and inspect claims, headers, payload and expiration timestamps with zero server calls.',
    path: '/jwt-decoder',
    category: 'Developer Tools',
    keywords: ['jwt decoder', 'jwt token inspector', 'decode jwt online', 'rfc 7519', 'bearer token claims', 'jwt debugger'],
  },
  'regex-tester': {
    title: 'Regex Tester & Expression Debugger',
    description: 'Real-time visual regex match highlighting, flag toggles, capture group tables, replacement generator & cheat sheet.',
    path: '/regex-tester',
    category: 'Developer Tools',
    keywords: ['regex tester', 'regular expression', 'regex debugger', 'regex cheatsheet', 'regex match online', 'pattern match'],
  },
  'sql-generator': {
    title: 'AI SQL Query Generator',
    description: 'Convert natural language prompts into MySQL, PostgreSQL, SQL Server, SQLite and Oracle queries with clause explanations.',
    path: '/sql-generator',
    category: 'Developer Tools',
    keywords: ['ai sql generator', 'text to sql', 'sql query generator', 'natural language to sql', 'database query builder'],
  },
  'gitignore-generator': {
    title: 'Git Ignore Generator',
    description: 'Generate combined .gitignore files for React, Next.js, Node.js, Python, Java, Docker, Terraform, Kubernetes & VS Code.',
    path: '/gitignore-generator',
    category: 'Developer Tools',
    keywords: ['gitignore generator', 'git ignore file', 'create gitignore', 'node gitignore', 'python gitignore', 'react gitignore'],
  },
  'base64-encoder-decoder': {
    title: 'Base64 Encoder / Decoder',
    description: 'Convert text, strings and binary files to Base64 and decode Base64 back to original content with URL-safe encoding.',
    path: '/base64-encoder-decoder',
    category: 'Developer Tools',
    keywords: ['base64 encoder', 'base64 decoder', 'btoa atob online', 'base64 file converter', 'url safe base64'],
  },
  'uuid-generator': {
    title: 'UUID / GUID Generator',
    description: 'Generate bulk UUID v4, v1, v3, v5 and NIL GUIDs with uppercase, lowercase, hyphens, and braces formatting.',
    path: '/uuid-generator',
    category: 'Developer Tools',
    keywords: ['uuid generator', 'guid generator', 'uuid v4', 'bulk uuid generator', 'unique id generator'],
  },
  'cron-expression-generator': {
    title: 'Cron Expression Generator & Explainer',
    description: 'Build, decode and validate Cron expressions with visual human-readable schedules, presets, and upcoming execution timeline.',
    path: '/cron-expression-generator',
    category: 'Developer Tools',
    keywords: ['cron generator', 'cron expression', 'crontab builder', 'cron schedule explainer', 'cron parser'],
  },

  // Security Tools
  'vapt-scanner': {
    title: 'VAPT Security Scanner & OWASP Audit',
    description: 'Perform enterprise-grade VAPT audits: HTTP security headers, SSL/TLS handshake, open ports, and OWASP vulnerability scans.',
    path: '/vapt-scanner',
    category: 'Security Tools',
    keywords: ['vapt scanner', 'owasp security audit', 'website vulnerability scanner', 'security headers test', 'cybersecurity tool'],
  },
  'dns-lookup': {
    title: 'DNS Lookup & Record Inspector',
    description: 'Query authoritative DNS records: A, AAAA, MX, TXT, CNAME, NS, SOA and CAA with fast propagation analysis.',
    path: '/dns-lookup',
    category: 'Security Tools',
    keywords: ['dns lookup', 'dns records checker', 'mx lookup', 'txt record lookup', 'nslookup online', 'dns propagation'],
  },
  'whois-lookup': {
    title: 'WHOIS Lookup & Domain Inspector',
    description: 'Lookup domain registration details, registrar status, creation & expiry dates, name servers, and DNSSEC info.',
    path: '/whois-lookup',
    category: 'Security Tools',
    keywords: ['whois lookup', 'domain whois', 'domain owner lookup', 'check domain registration', 'whois database'],
  },
  'ssl-certificate-checker': {
    title: 'SSL / TLS Certificate Checker',
    description: 'Inspect SSL/TLS certificate validity, issuer, SAN domains, cipher suite, expiry countdown, and chain integrity.',
    path: '/ssl-certificate-checker',
    category: 'Security Tools',
    keywords: ['ssl checker', 'tls certificate test', 'check ssl expiration', 'https security test', 'ssl certificate inspector'],
  },
  'email-security': {
    title: 'SPF, DKIM & DMARC Email Security Checker',
    description: 'Inspect SPF records, DKIM public keys, and DMARC alignment policies with security scorecard and delivery recommendations.',
    path: '/email-security',
    category: 'Security Tools',
    keywords: ['spf checker', 'dkim record checker', 'dmarc validator', 'email security audit', 'email deliverability test'],
  },
  'password-generator': {
    title: 'Cryptographic Password Generator',
    description: 'Generate ultra-secure, cryptographically random passwords with custom symbols, numbers, custom length, and passphrases.',
    path: '/password-generator',
    category: 'Security Tools',
    keywords: ['password generator', 'random password generator', 'secure password maker', 'strong password tool', 'passphrase generator'],
  },
  'password-strength-checker': {
    title: 'Password Strength & Entropy Checker',
    description: 'Calculate password entropy bits, brute-force cracking estimates, pattern dictionary vulnerabilities, and breach exposure.',
    path: '/password-strength-checker',
    category: 'Security Tools',
    keywords: ['password strength checker', 'password entropy', 'how secure is my password', 'password tester', 'brute force calculator'],
  },

  // Utility & AI Tools
  'qr-generator': {
    title: 'QR Code Generator',
    description: 'Generate custom styled QR codes for URLs, plain text, WiFi credentials, Email, and Phone with PNG & SVG high-res downloads.',
    path: '/qr-generator',
    category: 'Utility Tools',
    keywords: ['qr code generator', 'free qr maker', 'wifi qr code', 'download qr png svg', 'custom qr code'],
  },
  'image-compressor': {
    title: 'Smart Image Compressor (< 200 KB)',
    description: 'Iteratively compress JPG, PNG, and WebP images to exact target sizes (< 200KB, < 100KB, < 50KB) for resumes, exams, and portals.',
    path: '/image-compressor',
    category: 'Utility Tools',
    keywords: ['image compressor', 'compress image to 200kb', 'reduce image size', 'compress jpg png', 'photo size reducer'],
  },
  'age-calculator': {
    title: 'Chronological & Cosmic Age Calculator',
    description: 'Calculate exact age in years, months, days, hours, and minutes with Generation Cohorts (Beta, Alpha, Gen Z), Zodiac, and Milestones.',
    path: '/age-calculator',
    category: 'Utility Tools',
    keywords: ['age calculator', 'chronological age', 'calculate age online', 'generation cohort', 'planetary age', 'life milestone calculator'],
  },
  'bengali-calendar': {
    title: 'বাংলা পঞ্জিকা ও ক্যালেন্ডার (Bengali Calendar)',
    description: 'Authentic 1431-1433 Bengali Calendar with Tithi, Nakshatra, Amavasya, Purnima, Ekadashi, festival dates, and live Bengali clock.',
    path: '/bengali-calendar',
    category: 'Utility Tools',
    keywords: ['bengali calendar 1431 1432', 'বাংলা পঞ্জিকা', 'bengali panjika today', 'tithi nakshatra bengali', 'bengali festival calendar'],
  },
  'resume-ats-checker': {
    title: 'AI Resume ATS Score & Keyword Checker',
    description: 'Audit your resume for Applicant Tracking Systems (ATS), detect missing job keywords, calculate match score, and get formatting fixes.',
    path: '/resume-ats-checker',
    category: 'Utility Tools',
    keywords: ['resume ats checker', 'ats score calculator', 'resume keyword scanner', 'free ats resume test', 'cv optimization'],
  },
  'seo-keywords': {
    title: 'SEO Keyword Density & Search Inspector',
    description: 'Analyze content keyword density, search engine snippet previews, heading structure, and meta tags for on-page SEO.',
    path: '/seo-keywords',
    category: 'Utility Tools',
    keywords: ['seo keyword analyzer', 'keyword density checker', 'on page seo tool', 'meta tag preview', 'serp preview tool'],
  },

  // Finance Tools
  'stock-market': {
    title: 'Sensex & Nifty 50 Live Market View',
    description: 'Real-time Indian stock market tracker for BSE Sensex, Nifty 50, Bank Nifty, top gainers, losers, sector performance, and market status.',
    path: '/stock-market',
    category: 'Finance Tools',
    keywords: ['sensex live', 'nifty 50 live', 'indian stock market tracker', 'bse nse market status', 'stock market live updates'],
  },
  'gst-calculator': {
    title: 'India GST Calculator (Inclusive & Exclusive)',
    description: 'Calculate CGST, SGST, IGST and total invoice price for 5%, 12%, 18%, 28% tax slabs with instant tax breakdown.',
    path: '/gst-calculator',
    category: 'Finance Tools',
    keywords: ['gst calculator', 'gst inclusive calculator', 'gst exclusive calculator', 'cgst sgst calculation', 'india gst tax tool'],
  },
  'sip-calculator': {
    title: 'SIP & Mutual Fund Wealth Calculator',
    description: 'Calculate future wealth and returns for Systematic Investment Plans (SIP), lump sum investments, with inflation adjustment and growth charts.',
    path: '/sip-calculator',
    category: 'Finance Tools',
    keywords: ['sip calculator', 'mutual fund calculator', 'systematic investment plan', 'wealth growth calculator', 'compound interest calculator'],
  },

  // PDF Studio
  'document-tools': {
    title: 'PDF Studio & Document Tools (25+ Tools)',
    description: 'Complete in-server document suite: Word to PDF, Excel to PDF, Merge, Split, Compress, Protect, Unlock, Watermark, and Page Numbers.',
    path: '/document-tools',
    category: 'PDF Studio',
    keywords: ['pdf studio', 'pdf tools online', 'convert to pdf', 'merge pdf', 'split pdf', 'compress pdf', 'word to pdf', 'excel to pdf'],
  },

  // System & Developers
  'dev-tools': {
    title: 'Developer Tools Directory',
    description: 'Explore all high-performance developer utilities: Regex, JSON, JWT, SQL, GitIgnore, Base64, UUID, and Cron tools.',
    path: '/dev-tools',
    category: 'Developer Tools',
    keywords: ['developer tools', 'coding utilities', 'programming tools', 'web developer toolkit'],
  },
  'developer': {
    title: 'Lead Architect & Systems Engineer',
    description: 'Engineered by Santanu Batabyal — Architecture philosophy: 100% In-Server processing, zero external cloud SaaS APIs.',
    path: '/developer',
    category: 'System & APIs',
    keywords: ['santanu batabyal', 'alltoolss architect', 'full stack systems engineer', 'software architect profile'],
  },
  'api-hub': {
    title: 'API Hub & Developer Documentation',
    description: 'Comprehensive REST API documentation for AllToolss endpoints: VAPT audit, DNS lookup, WHOIS, age computation, and live market feed.',
    path: '/api-hub',
    category: 'System & APIs',
    keywords: ['alltoolss api', 'developer api documentation', 'rest api endpoints', 'vapt api', 'dns api'],
  },
};

/**
 * Generates Schema.org SoftwareApplication JSON-LD
 */
export function generateSoftwareAppJsonLd(name: string, description: string, path: string, category: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: `${SITE_CONFIG.url}${path}`,
    applicationCategory: category,
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
  };
}

/**
 * Generates Schema.org FAQPage JSON-LD
 */
export function generateFaqJsonLd(faqs: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

/**
 * Generates Schema.org BreadcrumbList JSON-LD
 */
export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}
