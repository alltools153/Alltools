'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FileCode,
  Copy,
  Check,
  Download,
  Terminal,
  Layers,
  Sparkles,
  Search,
  CheckSquare,
  Square,
  Trash2,
  Lock,
  Zap,
  Info,
  Sliders,
} from 'lucide-react';
import {
  GITIGNORE_TEMPLATES,
  PRESET_BUNDLES,
  buildGitignore,
} from '@/lib/gitignoreTemplates';

export default function GitIgnoreGeneratorPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'node',
    'react',
    'nextjs',
    'vscode',
    'macos',
    'windows',
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'devops' | 'ides_os'>('all');
  const [customRules, setCustomRules] = useState('# Custom project credentials\n*.pem\n*.key\nconfig.local.json');
  const [copied, setCopied] = useState(false);

  // Toggle individual technology checkbox
  const toggleTech = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Apply preset bundle
  const applyPreset = (ids: string[]) => {
    setSelectedIds(ids);
  };

  // Select all or clear all
  const selectAll = () => {
    setSelectedIds(GITIGNORE_TEMPLATES.map((t) => t.id));
  };
  const clearAll = () => {
    setSelectedIds([]);
  };

  // Filter templates list
  const filteredTemplates = useMemo(() => {
    return GITIGNORE_TEMPLATES.filter((t) => {
      const matchCat = activeCategory === 'all' || t.category === activeCategory;
      const matchQuery =
        !searchQuery.trim() ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [activeCategory, searchQuery]);

  // Combined .gitignore output
  const gitignoreContent = useMemo(() => {
    return buildGitignore(selectedIds, customRules);
  }, [selectedIds, customRules]);

  const copyGitignore = () => {
    navigator.clipboard.writeText(gitignoreContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadGitignoreFile = () => {
    const blob = new Blob([gitignoreContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '.gitignore';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const totalLines = gitignoreContent.split('\n').length;

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground font-semibold">Developer Tools</span>
              <span>/</span>
              <span className="text-primary font-bold">Git Ignore Generator</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="p-2 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                <FileCode className="w-7 h-7" />
              </span>
              <span>.gitignore Generator Studio</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Construct comprehensive, production-ready .gitignore files by selecting your languages, frameworks, cloud stacks, operating systems, and IDEs with 1-click download.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm">
              <Lock className="w-3.5 h-3.5" /> 100% In-Server Engine
            </span>
          </div>
        </div>

        {/* Preset Bundles Quick Bar */}
        <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-3" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>1-Click Preset Stacks</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESET_BUNDLES.map((b) => (
              <button
                key={b.name}
                type="button"
                onClick={() => applyPreset(b.ids)}
                className="px-3 py-1.5 rounded-xl border border-border bg-muted/40 hover:bg-muted text-xs text-muted-foreground hover:text-foreground font-medium transition-colors cursor-pointer"
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Selection Left, Preview & Download Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Tech Selector */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Search & Category Tabs */}
            <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-4" style={{ backgroundColor: 'var(--card)' }}>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search technologies (e.g. Docker, Python, Java)..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-muted/40 text-foreground text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={selectAll}
                    className="text-primary hover:underline font-semibold cursor-pointer"
                  >
                    Select All
                  </button>
                  <span className="text-muted-foreground">•</span>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-muted-foreground hover:text-red-400 cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                {[
                  { id: 'all', label: 'All Tech' },
                  { id: 'frontend', label: 'Frontend' },
                  { id: 'backend', label: 'Backend' },
                  { id: 'devops', label: 'DevOps & Cloud' },
                  { id: 'ides_os', label: 'IDEs & OS' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-primary text-primary-foreground shadow-glow-primary'
                        : 'bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkbox Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredTemplates.map((t) => {
                const isSelected = selectedIds.includes(t.id);
                return (
                  <div
                    key={t.id}
                    onClick={() => toggleTech(t.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                      isSelected
                        ? 'border-primary bg-primary/10 shadow-sm ring-1 ring-primary/40'
                        : 'border-border bg-card hover:border-border hover:bg-muted/40'
                    }`}
                    style={{ backgroundColor: isSelected ? undefined : 'var(--card)' }}
                  >
                    <div className="pt-0.5 text-primary">
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-primary" />
                      ) : (
                        <Square className="w-4 h-4 text-muted-foreground/60" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-foreground">
                        <span>{t.icon}</span>
                        <span className="truncate">{t.name}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-1 leading-snug">
                        {t.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Rules Textarea */}
            <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-2.5" style={{ backgroundColor: 'var(--card)' }}>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Custom Ignore Rules (Appended to bottom)
              </label>
              <textarea
                rows={3}
                value={customRules}
                onChange={(e) => setCustomRules(e.target.value)}
                placeholder="Add custom paths (e.g. *.secret, /my-private-folder/)..."
                className="w-full p-3.5 rounded-xl border border-border bg-muted/40 text-foreground font-mono text-xs focus:outline-none focus:border-primary resize-y"
              />
            </div>

          </div>

          {/* Right Column: Live .gitignore Preview & Downloads */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="rounded-3xl border border-border bg-card shadow-xl overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
              
              {/* Code Box Toolbar */}
              <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>.gitignore ({selectedIds.length} Techs)</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    {totalLines} lines
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copyGitignore}
                    className="py-1.5 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={downloadGitignoreFile}
                    className="py-1.5 px-3 rounded-xl border border-border bg-muted/60 hover:bg-muted text-foreground text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              {/* Code Preview Box */}
              <div className="p-5 bg-black/90 font-mono text-xs text-emerald-400 overflow-x-auto max-h-[500px] overflow-y-auto selection:bg-emerald-500 selection:text-black">
                <pre className="leading-relaxed whitespace-pre font-mono">
                  {gitignoreContent}
                </pre>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="p-5 rounded-2xl border border-border bg-card/60 text-xs space-y-2">
              <h4 className="font-bold text-foreground flex items-center gap-1.5">
                <Info className="w-4 h-4 text-primary" />
                <span>Git Pro-Tip: Untracking already committed files</span>
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                If files like <code className="text-foreground bg-muted px-1 rounded">node_modules/</code> or <code className="text-foreground bg-muted px-1 rounded">.env</code> were previously committed to Git history, add this file and run:
              </p>
              <div className="p-2.5 rounded-xl bg-black font-mono text-[11px] text-cyan-300 select-all">
                git rm -r --cached . &amp;&amp; git add . &amp;&amp; git commit -m "chore: apply updated .gitignore"
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
