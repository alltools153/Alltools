'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { ToolConfig } from '@/lib/docforge/tools-config';
import { JsonTool } from '@/components/JsonTool';
import { JwtTool } from '@/components/JwtTool';
import { RegexTool } from '@/components/RegexTool';
import { ToolWorkspace } from '@/components/docforge/tool-workspace';
import { Sparkles, ArrowRight } from 'lucide-react';

const LoadingSpinner = () => (
  <div className="py-16 flex flex-col items-center justify-center gap-3 text-muted-foreground">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    <span className="text-xs font-mono">Initializing live tool runtime...</span>
  </div>
);

const VaptScanner = dynamic(() => import('@/app/vapt-scanner/page'), { ssr: false, loading: LoadingSpinner });
const AgeCalculator = dynamic(() => import('@/app/age-calculator/page'), { ssr: false, loading: LoadingSpinner });
const BengaliCalendar = dynamic(() => import('@/app/bengali-calendar/page'), { ssr: false, loading: LoadingSpinner });
const ResumeAtsChecker = dynamic(() => import('@/app/resume-ats-checker/page'), { ssr: false, loading: LoadingSpinner });
const QrGenerator = dynamic(() => import('@/app/qr-generator/page'), { ssr: false, loading: LoadingSpinner });
const ImageCompressor = dynamic(() => import('@/app/image-compressor/page'), { ssr: false, loading: LoadingSpinner });
const StockMarket = dynamic(() => import('@/app/stock-market/page'), { ssr: false, loading: LoadingSpinner });
const GstCalculator = dynamic(() => import('@/app/gst-calculator/page'), { ssr: false, loading: LoadingSpinner });
const SipCalculator = dynamic(() => import('@/app/sip-calculator/page'), { ssr: false, loading: LoadingSpinner });
const SqlGenerator = dynamic(() => import('@/app/sql-generator/page'), { ssr: false, loading: LoadingSpinner });
const GitignoreGenerator = dynamic(() => import('@/app/gitignore-generator/page'), { ssr: false, loading: LoadingSpinner });
const Base64Codec = dynamic(() => import('@/app/base64-encoder-decoder/page'), { ssr: false, loading: LoadingSpinner });
const UuidGenerator = dynamic(() => import('@/app/uuid-generator/page'), { ssr: false, loading: LoadingSpinner });
const CronGenerator = dynamic(() => import('@/app/cron-expression-generator/page'), { ssr: false, loading: LoadingSpinner });
const SslChecker = dynamic(() => import('@/app/ssl-certificate-checker/page'), { ssr: false, loading: LoadingSpinner });
const DnsLookup = dynamic(() => import('@/app/dns-lookup/page'), { ssr: false, loading: LoadingSpinner });
const WhoisLookup = dynamic(() => import('@/app/whois-lookup/page'), { ssr: false, loading: LoadingSpinner });
const EmailSecurity = dynamic(() => import('@/app/email-security/page'), { ssr: false, loading: LoadingSpinner });
const PasswordGenerator = dynamic(() => import('@/app/password-generator/page'), { ssr: false, loading: LoadingSpinner });
const PasswordStrength = dynamic(() => import('@/app/password-strength-checker/page'), { ssr: false, loading: LoadingSpinner });

interface Props {
  slug: string;
  pdfTool?: ToolConfig;
  toolName: string;
}

export function ToolDispatcher({ slug, pdfTool, toolName }: Props) {
  // 1. Core Dev Tools
  if (slug === 'json-formatter') return <JsonTool />;
  if (slug === 'jwt-decoder') return <JwtTool />;
  if (slug === 'regex-tester') return <RegexTool />;

  // 2. PDF Studio Tools (31 Tools)
  if (pdfTool) return <ToolWorkspace tool={pdfTool} />;

  // 3. Security & Diagnostics Tools
  if (slug === 'vapt-scanner' || slug === 'vapt-security-scanner' || slug === 'nmap-audit') return <VaptScanner />;
  if (slug === 'ssl-certificate-checker' || slug === 'ssl-checker') return <SslChecker />;
  if (slug === 'dns-lookup') return <DnsLookup />;
  if (slug === 'whois-lookup') return <WhoisLookup />;
  if (slug === 'email-security') return <EmailSecurity />;
  if (slug === 'password-generator') return <PasswordGenerator />;
  if (slug === 'password-strength-checker') return <PasswordStrength />;

  // 4. Utility & Career Tools
  if (slug === 'age-calculator') return <AgeCalculator />;
  if (slug === 'bengali-calendar' || slug === 'bengali-panjika') return <BengaliCalendar />;
  if (slug === 'resume-ats-checker') return <ResumeAtsChecker />;
  if (slug === 'qr-generator') return <QrGenerator />;
  if (slug === 'image-compressor') return <ImageCompressor />;

  // 5. Finance Tools
  if (slug === 'stock-market') return <StockMarket />;
  if (slug === 'gst-calculator') return <GstCalculator />;
  if (slug === 'sip-calculator') return <SipCalculator />;

  // 6. Developer Stack Tools
  if (slug === 'sql-generator') return <SqlGenerator />;
  if (slug === 'gitignore-generator') return <GitignoreGenerator />;
  if (slug === 'base64-encoder-decoder') return <Base64Codec />;
  if (slug === 'uuid-generator') return <UuidGenerator />;
  if (slug === 'cron-expression-generator') return <CronGenerator />;

  // Fallback Launcher
  return (
    <div className="py-12 px-4 text-center space-y-4">
      <div className="inline-flex p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="max-w-md mx-auto space-y-1">
        <h3 className="text-xl font-bold text-foreground">{toolName} Workspace</h3>
        <p className="text-xs text-muted-foreground">
          Ready to compute locally with zero latency and complete in-memory privacy.
        </p>
      </div>
    </div>
  );
}
