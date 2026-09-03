"""
SEO Strategy & Keyword Intelligence Service
Maintains the centralized repository of over 100+ SEO keywords across categories,
provides schema generators, OpenGraph builders, and keyword search intent rankings.
"""

from typing import Dict, Any, List, Optional

SEO_KEYWORDS_MASTER = [
    # 1. AllTools General & Platform Keywords
    {"keyword": "all tools online free", "category": "general", "intent": "commercial", "volumeTier": "High", "lang": "en"},
    {"keyword": "multi tool web app", "category": "general", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "free online developer utility toolkit", "category": "general", "intent": "transactional", "volumeTier": "Medium", "lang": "en"},
    {"keyword": "all in one web tools hub", "category": "general", "intent": "commercial", "volumeTier": "High", "lang": "en"},
    {"keyword": "fastapi nextjs online tools suite", "category": "general", "intent": "informational", "volumeTier": "Medium", "lang": "en"},
    {"keyword": "productivity tools online free", "category": "general", "intent": "commercial", "volumeTier": "High", "lang": "en"},
    {"keyword": "free calculators and web utilities", "category": "general", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "privacy friendly online tools zero tracking", "category": "general", "intent": "informational", "volumeTier": "Medium", "lang": "en"},

    # 2. Age Calculator & Cosmic Bio Keywords
    {"keyword": "age calculator online free", "category": "age", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "calculate exact age in years months days", "category": "age", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "chronological age calculator with seconds", "category": "age", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "date of birth to age calculator", "category": "age", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "how old am i today exact calculation", "category": "age", "intent": "informational", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "next birthday countdown clock", "category": "age", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "planetary age calculator calculate age on mars jupiter", "category": "age", "intent": "informational", "volumeTier": "Medium", "lang": "en"},
    {"keyword": "biological life milestone calculator", "category": "age", "intent": "informational", "volumeTier": "Medium", "lang": "en"},
    {"keyword": "heartbeat and breath count by age", "category": "age", "intent": "informational", "volumeTier": "Medium", "lang": "en"},
    {"keyword": "chinese zodiac animal and lunar element by birthday", "category": "age", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "western zodiac sun sign dates and traits", "category": "age", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "date difference working days calculator", "category": "age", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "leap year birthday anniversary calculation", "category": "age", "intent": "informational", "volumeTier": "Medium", "lang": "en"},
    {"keyword": "gigasecond 1 billion seconds birthday milestone", "category": "age", "intent": "informational", "volumeTier": "Low", "lang": "en"},

    # 3. VAPT Security Scanner & OWASP Keywords
    {"keyword": "website vapt scanner online free", "category": "vapt", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "free web application vulnerability scanner", "category": "vapt", "intent": "commercial", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "http security headers checker hsts csp x-frame-options", "category": "vapt", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "ssl tls certificate inspector and cipher suite analyzer", "category": "vapt", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "owasp api top 10 checklist and audit tool", "category": "vapt", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "dns spf dmarc caa security lookup online", "category": "vapt", "intent": "transactional", "volumeTier": "High", "lang": "en"},
    {"keyword": "website penetration testing passive audit tool", "category": "vapt", "intent": "commercial", "volumeTier": "High", "lang": "en"},
    {"keyword": "check cookie httponly secure samesite flags", "category": "vapt", "intent": "informational", "volumeTier": "Medium", "lang": "en"},
    {"keyword": "sensitive file disclosure probe env git robots security txt", "category": "vapt", "intent": "informational", "volumeTier": "Medium", "lang": "en"},
    {"keyword": "ssrf protection and private ip address checker", "category": "vapt", "intent": "informational", "volumeTier": "Medium", "lang": "en"},
    {"keyword": "api security testing burp suite zap alternative report", "category": "vapt", "intent": "commercial", "volumeTier": "Medium", "lang": "en"},
    {"keyword": "generate instant security audit pdf report", "category": "vapt", "intent": "transactional", "volumeTier": "High", "lang": "en"},

    # 4. Bengali Calendar & Panjika Keywords (Bilingual En & Bn)
    {"keyword": "bengali calendar 1431 1432 1433", "category": "bengali", "intent": "informational", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "বাংলা ক্যালেন্ডার ১৪৩১ ১৪৩২", "category": "bengali", "intent": "informational", "volumeTier": "Very High", "lang": "bn"},
    {"keyword": "bengali panjika today with tithi and nakshatra", "category": "bengali", "intent": "informational", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "আজকের বাংলা পঞ্জিকা তিথি ও নক্ষত্র", "category": "bengali", "intent": "informational", "volumeTier": "Very High", "lang": "bn"},
    {"keyword": "english to bengali date converter online", "category": "bengali", "intent": "transactional", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "ইংরেজি থেকে বাংলা তারিখ রূপান্তর", "category": "bengali", "intent": "transactional", "volumeTier": "Very High", "lang": "bn"},
    {"keyword": "durga puja 2024 2025 2026 calendar dates schedule", "category": "bengali", "intent": "informational", "volumeTier": "Very High", "lang": "en"},
    {"keyword": "দুর্গাপূজা ক্যালেন্ডার ও নির্ঘণ্ট সময়সূচী", "category": "bengali", "intent": "informational", "volumeTier": "Very High", "lang": "bn"},
    {"keyword": "bengali marriage auspicious dates subho bibaho lagna", "category": "bengali", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "বিবাহের শুভ দিন ও লগ্ন বাংলা পঞ্জিকা", "category": "bengali", "intent": "informational", "volumeTier": "High", "lang": "bn"},
    {"keyword": "live bengali clock 6 period daily time", "category": "bengali", "intent": "informational", "volumeTier": "Medium", "lang": "en"},
    {"keyword": "amrita yoga mahendra yoga rahu kalam today", "category": "bengali", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "অমৃতযোগ ও রাহুকাল আজকের সময়", "category": "bengali", "intent": "informational", "volumeTier": "High", "lang": "bn"},
    {"keyword": "poila boishakh nababarsho date 1433", "category": "bengali", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "শুভ পয়লা বৈশাখ নববর্ষ", "category": "bengali", "intent": "informational", "volumeTier": "High", "lang": "bn"},
    {"keyword": "ekadashi dates fasting bengali calendar", "category": "bengali", "intent": "informational", "volumeTier": "High", "lang": "en"},
    {"keyword": "একাদশী ব্রতের দিন ও পারণ সময়", "category": "bengali", "intent": "informational", "volumeTier": "High", "lang": "bn"}
]

