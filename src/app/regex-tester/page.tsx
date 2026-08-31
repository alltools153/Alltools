'use client';

import React from 'react';
import { RegexTool } from '@/components/RegexTool';
import { Code2, ShieldCheck } from 'lucide-react';

import ToolSeoFooter from '@/components/seo/ToolSeoFooter';

export default function RegexTesterPage() {
  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 font-sans selection:bg-[#f72585]/30 selection:text-black pb-20">
      {/* Top Banner Header */}
      <div className="border-b border-white/10 bg-[#111622]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#f72585] to-[#7209b7] flex items-center justify-center text-white font-black shadow-lg">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white">
                  REGEX TESTER & CHEAT SHEET
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f72585]/10 text-[#f72585] border border-[#f72585]/30 font-mono font-bold">
                  Client-Side
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Live Inline Match Highlighting • Dynamic Template Library • Capture Group Table • Telemetry Timer
              </p>
            </div>
          </div>

          {/* Privacy Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0a0d14] border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% In-Browser Memory (Zero Data Transmission)</span>
          </div>
        </div>
      </div>

      {/* Main Tool Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <RegexTool />
        <ToolSeoFooter toolSlug="regex-tester" />
      </main>
    </div>
  );
}
