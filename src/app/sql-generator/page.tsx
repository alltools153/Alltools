'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Database,
  Sparkles,
  Copy,
  Check,
  Download,
  Terminal,
  Code2,
  Cpu,
  Layers,
  Zap,
  Info,
  CheckCircle2,
  FileCode,
  ArrowRight,
  BookOpen,
  Sliders,
  Table,
} from 'lucide-react';
import { generateSqlFromPrompt, SqlDialect, GeneratedSqlResult } from '@/lib/sqlGeneratorEngine';

const PROMPT_PRESETS = [
  {
    label: 'Top 5 Sales Employees',
    prompt: 'Find the top 5 highest paid employees in the Sales department hired after January 2022, including department name and salary.',
    dialect: 'mysql' as SqlDialect,
  },
  {
    label: 'Running Category Total',
    prompt: 'Calculate a running total of sales revenue and rank items per product category using window functions.',
    dialect: 'postgres' as SqlDialect,
  },
  {
    label: 'Monthly Cohort Revenue',
    prompt: 'Get monthly active customers with total completed orders and gross revenue greater than $1,000 grouped by country.',
    dialect: 'postgres' as SqlDialect,
  },
  {
    label: 'Soft Delete Inactive Accounts',
    prompt: 'Safely soft delete inactive user accounts older than 2 years that have never placed an order.',
    dialect: 'sqlserver' as SqlDialect,
  },
  {
    label: 'E-Commerce Schema Migration',
    prompt: 'Create normalized SQL schema tables for users and orders with foreign keys, timestamps, and indexes.',
    dialect: 'postgres' as SqlDialect,
  },
];

