'use client';

import React, { useState } from 'react';
import {
  Search,
  Layers,
  Sparkles,
  Copy,
  Check,
  Globe,
  Tag,
  Filter,
  BarChart3,
  Code2,
  FileCode2,
} from 'lucide-react';
import { MASTER_SEO_KEYWORDS, SEO_JSON_LD } from '@/lib/seoKeywords';
import { SeoKeyword } from '@/types/seo';

export default function SeoKeywordsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIntent, setSelectedIntent] = useState<string>('all');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedSchema, setCopiedSchema] = useState(false);

  const filteredKeywords = MASTER_SEO_KEYWORDS.filter((k) => {
    const matchesSearch = k.keyword.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || k.category === selectedCategory;
    const matchesIntent = selectedIntent === 'all' || k.intent === selectedIntent;
    return matchesSearch && matchesCategory && matchesIntent;
  });

  const copyKeyword = (keyword: string, idx: number) => {
    navigator.clipboard.writeText(keyword);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const copySchemaJson = () => {
    navigator.clipboard.writeText(JSON.stringify(SEO_JSON_LD.webApp, null, 2));
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-1">
            <Search className="w-4 h-4" />
            <span>Search Intelligence & Metadata Strategy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            SEO Keyword Matrix & Schemas
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Explore curated high-intent search keywords across AllToolss, Age Calculator, VAPT Scanner, and Bengali Panjika.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-3 rounded-xl border border-border bg-card text-center">
            <div className="text-xl font-extrabold text-primary">{MASTER_SEO_KEYWORDS.length}</div>
            <div className="text-[10px] text-muted-foreground uppercase font-semibold">Total Keywords</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-border bg-card">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search keywords (e.g., calculator, vapt, panjika, durga)..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-border bg-background text-foreground text-xs font-medium"
          >
            <option value="all">All Tools (4 Categories)</option>
            <option value="general">AllToolss Hub</option>
            <option value="age">Age Calculator</option>
            <option value="vapt">VAPT Scanner</option>
            <option value="bengali">Bengali Calendar</option>
          </select>

          <select
            value={selectedIntent}
            onChange={(e) => setSelectedIntent(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-border bg-background text-foreground text-xs font-medium"
          >
            <option value="all">All Intents</option>
            <option value="transactional">Transactional</option>
            <option value="informational">Informational</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
      </div>

      {/* Keywords Directory Table/Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredKeywords.map((k, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-all flex flex-col justify-between gap-2.5 shadow-sm group"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                    k.category === 'age'
                      ? 'bg-primary/20 text-primary'
                      : k.category === 'vapt'
                      ? 'bg-secondary/20 text-secondary'
                      : k.category === 'bengali'
                      ? 'bg-accent/20 text-accent'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {k.category}
                </span>

                <span className="text-[10px] font-mono text-muted-foreground">
                  {k.volumeTier} Volume
                </span>
              </div>

              <div className="text-sm font-semibold text-foreground break-words">{k.keyword}</div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/50 text-[11px] text-muted-foreground">
              <span className="capitalize font-mono">Intent: {k.intent}</span>
              <button
                onClick={() => copyKeyword(k.keyword, idx)}
                className="p-1 rounded hover:bg-muted text-primary flex items-center gap-1"
                title="Copy Keyword"
              >
                {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* JSON-LD Schema Showcase */}
      <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <FileCode2 className="w-4 h-4 text-primary" />
              <span>Production Schema.org JSON-LD Structured Data</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Pre-rendered in HTML headers for optimal Google Rich Results & Knowledge Graph indexing.
            </p>
          </div>

          <button
            onClick={copySchemaJson}
            className="px-3.5 py-1.5 rounded-xl border border-border bg-muted/60 text-foreground text-xs font-semibold flex items-center gap-1.5 hover:border-primary/50"
          >
            {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSchema ? 'Copied JSON-LD' : 'Copy Schema JSON'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-black/90 text-primary font-mono text-xs overflow-x-auto max-h-72">
          {JSON.stringify(SEO_JSON_LD.webApp, null, 2)}
        </pre>
      </div>
    </div>
  );
}
