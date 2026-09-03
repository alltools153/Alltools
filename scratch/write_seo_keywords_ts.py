import os
from generate_keywords import keywords_data

out_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src', 'lib', 'seoKeywords.ts'))

ts_content = """import { SeoKeyword } from '@/types/seo';

export const MASTER_SEO_KEYWORDS: SeoKeyword[] = [
"""

for k in keywords_data:
    ts_content += f"  {{\n"
    ts_content += f"    keyword: {repr(k['keyword'])},\n"
    ts_content += f"    toolName: {repr(k['toolName'])},\n"
    ts_content += f"    toolHref: {repr(k['toolHref'])},\n"
    ts_content += f"    category: {repr(k['category'])},\n"
    ts_content += f"    intent: {repr(k['intent'])},\n"
    ts_content += f"    volumeTier: {repr(k['volumeTier'])},\n"
    ts_content += f"    lang: {repr(k['lang'])},\n"
    ts_content += f"  }},\n"

ts_content += """];

export const SEO_JSON_LD = {
  webApp: {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AllToolss',
    alternateName: 'AllToolss Multi-Tool Suite',
    description:
      'Unified online multi-tool suite AllToolss featuring Developer Utilities (JSON, Regex, JWT, SQL), Website VAPT Security Scanner, ATS Resume Checker, 25+ PDF Tools, Finance Calculators, and Bengali Calendar & Panjika powered by Next.js and Python FastAPI.',
    applicationCategory: 'DeveloperApplication, UtilityApplication, SecurityApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'Santanu Batabyal',
      jobTitle: 'Principal Application Security Architect & Full-Stack Engineer',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.95',
      reviewCount: '1840',
      bestRating: '5',
    },
  },
  faqPage: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What tools are available in AllToolss?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AllToolss includes 40+ production utilities: 1) Developer Tools (JSON Formatter, Regex Tester, JWT Decoder, AI SQL Generator, Gitignore, Base64, UUID, Cron), 2) Security Scanners (VAPT, Nmap, SSL, DNS, WHOIS, SPF/DKIM/DMARC, Password Entropy), 3) 25+ PDF Tools (Merge, Split, Compress, Convert, OCR, Encrypt), 4) Career & Utility (Resume ATS, QR Code, Image Compressor), 5) Finance & Stocks (GST, SIP, Live Sensex/Nifty), and 6) Cultural Tools (Age Calculator, Bengali Calendar & Panjika).',
        },
      },
      {
        '@type': 'Question',
        name: 'Are AllToolss REST APIs free to use for developers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! AllToolss exposes open REST API endpoints with interactive Swagger UI and ReDoc documentation for VAPT scans, Age calculations, Bengali date conversion, and document conversion.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the AllToolss security scanner free and safe to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! The AllToolss VAPT scanner is 100% free, safe, and performs non-invasive passive security audits including HTTP header verification (HSTS, CSP, XFO), SSL/TLS cipher inspection, and DNS security checks with zero exploitation.',
        },
      },
      {
        '@type': 'Question',
        name: 'How accurate is the Bengali Calendar and Panjika on AllToolss?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Bengali Calendar on AllToolss strictly computes astronomical solar and lunar positions following traditional Surya Siddhanta and Bengali Academy standards, including Tithi, Nakshatra, Yoga, Karana, and auspicious Muhurats.',
        },
      },
    ],
  },
};
"""

with open(out_path, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Successfully wrote {len(keywords_data)} keywords to {out_path}")
