'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Receipt,
  Calculator,
  ArrowRightLeft,
  Copy,
  Check,
  Download,
  Sparkles,
  HelpCircle,
  ChevronDown,
  TrendingUp,
  Percent,
  Layers,
  ArrowRight,
  Shield,
  FileSpreadsheet,
} from 'lucide-react';
import ToolSeoFooter from '@/components/seo/ToolSeoFooter';

export default function GstCalculatorPage() {
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [amount, setAmount] = useState<number>(10000);
  const [rate, setRate] = useState<number>(18);
  const [customRate, setCustomRate] = useState<string>('');
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP'>('INR');
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const SLABS = [5, 12, 18, 28];

  const currencySymbol = useMemo(() => {
    switch (currency) {
      case 'INR': return '₹';
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      default: return '₹';
    }
  }, [currency]);

  const activeRate = useMemo(() => {
    if (customRate !== '') {
      const parsed = parseFloat(customRate);
      return isNaN(parsed) ? 0 : parsed;
    }
    return rate;
  }, [rate, customRate]);

  // Calculations
  const results = useMemo(() => {
    const amt = Math.max(0, amount);
    const r = Math.max(0, activeRate);

    let baseAmount = 0;
    let gstAmount = 0;
    let finalAmount = 0;

    if (mode === 'exclusive') {
      // Base + GST = Total
      baseAmount = amt;
      gstAmount = (amt * r) / 100;
      finalAmount = baseAmount + gstAmount;
    } else {
      // Inclusive Mode: Extract Base & GST
      finalAmount = amt;
      baseAmount = (amt * 100) / (100 + r);
      gstAmount = finalAmount - baseAmount;
    }

    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;
    const igst = gstAmount;

    return {
      baseAmount: Math.round(baseAmount * 100) / 100,
      gstAmount: Math.round(gstAmount * 100) / 100,
      finalAmount: Math.round(finalAmount * 100) / 100,
      cgst: Math.round(cgst * 100) / 100,
      sgst: Math.round(sgst * 100) / 100,
      igst: Math.round(igst * 100) / 100,
      rate: r,
    };
  }, [amount, activeRate, mode]);

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const copySummary = () => {
    const text = `GST Tax Breakdown (${mode === 'exclusive' ? 'GST Exclusive' : 'GST Inclusive'} Mode)\nBase Price: ${currencySymbol}${formatMoney(results.baseAmount)}\nGST Rate: ${results.rate}%\nTotal GST Amount: ${currencySymbol}${formatMoney(results.gstAmount)}\n - CGST (Central Tax ${results.rate / 2}%): ${currencySymbol}${formatMoney(results.cgst)}\n - SGST (State Tax ${results.rate / 2}%): ${currencySymbol}${formatMoney(results.sgst)}\n - IGST (Interstate ${results.rate}%): ${currencySymbol}${formatMoney(results.igst)}\nTotal Amount: ${currencySymbol}${formatMoney(results.finalAmount)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      q: 'What is GST Exclusive vs GST Inclusive calculation?',
      a: '• GST Exclusive (Adding GST): The entered price is the base manufacturing/service cost, and GST is added on top.\n• GST Inclusive (Extracting GST): The entered price is the final MRP/retail price, and the base value plus embedded GST are reverse-calculated.',
    },
    {
      q: 'What is the difference between CGST, SGST, and IGST in India?',
      a: '• CGST & SGST: Applied on intra-state supplies within the same state (split equally 50/50 between Central and State governments).\n• IGST (Integrated GST): Applied on inter-state sales and imports, collected directly by the Central government.',
    },
    {
      q: 'What are standard Indian GST tax brackets?',
      a: 'India follows 4 major GST tax slabs:\n• 5%: Essential household goods, basic foods, sugar, tea, transport services\n• 12%: Processed foods, business class air travel, computers\n• 18%: IT software, standard services, consumer goods, dining\n• 28%: Luxury goods, automobiles, high-end consumer appliances.',
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
              <span className="text-foreground font-semibold">Finance &amp; Calculators</span>
              <span>/</span>
              <span className="text-primary font-bold">GST Calculator</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="p-2 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Receipt className="w-7 h-7" />
              </span>
              <span>Goods &amp; Services Tax (GST) Calculator</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Calculate Goods &amp; Services Tax (GST) in Exclusive or Inclusive modes with CGST, SGST, and IGST breakdowns for 5%, 12%, 18%, 28%, and custom tax slabs.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm">
              <Percent className="w-3.5 h-3.5" /> India &amp; Global Slabs
            </span>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-card border border-border" style={{ backgroundColor: 'var(--card)' }}>
          <button
            type="button"
            onClick={() => setMode('exclusive')}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === 'exclusive'
                ? 'bg-primary text-primary-foreground shadow-glow-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
            }`}
          >
            Exclusive GST (Base + GST = Total)
          </button>
          <button
            type="button"
            onClick={() => setMode('inclusive')}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === 'inclusive'
                ? 'bg-primary text-primary-foreground shadow-glow-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
            }`}
          >
            Inclusive GST (Total → Extract Base &amp; GST)
          </button>
        </div>

        {/* Input & Output Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Calculation Inputs */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-5" style={{ backgroundColor: 'var(--card)' }}>
              
              {/* Currency & Amount Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {mode === 'exclusive' ? 'Base Amount (Excluding GST)' : 'Total Amount (Including GST)'}
                  </label>
                  
                  {/* Currency Picker */}
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as any)}
                    className="px-2.5 py-1 rounded-lg border border-border bg-muted/40 text-xs font-mono font-bold text-foreground cursor-pointer"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-black text-muted-foreground text-base">
                    {currencySymbol}
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    placeholder="Enter amount..."
                    className="w-full pl-9 pr-4 py-3.5 rounded-2xl border border-border bg-muted/40 text-foreground font-mono text-base font-bold focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* GST Rate Slabs Selector */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Select GST Tax Rate
                </label>
                
                <div className="grid grid-cols-4 gap-2">
                  {SLABS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setRate(s);
                        setCustomRate('');
                      }}
                      className={`py-2.5 rounded-xl border text-xs font-mono font-bold cursor-pointer transition-colors ${
                        rate === s && customRate === ''
                          ? 'border-primary bg-primary/15 text-primary shadow-sm'
                          : 'border-border bg-muted/20 hover:bg-muted/40 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {s}%
                    </button>
                  ))}
                </div>

                {/* Custom Rate Input */}
                <div className="pt-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={0.1}
                      value={customRate}
                      onChange={(e) => setCustomRate(e.target.value)}
                      placeholder="Or enter custom rate (e.g. 7.5%)..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-muted/40 text-xs font-mono text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Invoice Breakdown Scorecard */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-lg space-y-6" style={{ backgroundColor: 'var(--card)' }}>
              
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xs sm:text-sm font-bold text-foreground">
                    Tax Calculation Summary
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={copySummary}
                  className="py-1.5 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                </button>
              </div>

              {/* Big Summary Cards */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-muted/20 border border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">Base / Net Amount</span>
                  <span className="text-base sm:text-lg font-black font-mono text-foreground">
                    {currencySymbol}{formatMoney(results.baseAmount)}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-amber-400">
                  <span className="text-xs font-bold">Total GST ({results.rate}%)</span>
                  <span className="text-base sm:text-lg font-black font-mono">
                    +{currencySymbol}{formatMoney(results.gstAmount)}
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-between text-primary">
                  <span className="text-sm font-black uppercase tracking-wider">Final Total Payable</span>
                  <span className="text-xl sm:text-2xl font-black font-mono">
                    {currencySymbol}{formatMoney(results.finalAmount)}
                  </span>
                </div>
              </div>

              {/* Intra-State vs Inter-State Tax Breakdown */}
              <div className="space-y-2 pt-2 border-t border-border text-xs">
                <div className="text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                  Indian Tax Split (CGST + SGST or IGST)
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono">
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border space-y-0.5">
                    <div className="text-[10px] text-muted-foreground">CGST ({results.rate / 2}%)</div>
                    <div className="font-bold text-foreground">{currencySymbol}{formatMoney(results.cgst)}</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border space-y-0.5">
                    <div className="text-[10px] text-muted-foreground">SGST ({results.rate / 2}%)</div>
                    <div className="font-bold text-foreground">{currencySymbol}{formatMoney(results.sgst)}</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-muted/20 border border-border flex items-center justify-between font-mono">
                  <span className="text-[10px] text-muted-foreground">Inter-state IGST ({results.rate}%)</span>
                  <span className="font-bold text-foreground">{currencySymbol}{formatMoney(results.igst)}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* How To Use Guide */}
        <div className="p-6 rounded-3xl border border-border bg-card space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-foreground">How to Calculate Goods &amp; Services Tax</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">01. Choose Calculation Mode</span>
              <p>Select Exclusive if you want to add GST on top of base cost, or Inclusive to extract embedded tax from MRP.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">02. Pick Tax Bracket</span>
              <p>Choose 5%, 12%, 18%, 28% or enter any custom global VAT/GST percentage.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">03. Copy Invoice Breakdown</span>
              <p>Copy the itemized CGST, SGST, and IGST calculation summary directly into your billing software or client quote.</p>
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
                  <div className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed border-t border-border/50 whitespace-pre-line">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        <div className="pt-2">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Related Finance &amp; Utility Tools:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/tools/stock-market"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Indian Stock Market View</div>
                <div className="text-[11px] text-muted-foreground truncate">Sensex &amp; Nifty 50 live feed</div>
              </div>
            </Link>

            <Link
              href="/tools/age-calculator"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Calculator className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Age &amp; Milestone Calculator</div>
                <div className="text-[11px] text-muted-foreground truncate">9 Planetary orbits &amp; chronology</div>
              </div>
            </Link>

            <Link
              href="/tools/qr-generator"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                <Layers className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">QR Code Generator</div>
                <div className="text-[11px] text-muted-foreground truncate">Create UPI payment QR codes</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Master SEO Blueprint & Structured Data Schema Footer */}
        <ToolSeoFooter toolSlug="gst-calculator" />
      </div>
    </div>
  );
}
