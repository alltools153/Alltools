'use client';

import React from 'react';
import { JsonTool } from '@/components/JsonTool';
import { FileJson, ShieldCheck } from 'lucide-react';

import ToolSeoFooter from '@/components/seo/ToolSeoFooter';

export default function JsonFormatterPage() {
  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 font-sans selection:bg-[#00f0ff]/30 selection:text-black pb-20">
      {/* Top Banner Header */}
      <div className="border-b border-white/10 bg-[#111622]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00f0ff] to-[#7209b7] flex items-center justify-center text-black font-black shadow-lg">
              <FileJson className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white">
                  JSON FORMATTER & SCHEMA BUILDER
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 font-mono font-bold">
                  Client-Side
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Split Editor • 2/4-Space Beautify & Minify • Interactive Object Tree • Description to JSON
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
        <JsonTool />
        <ToolSeoFooter toolSlug="json-formatter" />
      </main>
    </div>
  );
}
