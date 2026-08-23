'use client';

import React from 'react';
import Link from 'next/link';
import {
  Shield,
  User,
  Terminal,
  Code2,
  Lock,
  ArrowLeft,
  Cpu,
  Layers,
  Award,
  CheckCircle2,
  Globe,
  Sparkles,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  FileText,
} from 'lucide-react';

export default function AboutPage() {
  const skills = [
    'Application Security Architecture',
    'VAPT & Penetration Testing',
    'OWASP API Security Top 10 (2023)',
    'Next.js 14+ (App Router) & React',
    'TypeScript & Node.js Engine Architecture',
    'Burp Suite Pro & Enterprise Automation',
    'SSRF & Network Boundary Protection',
    'DevSecOps CI/CD Pipeline Automation',
    'TLS/SSL Cryptographic Auditing',
    'Tailwind CSS & Retro UI Engineering',
  ];

  const highlights = [
    {
      title: 'VAPT-99 Security Engine',
      description:
        'In-server passive vulnerability assessment scanner built with zero external APIs, featuring strict SSRF defense, TLS handshake inspection, and OWASP header compliance checks.',
      tag: 'Passive VAPT',
    },
    {
      title: 'API Security Testing Evaluator',
      description:
        '5-pillar weighted evaluation framework comparing PortSwigger Burp Suite, OWASP ZAP, StackHawk/Akto, and 42Crunch/Noname with interactive real-time score modeling.',
      tag: 'AppSec Governance',
    },
    {
      title: 'Dual Aesthetic Architecture',
      description:
        'Seamlessly bridging 1980s MS-DOS monochromatic CRT monitors (P1/P4 phosphor) and 24-pin continuous tractor-feed paper with modern dark-mode AppSec dashboard ergonomics.',
      tag: 'Retro & Modern UI',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 flex flex-col justify-between">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0b0f19]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5 text-xs font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Scanner</span>
            </Link>

            <div className="h-6 w-px bg-slate-800" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20">
                <Shield className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h1 className="font-extrabold text-sm sm:text-base text-white tracking-wide flex items-center gap-2">
                  <span>About the Developer &amp; Architecture</span>
                </h1>
                <p className="text-xs text-slate-400">
                  Engineering credits, application security philosophy, and system design
                </p>
              </div>
            </div>
          </div>

          {/* Quick Navigation Buttons */}
          <div className="flex items-center gap-2.5 text-xs font-mono">
            <Link
              href="/api-evaluator"
              className="px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all font-semibold flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              <span>API Evaluator</span>
            </Link>
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-all font-semibold flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>MS-DOS Scanner</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Profile & Architectural Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
        {/* Developer Hero Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-0.5 shadow-xl shadow-emerald-500/20 shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center text-emerald-400">
                  <User className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Lead Architect &amp; Developer
                  </span>
                  <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
                    AppSec &bull; Full-Stack Engineering
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Santanu Batabyal
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                  Principal Application Security Architect &amp; Full-Stack Software Engineer
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300">
                Next.js 14 App Router
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-mono text-cyan-300">
                TypeScript
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-mono text-emerald-300">
                OWASP API Top 10
              </span>
            </div>
          </div>

          {/* Bio & Engineering Statement */}
          <div className="pt-6 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
            <p>
              <strong>Santanu Batabyal</strong> designed and engineered the complete <strong>VAPT-99 Cyber-Defense &amp; API Security Testing Evaluation Suite</strong>. 
              The application combines rigorous defensive penetration testing capabilities, RFC-compliant server-side security checks, and interactive DevSecOps benchmark modeling into a unified high-performance platform.
            </p>
            <p>
              Built entirely in <strong>Next.js 14+ (App Router), TypeScript, and Tailwind CSS</strong>, the platform delivers zero third-party API dependencies by utilizing native Node.js cryptographic and socket subsystems for TLS/SSL certificate handshakes, DNS reconnaissance (CAA/SPF/DMARC), and strict multi-subnet SSRF boundary defense.
            </p>
          </div>
        </div>

        {/* 1980s Retro MS-DOS Identity Card */}
        <div className="bg-[#080e08] border-2 border-[#1f4d1f] rounded-xl p-5 font-mono text-xs text-[#33ff33] shadow-lg space-y-2">
          <div className="flex items-center justify-between border-b border-[#1f4d1f] pb-2 text-[11px]">
            <span className="font-bold">SYSTEM IDENTIFICATION RECORD // BIOS ROM v4.12</span>
            <span className="text-[#66ff66]">SECURITY CLEARANCE: LEVEL 5 (ROOT)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
            <div>
              <span className="opacity-70">PRIMARY ENGINEER:</span> <span className="font-bold text-[#66ff66]">Santanu Batabyal</span>
            </div>
            <div>
              <span className="opacity-70">ROLE / SPECIALIZATION:</span> <span>Principal AppSec &amp; Full-Stack Architect</span>
            </div>
            <div>
              <span className="opacity-70">CORE SYSTEM:</span> <span>VAPT-99 Security Kernel &amp; API Evaluator</span>
            </div>
            <div>
              <span className="opacity-70">EXECUTION ENVIRONMENT:</span> <span>Node.js / Next.js 14 / TypeScript</span>
            </div>
          </div>

          <div className="pt-2 text-[11px] opacity-80 border-t border-[#1f4d1f] border-dashed">
            +------------------------------------------------------------------------+<br />
            | (C) 1988-2026 Santanu Batabyal. All Security Engineering Rights Reserved. |<br />
            +------------------------------------------------------------------------+
          </div>
        </div>

        {/* Technical Highlights & Architectural Pillars */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Key Architectural Features Built by Santanu Batabyal</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {highlights.map((h, idx) => (
              <div
                key={idx}
                className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {h.tag}
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <h4 className="font-bold text-white text-sm">{h.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{h.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Competencies Matrix */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 font-mono text-sm font-bold text-white uppercase">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Technical Skills &amp; Security Engineering Domains</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className="px-3.5 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#080b12] py-4 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>VAPT-99 &amp; API EVALUATOR &bull; ENGINEERED BY SANTANU BATABYAL</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              MS-DOS Scanner
            </Link>
            <span>&bull;</span>
            <Link href="/api-evaluator" className="hover:text-cyan-400 transition-colors">
              API Security Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
