'use client';

import React, { useState } from 'react';
import { JsonTool } from '@/components/JsonTool';
import { RegexTool } from '@/components/RegexTool';
import { JwtTool } from '@/components/JwtTool';
import {
  FileJson,
  Code2,
  KeyRound,
  ShieldCheck,
  Cpu,
  Terminal,
  Sparkles,
  ArrowRight,
  Zap,
} from 'lucide-react';

export default function DevToolsPage() {
  const [activeTab, setActiveTab] = useState<'json' | 'regex' | 'jwt'>('json');

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 font-sans selection:bg-[#00f0ff]/30 selection:text-black">
      {/* Top Banner Header */}
      <div className="border-b border-white/10 bg-[#111622]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00f0ff] to-[#7209b7] flex items-center justify-center text-black font-black shadow-lg">
              <Terminal className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white">
                  DEVELOPER MICRO-TOOL SUITE
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 font-mono font-bold">
                  v2.4 ROM
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                100% In-Browser Client-Side Execution • Zero External API Dependencies
              </p>
            </div>
          </div>

          {/* Privacy Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0a0d14] border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Client-Side Memory Only (Zero Data Transmission)</span>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <button
            onClick={() => setActiveTab('json')}
            className={`px-4 py-3 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'json'
                ? 'border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff]/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <FileJson className="w-4 h-4" />
            <span>1. JSON Formatter & Schema Builder</span>
          </button>

          <button
            onClick={() => setActiveTab('regex')}
            className={`px-4 py-3 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'regex'
                ? 'border-[#f72585] text-[#f72585] bg-[#f72585]/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>2. Regex Tester & Cheat Sheet</span>
          </button>

          <button
            onClick={() => setActiveTab('jwt')}
            className={`px-4 py-3 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'jwt'
                ? 'border-[#a855f7] text-[#a855f7] bg-[#a855f7]/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>3. JWT Decoder & Expiry Inspector</span>
          </button>
        </div>
      </div>

      {/* Main Active Tab Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'json' && <JsonTool />}
        {activeTab === 'regex' && <RegexTool />}
        {activeTab === 'jwt' && <JwtTool />}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#070a0f] py-4 text-center text-xs font-mono text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-3">
          <span>AllTools Suite &bull; Lead Architect: <a href="/developer" className="text-[#00f0ff] underline hover:text-white">Santanu Batabyal</a></span>
          <div className="flex items-center gap-3 text-slate-400">
            <span>JSON Engine</span>
            <span>&bull;</span>
            <span>Regex VM</span>
            <span>&bull;</span>
            <span>JWT Inspector</span>
          </div>
          <span className="text-emerald-400">100% In-Server / Browser Memory</span>
        </div>
      </footer>
    </div>
  );
}
