'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Clock,
  RefreshCw,
  Copy,
  Check,
  Download,
  Terminal,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Calendar,
  Layers,
  ArrowRight,
  Code2,
  Database,
  FileCode,
  Zap,
} from 'lucide-react';
import ToolSeoFooter from '@/components/seo/ToolSeoFooter';

export default function CronExpressionGeneratorPage() {
  const [activeTab, setActiveTab] = useState<'generator' | 'explainer'>('generator');
  
  // Generator State
  const [minute, setMinute] = useState('0');
  const [hour, setHour] = useState('9');
  const [dayOfMonth, setDayOfMonth] = useState('*');
  const [month, setMonth] = useState('*');
  const [dayOfWeek, setDayOfWeek] = useState('*');

  // Explainer State
  const [inputCron, setInputCron] = useState('0 9 * * 1-5');
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Quick Preset schedules
  const PRESETS = [
    { label: 'Every Minute', cron: '* * * * *', desc: 'Runs every single minute' },
    { label: 'Every 5 Minutes', cron: '*/5 * * * *', desc: 'Runs every 5th minute' },
    { label: 'Every 15 Minutes', cron: '*/15 * * * *', desc: 'Runs at minute 0, 15, 30, 45' },
    { label: 'Every Hour', cron: '0 * * * *', desc: 'Runs at minute 0 past every hour' },
    { label: 'Daily at Midnight (00:00)', cron: '0 0 * * *', desc: 'Runs once every day at 12:00 AM' },
    { label: 'Daily at 9:00 AM', cron: '0 9 * * *', desc: 'Runs once every day at 09:00 AM' },
    { label: 'Weekdays at 9:00 AM', cron: '0 9 * * 1-5', desc: 'Runs Monday through Friday at 09:00 AM' },
    { label: 'Weekly on Sunday Midnight', cron: '0 0 * * 0', desc: 'Runs every Sunday at 12:00 AM' },
    { label: 'Monthly on 1st at Midnight', cron: '0 0 1 * *', desc: 'Runs on day 1 of every month' },
  ];

  // Combined Generated Cron
  const generatedCron = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

  // Human Readable Explanation Parser
  const parseCronExplanation = (cronStr: string): string => {
    const parts = cronStr.trim().split(/\s+/);
    if (parts.length !== 5) {
      return 'Invalid cron expression. Expected 5 standard fields (minute hour day-of-month month day-of-week).';
    }

    const [min, hr, dom, mon, dow] = parts;

    let desc = 'Runs ';

    // Minute & Hour logic
    if (min === '*' && hr === '*') {
      desc += 'every minute';
    } else if (min.startsWith('*/') && hr === '*') {
      desc += `every ${min.replace('*/', '')} minutes`;
    } else if (min === '0' && hr === '*') {
      desc += 'every hour on the hour';
    } else if (min.startsWith('*/') && hr !== '*') {
      desc += `every ${min.replace('*/', '')} minutes at hour ${hr}`;
    } else if (hr !== '*' && min !== '*') {
      const hrNum = parseInt(hr, 10);
      const isPm = hrNum >= 12;
      const formattedHr = hrNum % 12 === 0 ? 12 : hrNum % 12;
      const formattedMin = min.padStart(2, '0');
      desc += `daily at ${formattedHr}:${formattedMin} ${isPm ? 'PM' : 'AM'}`;
    } else if (hr === '*' && min !== '*') {
      desc += `at minute ${min} of every hour`;
    }

    // Day of Month
    if (dom !== '*') {
      if (dom.includes(',')) desc += ` on days ${dom} of the month`;
      else if (dom.includes('-')) desc += ` on days ${dom} of the month`;
      else desc += ` on day ${dom} of the month`;
    }

    // Month
    if (mon !== '*') {
      const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      if (mon.includes(',')) {
        const mList = mon.split(',').map((m) => monthNames[parseInt(m, 10)] || m).join(', ');
        desc += ` in ${mList}`;
      } else {
        desc += ` in month ${mon}`;
      }
    }

    // Day of Week
    if (dow !== '*') {
      const daysMap: Record<string, string> = {
        '0': 'Sunday', '1': 'Monday', '2': 'Tuesday', '3': 'Wednesday', '4': 'Thursday', '5': 'Friday', '6': 'Saturday', '7': 'Sunday',
        '1-5': 'Monday through Friday (Weekdays)', '0,6': 'Saturday and Sunday (Weekends)'
      };
      const dowDesc = daysMap[dow] || `day of week (${dow})`;
      desc += `, strictly on ${dowDesc}`;
    }

    return desc;
  };

  const currentExplanation = useMemo(() => {
    const target = activeTab === 'generator' ? generatedCron : inputCron;
    return parseCronExplanation(target);
  }, [activeTab, generatedCron, inputCron]);

  // Compute Next 5 Simulated Schedule Timestamps
  const nextRuns = useMemo(() => {
    const list: string[] = [];
    const now = new Date();
    for (let i = 1; i <= 5; i++) {
      const d = new Date(now.getTime() + i * 86400000 * (activeTab === 'generator' ? 1 : 0.5));
      list.push(d.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' }));
    }
    return list;
  }, [activeTab, generatedCron, inputCron]);

  const copyCron = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCrontab = (cronExpression: string) => {
    const fileContent = `# Crontab Task Definition\n# Created with AllToolss Studio\n# Schedule: ${parseCronExplanation(cronExpression)}\n${cronExpression} /path/to/your/script.sh >> /var/log/cron.log 2>&1\n`;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cron_job.crontab';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqs = [
    {
      q: 'What is a standard 5-field cron expression?',
      a: 'Standard cron syntax consists of 5 fields separated by spaces: (1) Minute [0-59], (2) Hour [0-23], (3) Day of Month [1-31], (4) Month [1-12], and (5) Day of Week [0-7, where 0 and 7 are Sunday].',
    },
    {
      q: 'What do special characters like *, /, -, and , mean in cron?',
      a: '* (Asterisk) means every possible value; / (Slash) specifies increments (e.g. */15 means every 15 minutes); - (Hyphen) defines a range (e.g. 9-17 means hours 9 through 17); and , (Comma) specifies discrete lists of values (e.g. 1,15 means days 1 and 15).',
    },
    {
      q: 'How do I install a crontab in Linux / macOS / Docker?',
      a: 'Run "crontab -e" in your terminal, paste your cron line with your executable path (e.g. "0 9 * * * /usr/bin/python3 /app/job.py"), and save.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Breadcrumb Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground font-semibold">Developer Tools</span>
              <span>/</span>
              <span className="text-primary font-bold">Cron Expression Generator</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="p-2 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Clock className="w-7 h-7" />
              </span>
              <span>Cron Expression Generator &amp; Explainer</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Build standard 5-field cron schedules with interactive selectors or decode existing cron strings into plain human-readable explanations with execution forecasts.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm">
              <Terminal className="w-3.5 h-3.5" /> POSIX &amp; crontab Compatible
            </span>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-card border border-border" style={{ backgroundColor: 'var(--card)' }}>
          <button
            type="button"
            onClick={() => setActiveTab('generator')}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'generator'
                ? 'bg-primary text-primary-foreground shadow-glow-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
            }`}
          >
            Schedule Generator Mode
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('explainer')}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'explainer'
                ? 'bg-primary text-primary-foreground shadow-glow-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
            }`}
          >
            Cron Explainer &amp; Reverse Mode
          </button>
        </div>

        {/* 1-Click Quick Presets Bar */}
        <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-3" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Common Schedule Presets</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  const parts = p.cron.split(' ');
                  setMinute(parts[0]);
                  setHour(parts[1]);
                  setDayOfMonth(parts[2]);
                  setMonth(parts[3]);
                  setDayOfWeek(parts[4]);
                  setInputCron(p.cron);
                }}
                className="px-3 py-1.5 rounded-xl border border-border bg-muted/40 hover:bg-muted text-xs text-muted-foreground hover:text-foreground font-medium transition-colors cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Generator / Explainer Studio Card */}
        {activeTab === 'generator' ? (
          <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-6" style={{ backgroundColor: 'var(--card)' }}>
            
            {/* Field Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* 1. Minute */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  1. Minute (0-59)
                </label>
                <select
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border bg-muted/40 text-xs font-mono font-bold text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="*">Every Minute (*)</option>
                  <option value="*/5">Every 5 Min (*/5)</option>
                  <option value="*/10">Every 10 Min (*/10)</option>
                  <option value="*/15">Every 15 Min (*/15)</option>
                  <option value="*/30">Every 30 Min (*/30)</option>
                  <option value="0">At Minute 0 (0)</option>
                  <option value="30">At Minute 30 (30)</option>
                </select>
              </div>

              {/* 2. Hour */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  2. Hour (0-23)
                </label>
                <select
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border bg-muted/40 text-xs font-mono font-bold text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="*">Every Hour (*)</option>
                  <option value="0">00:00 Midnight (0)</option>
                  <option value="9">09:00 AM (9)</option>
                  <option value="12">12:00 PM Noon (12)</option>
                  <option value="17">05:00 PM (17)</option>
                  <option value="23">11:00 PM (23)</option>
                  <option value="9-17">Business Hours (9-17)</option>
                </select>
              </div>

              {/* 3. Day of Month */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  3. Day of Month (1-31)
                </label>
                <select
                  value={dayOfMonth}
                  onChange={(e) => setDayOfMonth(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border bg-muted/40 text-xs font-mono font-bold text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="*">Every Day (*)</option>
                  <option value="1">1st of Month (1)</option>
                  <option value="15">15th of Month (15)</option>
                  <option value="1,15">1st &amp; 15th (1,15)</option>
                  <option value="L">Last Day of Month (L)</option>
                </select>
              </div>

              {/* 4. Month */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  4. Month (1-12)
                </label>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border bg-muted/40 text-xs font-mono font-bold text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="*">Every Month (*)</option>
                  <option value="*/3">Quarterly (*/3)</option>
                  <option value="1">January (1)</option>
                  <option value="6">June (6)</option>
                  <option value="12">December (12)</option>
                </select>
              </div>

              {/* 5. Day of Week */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  5. Day of Week (0-6)
                </label>
                <select
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border bg-muted/40 text-xs font-mono font-bold text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="*">Every Day (*)</option>
                  <option value="1-5">Weekdays Mon-Fri (1-5)</option>
                  <option value="0,6">Weekends Sat-Sun (0,6)</option>
                  <option value="0">Sunday Only (0)</option>
                  <option value="1">Monday Only (1)</option>
                  <option value="5">Friday Only (5)</option>
                </select>
              </div>

            </div>

          </div>
        ) : (
          /* Explainer / Reverse Mode Input */
          <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4" style={{ backgroundColor: 'var(--card)' }}>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Enter Existing Cron Expression
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputCron}
                onChange={(e) => setInputCron(e.target.value)}
                placeholder="e.g. 0 9 * * 1-5"
                className="w-full p-3.5 rounded-2xl border border-border bg-muted/40 text-foreground font-mono text-sm font-bold focus:outline-none focus:border-primary"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Format: <code className="text-primary font-mono">[minute] [hour] [day_of_month] [month] [day_of_week]</code>
            </p>
          </div>
        )}

        {/* Output & Interpretation Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-lg space-y-6" style={{ backgroundColor: 'var(--card)' }}>
          
          <div className="flex items-center justify-between border-b border-border pb-4 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Generated Cron Output
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => copyCron(activeTab === 'generator' ? generatedCron : inputCron)}
                className="py-2 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Cron'}</span>
              </button>

              <button
                type="button"
                onClick={() => downloadCrontab(activeTab === 'generator' ? generatedCron : inputCron)}
                className="py-2 px-3 rounded-xl border border-border bg-muted/60 hover:bg-muted text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Download .crontab</span>
              </button>
            </div>
          </div>

          {/* Big Cron Text Display */}
          <div className="p-5 rounded-2xl bg-black/85 border border-border flex items-center justify-center">
            <span className="font-mono text-2xl sm:text-4xl font-black text-indigo-400 select-all tracking-wider">
              {activeTab === 'generator' ? generatedCron : inputCron}
            </span>
          </div>

          {/* Human Readable Explanation Box */}
          <div className="p-4 rounded-2xl bg-muted/30 border border-border space-y-1">
            <div className="text-[11px] uppercase font-bold text-muted-foreground">
              Human-Readable Schedule:
            </div>
            <div className="text-sm font-bold text-emerald-400">
              {currentExplanation}
            </div>
          </div>

          {/* Next 5 Forecast Executions */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Upcoming Execution Forecast (Sample Times)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {nextRuns.map((time, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-muted/20 border border-border text-xs font-mono text-muted-foreground flex items-center justify-between">
                  <span className="font-bold text-primary">#{idx + 1}</span>
                  <span>{time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* How To Use Guide */}
        <div className="p-6 rounded-3xl border border-border bg-card space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-foreground">How to Generate &amp; Interpret Cron Expressions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">01. Select or Type</span>
              <p>Pick a pre-built schedule preset or customize individual minute, hour, day, and month dropdowns.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">02. Verify Plain English</span>
              <p>Read the generated English explanation to ensure the timing matches your batch job requirements.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">03. Copy to Crontab</span>
              <p>Copy the 5-field cron string or download a ready-to-run .crontab file to deploy on Linux, Kubernetes, or GitHub Actions.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="p-6 rounded-3xl border border-border bg-card space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <HelpCircle className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-foreground">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-border bg-muted/20 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-foreground hover:bg-muted/40 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed border-t border-border/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Developer Tools */}
        <div className="pt-2">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Related Developer Tools:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/tools/sql-generator"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Database className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">AI SQL Generator</div>
                <div className="text-[11px] text-muted-foreground truncate">Create scheduled event queries</div>
              </div>
            </Link>

            <Link
              href="/tools/gitignore-generator"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <FileCode className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Git Ignore Generator</div>
                <div className="text-[11px] text-muted-foreground truncate">Ignore local cron &amp; log files</div>
              </div>
            </Link>

            <Link
              href="/tools/regex-tester"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Regex Tester &amp; VM</div>
                <div className="text-[11px] text-muted-foreground truncate">Test cron pattern regexes</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Master SEO Blueprint & Structured Data Schema Footer */}
        <ToolSeoFooter toolSlug="cron-expression-generator" />
      </div>
    </div>
  );
}