export default function SqlGeneratorPage() {
  const [prompt, setPrompt] = useState(
    'Find the top 5 highest paid employees in the Sales department hired after January 2022, including department name and salary.'
  );
  const [dialect, setDialect] = useState<SqlDialect>('mysql');
  const [schemaContext, setSchemaContext] = useState('');
  const [showSchemaBox, setShowSchemaBox] = useState(false);
  const [result, setResult] = useState<GeneratedSqlResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate on input changes
  useEffect(() => {
    let isCurrent = true;
    setIsGenerating(true);

    const timer = setTimeout(() => {
      if (prompt.trim()) {
        const res = generateSqlFromPrompt({
          prompt,
          dialect,
          schema: schemaContext,
        });
        if (isCurrent) {
          setResult(res);
          setIsGenerating(false);
        }
      }
    }, 150);

    return () => {
      isCurrent = false;
      clearTimeout(timer);
    };
  }, [prompt, dialect, schemaContext]);

  const copySql = () => {
    if (!result?.sql) return;
    navigator.clipboard.writeText(result.sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSqlFile = () => {
    if (!result?.sql) return;
    const blob = new Blob([result.sql], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `query_${dialect}_${Date.now()}.sql`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
              <span className="text-primary font-bold">AI SQL Generator</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="p-2 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                <Database className="w-7 h-7" />
              </span>
              <span>AI SQL Query &amp; Schema Generator</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Transform natural language instructions into optimized, production-ready SQL queries across MySQL, PostgreSQL, SQL Server, SQLite, and Oracle with step-by-step clause explanations and index recommendations.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm">
              <Cpu className="w-3.5 h-3.5" /> High-Performance Synthesis
            </span>
          </div>
        </div>

        {/* Input Studio Card */}
        <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-5" style={{ backgroundColor: 'var(--card)' }}>
          
          {/* Dialect Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Target SQL Dialect
              </label>
              <button
                type="button"
                onClick={() => setShowSchemaBox(!showSchemaBox)}
                className="text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <Table className="w-3.5 h-3.5" />
                <span>{showSchemaBox ? 'Hide Schema Context' : '+ Add Table Schema Context'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'mysql', label: 'MySQL 8.0+', icon: '🐬' },
                { id: 'postgres', label: 'PostgreSQL', icon: '🐘' },
                { id: 'sqlserver', label: 'SQL Server (T-SQL)', icon: '🏢' },
                { id: 'sqlite', label: 'SQLite', icon: '🪶' },
                { id: 'oracle', label: 'Oracle PL/SQL', icon: '🔴' },
              ].map((d) => {
                const active = dialect === d.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDialect(d.id as SqlDialect)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      active
                        ? 'border-primary bg-primary/15 text-primary shadow-sm ring-1 ring-primary/40 font-bold'
                        : 'border-border bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/60'
                    }`}
                  >
                    <span>{d.icon}</span>
                    <span className="truncate">{d.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Schema Box */}
          {showSchemaBox && (
            <div className="p-4 rounded-2xl bg-muted/30 border border-border space-y-2 animate-in fade-in duration-150">
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Optional Schema / Existing Tables Definition
              </label>
              <textarea
                rows={3}
                value={schemaContext}
                onChange={(e) => setSchemaContext(e.target.value)}
                placeholder="e.g. users(id, full_name, email, role, created_at), orders(id, user_id, amount, status, created_at)..."
                className="w-full p-3 rounded-xl border border-border bg-card text-foreground font-mono text-xs focus:outline-none focus:border-primary resize-y"
              />
            </div>
          )}

          {/* Natural Language Prompt Input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              What SQL query do you want to build?
            </label>
            <div className="relative">
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your query in plain English (e.g., 'Find the top 5 customers with highest total revenue in 2024 grouped by state')..."
                className="w-full p-4 rounded-2xl border border-border bg-muted/40 text-foreground text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-y leading-relaxed"
              />
            </div>
          </div>

          {/* Prompt Presets Pills */}
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Quick Prompt Inspirations:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PROMPT_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setPrompt(preset.prompt);
                    setDialect(preset.dialect);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-border bg-muted/40 hover:bg-muted text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Output Section: Generated SQL & Explanations */}
        {result && (
          <div className="space-y-6">
            
            {/* Generated SQL Code Editor Box */}
            <div className="rounded-3xl border border-border bg-card shadow-xl overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
              
              {/* Code Box Toolbar */}
              <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold uppercase">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>{dialect.toUpperCase()} QUERY</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono hidden sm:inline">
                    {result.sql.split('\n').length} lines
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copySql}
                    className="py-1.5 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy SQL'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={downloadSqlFile}
                    className="py-1.5 px-3 rounded-xl border border-border bg-muted/60 hover:bg-muted text-foreground text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Download .sql</span>
                  </button>
                </div>
              </div>

              {/* Syntax Code Display */}
              <div className="p-5 sm:p-6 bg-black/90 font-mono text-xs sm:text-sm text-emerald-400 overflow-x-auto selection:bg-emerald-500 selection:text-black">
                <pre className="leading-relaxed whitespace-pre font-mono">
                  {result.sql}
                </pre>
              </div>
            </div>

            {/* Explanation & Optimization Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Query Explanation Breakdown */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4" style={{ backgroundColor: 'var(--card)' }}>
                  <div className="flex items-center gap-2 border-b border-border pb-3">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-bold text-foreground">Query Execution Logic Breakdown</h3>
                  </div>

                  <div className="space-y-3">
                    {result.explanation.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-muted/30 border border-border text-xs space-y-1">
                        <div className="font-bold text-foreground flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{item.step}</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed pl-5">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Recommended Indexes & Performance Tips */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Index Recommendations */}
                <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4" style={{ backgroundColor: 'var(--card)' }}>
                  <div className="flex items-center gap-2 border-b border-border pb-3">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-bold text-foreground">Recommended B-Tree Indexes</h3>
                  </div>

                  {result.suggestedIndexes.length > 0 ? (
                    <div className="space-y-2">
                      {result.suggestedIndexes.map((idxSql, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-black/80 border border-border text-[11px] font-mono text-cyan-300 break-all select-all flex items-start justify-between gap-2"
                        >
                          <span>{idxSql}</span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(idxSql);
                            }}
                            className="p-1 text-muted-foreground hover:text-white cursor-pointer flex-shrink-0"
                            title="Copy index command"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">Standard primary key indexes suffice for this query.</p>
                  )}
                </div>

                {/* Performance Tips */}
                {result.performanceTips.length > 0 && (
                  <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-3" style={{ backgroundColor: 'var(--card)' }}>
                    <div className="flex items-center gap-2 border-b border-border pb-3">
                      <Sliders className="w-4 h-4 text-primary" />
                      <h3 className="text-sm font-bold text-foreground">Performance Optimization Advice</h3>
                    </div>
                    <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-4 leading-relaxed">
                      {result.performanceTips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
