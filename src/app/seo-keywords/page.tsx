'use client';

import React, { useState, useMemo } from 'react';
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
  Shield,
  FileText,
  TrendingUp,
  Cpu,
  FileCode2,
  ExternalLink,
  Wrench,
} from 'lucide-react';
import { MASTER_SEO_KEYWORDS, SEO_JSON_LD } from '@/lib/seoKeywords';
import { SeoKeyword } from '@/types/seo';

export default function SeoKeywordsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTool, setSelectedTool] = useState<string>('all');
  const [selectedIntent, setSelectedIntent] = useState<string>('all');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Extract unique tool names for granular filtering
  const allToolNames = useMemo(() => {
    const tools = new Set<string>();
    MASTER_SEO_KEYWORDS.forEach((k) => {
      if (k.toolName) tools.add(k.toolName);
    });
    return Array.from(tools).sort();
  }, []);

  const filteredKeywords = useMemo(() => {
    return MASTER_SEO_KEYWORDS.filter((k) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        k.keyword.toLowerCase().includes(q) ||
        (k.toolName && k.toolName.toLowerCase().includes(q)) ||
        k.category.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === 'all' || k.category === selectedCategory;
      const matchesTool = selectedTool === 'all' || k.toolName === selectedTool;
      const matchesIntent = selectedIntent === 'all' || k.intent === selectedIntent;
      return matchesSearch && matchesCategory && matchesTool && matchesIntent;
    });
  }, [searchTerm, selectedCategory, selectedTool, selectedIntent]);

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

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'developer':
        return 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30';
      case 'security':
        return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30';
      case 'pdf':
        return 'bg-violet-500/15 text-violet-400 border border-violet-500/30';
      case 'utility':
        return 'bg-pink-500/15 text-pink-400 border border-pink-500/30';
      case 'finance':
        return 'bg-amber-500/15 text-amber-400 border border-amber-500/30';
      case 'age':
        return 'bg-primary/20 text-primary border border-primary/30';
      case 'bengali':
        return 'bg-orange-500/15 text-orange-400 border border-orange-500/30';
      case 'api':
        return 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30';
      default:
        return 'bg-muted text-muted-foreground border border-border';
    }
  };

  const counts = {
    total: MASTER_SEO_KEYWORDS.length,
    tools: allToolNames.length,
    developer: MASTER_SEO_KEYWORDS.filter((k) => k.category === 'developer').length,
    security: MASTER_SEO_KEYWORDS.filter((k) => k.category === 'security').length,
    pdf: MASTER_SEO_KEYWORDS.filter((k) => k.category === 'pdf').length,
    finance: MASTER_SEO_KEYWORDS.filter((k) => k.category === 'finance').length,
    utility: MASTER_SEO_KEYWORDS.filter((k) => k.category === 'utility').length,
    api: MASTER_SEO_KEYWORDS.filter((k) => k.category === 'api').length,
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
          <p className="text-sm text-muted-foreground mt-1 max-w-3xl">
            Exhaustive search index covering all {counts.tools}+ production tools, PDF studio operations, and developer REST APIs. Engineered for maximum organic visibility across Google, Bing, and Generative Engine Optimization (GEO).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-3 rounded-xl border border-border bg-card text-center min-w-[96px]">
            <div className="text-2xl font-extrabold text-primary">{counts.total}</div>
            <div className="text-[10px] text-muted-foreground uppercase font-semibold">Total Keywords</div>
          </div>
          <div className="p-3 rounded-xl border border-border bg-card text-center min-w-[96px]">
            <div className="text-2xl font-extrabold text-cyan-400">{counts.tools}</div>
            <div className="text-[10px] text-muted-foreground uppercase font-semibold">Indexed Tools</div>
          </div>
        </div>
      </div>

      {/* Category Quick Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        <button
          onClick={() => {
            setSelectedCategory(selectedCategory === 'developer' ? 'all' : 'developer');
            setSelectedTool('all');
          }}
          className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between gap-1 cursor-pointer ${
            selectedCategory === 'developer'
              ? 'border-cyan-500 bg-cyan-500/10'
              : 'border-border bg-card hover:border-border/80'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Developer Tools</span>
          <span className="text-xl font-black font-mono text-foreground">{counts.developer}</span>
        </button>

        <button
          onClick={() => {
            setSelectedCategory(selectedCategory === 'security' ? 'all' : 'security');
            setSelectedTool('all');
          }}
          className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between gap-1 cursor-pointer ${
            selectedCategory === 'security'
              ? 'border-emerald-500 bg-emerald-500/10'
              : 'border-border bg-card hover:border-border/80'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Security Tools</span>
          <span className="text-xl font-black font-mono text-foreground">{counts.security}</span>
        </button>

        <button
          onClick={() => {
            setSelectedCategory(selectedCategory === 'pdf' ? 'all' : 'pdf');
            setSelectedTool('all');
          }}
          className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between gap-1 cursor-pointer ${
            selectedCategory === 'pdf'
              ? 'border-violet-500 bg-violet-500/10'
              : 'border-border bg-card hover:border-border/80'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">PDF Studio (31 Tools)</span>
          <span className="text-xl font-black font-mono text-foreground">{counts.pdf}</span>
        </button>

        <button
          onClick={() => {
            setSelectedCategory(selectedCategory === 'finance' ? 'all' : 'finance');
            setSelectedTool('all');
          }}
          className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between gap-1 cursor-pointer ${
            selectedCategory === 'finance'
              ? 'border-amber-500 bg-amber-500/10'
              : 'border-border bg-card hover:border-border/80'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Finance & Stocks</span>
          <span className="text-xl font-black font-mono text-foreground">{counts.finance}</span>
        </button>

        <button
          onClick={() => {
            setSelectedCategory(selectedCategory === 'utility' ? 'all' : 'utility');
            setSelectedTool('all');
          }}
          className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between gap-1 cursor-pointer ${
            selectedCategory === 'utility'
              ? 'border-pink-500 bg-pink-500/10'
              : 'border-border bg-card hover:border-border/80'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400">Career & Utilities</span>
          <span className="text-xl font-black font-mono text-foreground">{counts.utility}</span>
        </button>

        <button
          onClick={() => {
            setSelectedCategory(selectedCategory === 'api' ? 'all' : 'api');
            setSelectedTool('all');
          }}
          className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between gap-1 cursor-pointer ${
            selectedCategory === 'api'
              ? 'border-indigo-500 bg-indigo-500/10'
              : 'border-border bg-card hover:border-border/80'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">REST APIs</span>
          <span className="text-xl font-black font-mono text-foreground">{counts.api}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4 rounded-2xl border border-border bg-card">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="seo-search-input"
            type="text"
            value={searchTerm}
            aria-label="Search keywords"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search keywords or tools (e.g. merge pdf, jwt, vapt, word to pdf, gst, ocr, api)..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Specific Tool Selector */}
          <select
            id="seo-tool-select"
            value={selectedTool}
            aria-label="Filter by specific tool"
            onChange={(e) => setSelectedTool(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs font-medium cursor-pointer max-w-[200px] truncate"
          >
            <option value="all">All Tools ({allToolNames.length} Tools)</option>
            {allToolNames.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Category Selector */}
          <select
            id="seo-category-select"
            value={selectedCategory}
            aria-label="Filter by tool category"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedTool('all');
            }}
            className="px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs font-medium cursor-pointer"
          >
            <option value="all">All Categories (9 Groups)</option>
            <option value="developer">Developer Utilities</option>
            <option value="security">Security & Diagnostics</option>
            <option value="pdf">PDF Studio (31 Tools)</option>
            <option value="finance">Finance & Stock Market</option>
            <option value="utility">Career & Utility Tools</option>
            <option value="age">Age & Cosmic Calculator</option>
            <option value="bengali">Bengali Calendar & Panjika</option>
            <option value="api">REST APIs & Endpoints</option>
            <option value="general">Platform & General</option>
          </select>

          {/* Intent Selector */}
          <select
            id="seo-intent-select"
            value={selectedIntent}
            aria-label="Filter by search intent"
            onChange={(e) => setSelectedIntent(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs font-medium cursor-pointer"
          >
            <option value="all">All Intents</option>
            <option value="transactional">Transactional</option>
            <option value="informational">Informational</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
      </div>

      {/* Keywords Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredKeywords.map((k, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-all flex flex-col justify-between gap-3 shadow-sm group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${getCategoryBadgeClass(k.category)}`}>
                  {k.category}
                </span>

                <span className="text-[10px] font-mono text-muted-foreground flex-shrink-0">
                  {k.volumeTier} Volume
                </span>
              </div>

              <div className="text-sm font-semibold text-foreground break-words">{k.keyword}</div>

              {k.toolName && k.toolHref && (
                <div className="pt-0.5">
                  <a
                    href={k.toolHref}
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium text-primary hover:underline hover:text-primary/80 transition-colors"
                  >
                    <Wrench className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{k.toolName}</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60 flex-shrink-0" />
                  </a>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/50 text-[11px] text-muted-foreground">
              <span className="capitalize font-mono text-[10px]">Intent: {k.intent}</span>
              <button
                onClick={() => copyKeyword(k.keyword, idx)}
                className="p-1 px-2 rounded hover:bg-muted text-primary flex items-center gap-1 cursor-pointer transition-colors"
                title="Copy Keyword"
              >
                {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-xs">{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredKeywords.length === 0 && (
        <div className="text-center py-12 border border-dashed border-border rounded-2xl space-y-2">
          <p className="text-sm font-medium text-foreground">No matching keywords found</p>
          <p className="text-xs text-muted-foreground">Try adjusting your search filter or selecting a different tool.</p>
        </div>
      )}

      {/* JSON-LD Schema Showcase */}
      <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
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
            className="px-3.5 py-1.5 rounded-xl border border-border bg-muted/60 text-foreground text-xs font-semibold flex items-center gap-1.5 hover:border-primary/50 cursor-pointer"
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
