# 🛠️ AllTools // Unified Multi-Tool SuitE

> **Lead Architect & Developer:** **Santanu Batabyal**  
> **Repository:** `https://github.com/alltools153/Alltools.git`  
> **Architecture:** **Next.js 14+ (App Router, TypeScript, Tailwind CSS)** + **Python FastAPI Backend**

---

## 🌟 Overview

**AllTools** is a unified multi-project web platform bringing together high-precision temporal computing, web security assessment, and authentic astronomical calendar systems into a single high-performance application with **7 customizable visual themes**, **OpenAPI/Swagger REST APIs**, and a **100+ keyword SEO architecture**.

---

## 📦 Flagship Projects Included

```
Alltools/
├── 🧮 Age Milestone & Cosmic Calculator (/age-calculator)
│   ├── Chronological age (years, months, days, hours, minutes, seconds)
│   ├── 9 Solar system planetary orbits (Mercury to Pluto)
│   ├── Biological lifetime stats (heartbeats, breaths, sleep time)
│   ├── Chinese lunar zodiac, Western astrology & Generation cohort
│   └── Leap year anniversary precision & Date difference calculator
│
├── 🛡️ Website VAPT Security Scanner (/vapt-scanner)
│   ├── Passive HTTP security headers audit (HSTS, CSP, XFO, XCTO, Referrer, Permissions)
│   ├── SSL/TLS certificate & cipher suite inspector (TLS 1.2/1.3, Expiry countdown)
│   ├── OWASP API Security Top 10 (2023) verification vectors & mitigation code
│   └── Exportable security reports (Print/PDF, Dot-matrix Retro report, JSON export)
│
└── 📅 Bengali Calendar & Panjika (/bengali-calendar)
    ├── Zero-Hydration Live Bengali Clock with 6 daily periods (ভোর, সকাল, দুপুর, বিকেল, সন্ধ্যা, রাত)
    ├── Surya Siddhanta & Bangladesh Academy conversion (১৪৩১–১৪৩৩ বঙ্গাব্দ)
    ├── Tithi, Nakshatra, Yoga, Karana, Paksha & Disha Shool with remedies
    ├── Auspicious muhurats (অমৃতযোগ, মাহেন্দ্রযোগ, অভিজিৎ) & Inauspicious times (রাহুকাল, বারবেলা)
    └── Full festival almanac (Durga Puja, Kali Puja, Poila Boishakh, Eid, Saraswati Puja)
```

---

## 🎨 7 Dynamic Multi-Themes

Switch themes seamlessly with zero-flicker CSS variable injection and persistent local storage:

1. **Cyberpunk Neon**: Electric cyan `#00f0ff` and neon magenta `#f72585` on dark slate.
2. **Hacker Matrix / VT100**: Monochrome green `#00ff66` phosphor CRT terminal with subtle scanlines.
3. **Classic Modern Dark**: Sleek deep slate `#0f172a` and royal indigo `#6366f1`.
4. **Clean Light Minimal**: Crisp Apple-style white `#ffffff` and soft neutral slate.
5. **Royal Bengali & Gold**: Terracotta maroon `#1b070d`, warm saffron, and radiant gold `#f59e0b`.
6. **Sunset Amber & Twilight**: Warm dusk orange `#f97316` and deep twilight violet `#160c22`.
7. **Midnight AMOLED True Black**: Pure black `#000000` with electric blue glowing trims.

---

## 🔌 Python FastAPI + Next.js REST API

All 3 projects feature full REST API endpoints with interactive Swagger UI and ReDoc:

* **Age API**: `GET /api/v1/age/calculate?birthDate=YYYY-MM-DD`
* **Planetary API**: `GET /api/v1/age/planetary?birthDate=YYYY-MM-DD`
* **VAPT Scan API**: `POST /api/v1/vapt/scan` with payload `{"url": "https://example.com"}`
* **OWASP Checklist API**: `GET /api/v1/vapt/owasp-checklist`
* **Bengali Today API**: `GET /api/v1/bengali/today`
* **Bengali Date Convert API**: `GET /api/v1/bengali/convert?dateStr=YYYY-MM-DD`
* **SEO Keywords API**: `GET /api/v1/seo/keywords`

The Next.js frontend proxies `/api/py/*` to the Render backend at
`https://alltools-c30i.onrender.com/api/v1/*` by default. Set
`PYTHON_API_URL` on the frontend deployment to use a different backend URL.

Document and PDF Studio routes under `/api/convert/*`, `/api/pdf/*`, and
`/api/ocr/*` run in the Next.js server. PDF image rendering requires the
native `canvas` package; Office-to-PDF routes additionally require LibreOffice
(`soffice`) on the server.

---

## 🔍 SEO Strategy & Keywords Matrix

AllTools is built from the ground up for maximum search visibility:
- Over **100+ curated keywords** in English and Bengali categorized across Informational, Transactional, and Commercial search intents.
- Automatic **Schema.org JSON-LD** structured data (`WebApplication`, `FAQPage`, `BreadcrumbList`, `Organization`).
- Dynamic `sitemap.ts` and `robots.ts` search engine indexing.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.17+ or v20.x+
- **Python**: 3.10+ (with `pip`)

### Installation & Run

```bash
# 1. Install Node.js dependencies
npm install

# 2. Install Python backend dependencies
pip install -r requirements.txt

# 3. Launch both Next.js and FastAPI servers concurrently
python run_servers.py

# Alternatively, run them separately:
# Terminal 1 (Python FastAPI):
uvicorn python_backend.main:app --reload --port 8000

# Terminal 2 (Next.js Frontend):
npm run dev
```

* **Next.js Web Portal:** `http://localhost:3000`
* **FastAPI Swagger UI:** `http://127.0.0.1:8000/docs`
* **ReDoc Documentation:** `http://127.0.0.1:8000/redoc`

---

## 👨‍💻 Author

- **Santanu Batabyal** — *Principal Application Security Architect & Full-Stack Engineer*
- **License**: MIT