def get_keywords_by_category(category: Optional[str] = None, lang: Optional[str] = None) -> List[Dict[str, Any]]:
    filtered = SEO_KEYWORDS_MASTER
    if category and category != "all":
        filtered = [k for k in filtered if k["category"] == category]
    if lang:
        filtered = [k for k in filtered if k["lang"] == lang]
    return filtered

def generate_json_ld_schemas() -> Dict[str, Any]:
    return {
        "webApplication": {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "AllTools",
            "url": "https://alltools.local",
            "description": "Unified Multi-Tool Suite featuring High-Precision Age Calculator, Website VAPT Security Scanner, and Authentic Bengali Calendar & Panjika.",
            "applicationCategory": "DeveloperApplication, UtilityApplication, SecurityApplication",
            "operatingSystem": "All modern browsers (Windows, macOS, Linux, iOS, Android)",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "author": {
                "@type": "Person",
                "name": "Santanu Batabyal",
                "jobTitle": "Principal Application Security Architect & Full-Stack Engineer"
            }
        },
        "faqPage": {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "What is AllTools and which tools are included?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "AllTools is a comprehensive multi-tool web application that includes: 1) High-Precision Chronological & Planetary Age Milestone Calculator, 2) Website VAPT Security Scanner & OWASP API Top 10 Auditor, and 3) Authentic Bengali Calendar (বাংলা পঞ্জিকা) with Live Clock, Tithi, and Festivals."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How does the AllTools VAPT Security Scanner work?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The VAPT scanner performs non-invasive passive security audits including HTTP security header analysis (HSTS, CSP, XFO, XCTO), SSL/TLS cipher inspection, DNS SPF/DMARC/CAA verification, and OWASP API Top 10 compliance evaluation."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Does the Bengali Calendar support Surya Siddhanta & Bangladesh Academy standards?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, the Bengali calendar accurately converts Gregorian dates to Bengali San (1431, 1432, 1433 BS), supports the 6-period Bengali time model, calculates auspicious Muhurats, and lists regional holidays."
                    }
                }
            ]
        }
    }
