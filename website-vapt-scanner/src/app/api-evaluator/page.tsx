'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ScoringMatrix } from '@/components/ScoringMatrix';
import { BurpPlaybook } from '@/components/BurpPlaybook';
import { OwaspChecklist } from '@/components/OwaspChecklist';
import {
  EVALUATION_PILLARS,
  BENCHMARK_TOOLS,
  OWASP_API_TOP10,
  BURP_PLAYBOOK_TOPICS,
} from '@/data/evaluatorData';
import {
  Shield,
  Layers,
  Cpu,
  CheckCircle2,
  Terminal,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  BookOpen,
  Award,
  Activity,
  Server,
  Lock,
} from 'lucide-react';

export default function ApiEvaluatorPage() {
  const [activeTab, setActiveTab] = useState<'matrix' | 'burp' | 'owasp'>('matrix');

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 flex flex-col justify-between">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0b0f19]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5 text-xs font-mono"
              title="Return to MS-DOS VAPT Scanner"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">VAPT-99 Terminal</span>
            </Link>

            <div className="h-6 w-px bg-slate-800" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20">
                <Shield className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h1 className="font-extrabold text-sm sm:text-base text-white tracking-wide flex items-center gap-2">
                  <span>API Security Testing Evaluation &amp; Benchmark</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold hidden md:inline-block">
                    AppSec Architect Edition
                  </span>
                </h1>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Comparative tool scoring, Burp Suite operational playbook, and OWASP API Top 10 coverage
                </p>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <div className="hidden lg:flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>OWASP API: 2023 EDITION</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 space-y-6">
        {/* Top Executive KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex items-center gap-3.5">
            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-white font-mono">{BENCHMARK_TOOLS.length} Profiles</div>
              <div className="text-xs text-slate-400">Benchmark Evaluated</div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex items-center gap-3.5">
            <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-white font-mono">{EVALUATION_PILLARS.length} Pillars</div>
              <div className="text-xs text-slate-400">Weighted Criteria (100%)</div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex items-center gap-3.5">
            <div className="p-3 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-white font-mono">{BURP_PLAYBOOK_TOPICS.length} Playbooks</div>
              <div className="text-xs text-slate-400">Burp Pro &amp; CI/CD Guides</div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex items-center gap-3.5">
            <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-white font-mono">10 / 10 Categories</div>
              <div className="text-xs text-slate-400">OWASP API Top 10 Coverage</div>
            </div>
          </div>
        </div>

        {/* Tabbed Navigation Bar */}
        <div className="border-b border-slate-800">
          <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-px font-mono text-xs">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`py-3 px-4 rounded-t-lg font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 ${
                activeTab === 'matrix'
                  ? 'border-emerald-500 bg-slate-900 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>1. 5-Pillar Evaluation Matrix &amp; Scoring</span>
            </button>

            <button
              onClick={() => setActiveTab('burp')}
              className={`py-3 px-4 rounded-t-lg font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 ${
                activeTab === 'burp'
                  ? 'border-orange-500 bg-slate-900 text-orange-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>2. Burp Suite API Pentesting Playbook</span>
            </button>

            <button
              onClick={() => setActiveTab('owasp')}
              className={`py-3 px-4 rounded-t-lg font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 ${
                activeTab === 'owasp'
                  ? 'border-cyan-500 bg-slate-900 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>3. OWASP API Top 10 Verification Checklist</span>
            </button>
          </nav>
        </div>

        {/* Tab Content Panes */}
        <div>
          {activeTab === 'matrix' && (
            <ScoringMatrix pillars={EVALUATION_PILLARS} tools={BENCHMARK_TOOLS} />
          )}

          {activeTab === 'burp' && (
            <BurpPlaybook topics={BURP_PLAYBOOK_TOPICS} />
          )}

          {activeTab === 'owasp' && (
            <OwaspChecklist items={OWASP_API_TOP10} />
          )}
        </div>
      </main>

      {/* Modern AppSec Footer */}
      <footer className="border-t border-slate-800/80 bg-[#080b12] py-4 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>API SECURITY EVALUATION FRAMEWORK &bull; APPSEC ARCHITECTURE</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              MS-DOS VAPT Scanner
            </Link>
            <span>&bull;</span>
            <span>OWASP API Security Top 10 (2023)</span>
            <span>&bull;</span>
            <span>PortSwigger Burp Suite Playbook</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
