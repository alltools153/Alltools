# 🛠️ Alltools // Multi-Project Suite

> **Lead Architect & Developer:** **Santanu Batabyal**  
> **Repository:** `https://github.com/alltools153/Alltools.git`

A unified multi-project suite of production-grade Next.js 14+ (App Router), TypeScript, and Tailwind CSS applications.

---

## 📦 Projects Overview

```
Alltools/
├── 🧮 age-milestone-calculator/    # Chronological age, leap year precision, biological milestones, and Chinese zodiac
├── 📅 bengali-calendar-panjika/      # Zero-hydration live clock, 1431/1432 Bengali calendar, tithi, and regional festivals
└── 🛡️ website-vapt-scanner/         # 1980s MS-DOS VAPT scanner, dot-matrix paper reports, and API security benchmark
```

---

### 1. 🧮 Age Milestone Calculator (`age-milestone-calculator/`)
- **Key Features:**
  - High-precision chronological age calculator (years, months, days, hours, minutes, seconds).
  - Next birthday countdown with accurate leap-year handling (`Feb 29` leap anniversary compensation).
  - Chinese zodiac sign determination with lunar element cycles.
  - Biological milestone progress bar and comparative lifespan metrics.
- **Port:** `http://localhost:3000`

---

### 2. 📅 Bengali Calendar & Panjika (`bengali-calendar-panjika/`)
- **Key Features:**
  - Zero-Hydration Error Live Bengali Clock (`ssr: false` client hydration architecture).
  - Regional timezone support (India `IST` & Bangladesh `BST`).
  - Traditional Bengali 6-period time mapping (ভোর, সকাল, দুপুর, বিকেল, সন্ধ্যা, রাত).
  - Complete festival almanac for 1431–1432 বঙ্গাব্দ (Durga Puja, Kali Puja, Nababarsho, Eid).
- **Port:** `http://localhost:3005`

---

### 3. 🛡️ VAPT-99 Scanner & API Evaluator (`website-vapt-scanner/`)
- **Key Features:**
  - **1980s Dual Visual Modes:** Monochromatic MS-DOS CRT terminal (P1 green / P4 amber phosphor) + Continuous 24-Pin tractor-feed dot-matrix green-bar paper printout with sprocket punch holes.
  - **In-Server Passive VAPT Engine:** Zero external third-party APIs. Direct Node.js TLS handshake inspection, DNS CAA/SPF/DMARC reconnaissance, and multi-subnet SSRF firewalling.
  - **API Security Testing Evaluator:** 5-pillar weighted benchmark comparing PortSwigger Burp Suite, OWASP ZAP, StackHawk/Akto, and 42Crunch/Noname with real-time scoring.
  - **OWASP API Top 10 (2023) Checklist:** 30 interactive verification vectors with test HTTP payloads and defensive TypeScript remediation code.
- **Port:** `http://localhost:3010`

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.17+ or v20.x+
- **npm** or **pnpm** / **yarn**

### Installation & Running

```bash
# Clone the repository
git clone https://github.com/alltools153/Alltools.git
cd Alltools

# 1. Run Age Milestone Calculator
cd age-milestone-calculator
npm install
npm run dev # Runs on http://localhost:3000

# 2. Run Bengali Calendar & Panjika
cd ../bengali-calendar-panjika
npm install
npm run dev # Runs on http://localhost:3005

# 3. Run Website VAPT Scanner & API Evaluator
cd ../website-vapt-scanner
npm install
npm run dev # Runs on http://localhost:3010
```

---

## 👨‍💻 Author

- **Santanu Batabyal** — *Principal Application Security Architect & Full-Stack Engineer*
- **License**: MIT
