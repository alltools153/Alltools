'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  PiggyBank,
  Calculator,
  Calendar,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Copy,
  Check,
  Download,
  Percent,
  Layers,
  ArrowRight,
  Shield,
  FileSpreadsheet,
  Coins,
} from 'lucide-react';
import ToolSeoFooter from '@/components/seo/ToolSeoFooter';

export default function SipCalculatorPage() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(10000);
  const [annualReturn, setAnnualReturn] = useState<number>(12);
  const [durationYears, setDurationYears] = useState<number>(10);
  const [stepUpPercent, setStepUpPercent] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Future Value Formula: FV = P * [ ( (1 + i)^n - 1 ) / i ] * (1 + i)
  const calculation = useMemo(() => {
    const p = Math.max(100, monthlyInvestment);
    const r = Math.max(0.1, annualReturn) / 100;
    const i = r / 12; // monthly rate
    const n = Math.max(1, durationYears) * 12; // total months
    const stepUp = Math.max(0, stepUpPercent) / 100;

    let totalInvested = 0;
    let maturityValue = 0;

    const yearlyData: {
      year: number;
      monthlyP: number;
      investedThisYear: number;
      cumulativeInvested: number;
      valueAtYearEnd: number;
      totalGain: number;
    }[] = [];

    let currentMonthly = p;
    let runningMaturity = 0;

    for (let yr = 1; yr <= durationYears; yr++) {
      let yearlyInvested = 0;
      for (let m = 1; m <= 12; m++) {
        yearlyInvested += currentMonthly;
        runningMaturity = (runningMaturity + currentMonthly) * (1 + i);
      }
      totalInvested += yearlyInvested;

      yearlyData.push({
        year: yr,
        monthlyP: Math.round(currentMonthly),
        investedThisYear: Math.round(yearlyInvested),
        cumulativeInvested: Math.round(totalInvested),
        valueAtYearEnd: Math.round(runningMaturity),
        totalGain: Math.round(runningMaturity - totalInvested),
      });

      if (stepUp > 0) {
        currentMonthly = currentMonthly * (1 + stepUp);
      }
    }

    maturityValue = Math.round(runningMaturity);
    const estimatedReturns = Math.round(maturityValue - totalInvested);
    const wealthMultiplier = totalInvested > 0 ? (maturityValue / totalInvested).toFixed(2) : '1.00';

    return {
      totalInvested: Math.round(totalInvested),
      estimatedReturns,
      maturityValue,
      wealthMultiplier,
      yearlyData,
    };
  }, [monthlyInvestment, annualReturn, durationYears, stepUpPercent]);

  const formatRupees = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(val);
  };

  const copySummary = () => {
    const text = `SIP Investment Projection\nMonthly Investment: ₹${formatRupees(monthlyInvestment)}\nExpected Return: ${annualReturn}% p.a.\nDuration: ${durationYears} Years\nStep-Up: ${stepUpPercent}% per year\n-----------------------------\nTotal Invested: ₹${formatRupees(calculation.totalInvested)}\nEstimated Wealth Gain: ₹${formatRupees(calculation.estimatedReturns)}\nTotal Maturity Value: ₹${formatRupees(calculation.maturityValue)}\nWealth Multiplier: ${calculation.wealthMultiplier}x`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCsv = () => {
    let csv = 'Year,Monthly Investment (INR),Yearly Invested (INR),Cumulative Invested (INR),Maturity Value (INR),Total Gain (INR)\n';
    calculation.yearlyData.forEach((row) => {
      csv += `${row.year},${row.monthlyP},${row.investedThisYear},${row.cumulativeInvested},${row.valueAtYearEnd},${row.totalGain}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sip_wealth_projection_${durationYears}yrs.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqs = [
    {
      q: 'What is a Systematic Investment Plan (SIP)?',
      a: 'A Systematic Investment Plan (SIP) is an investment vehicle offered by mutual funds allowing investors to deposit a fixed amount of money at regular monthly intervals rather than a lump sum, benefiting from Rupee Cost Averaging and compounding interest.',
    },
    {
      q: 'How does compounding accelerate returns in long-term SIPs?',
      a: 'Compounding generates earnings not only on your principal invested amount but also on accumulated gains over time. In a 15-20 year SIP, exponential compounding typically results in estimated gains far exceeding the total capital invested.',
    },
    {
      q: 'What is Step-Up SIP?',
      a: 'A Step-Up (or Top-Up) SIP automatically increases your monthly investment by a chosen percentage (e.g. 5% or 10%) every year in sync with annual salary increments, substantially boosting the final maturity corpus.',
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
              <span className="text-foreground font-semibold">Finance Tools</span>
              <span>/</span>
              <span className="text-primary font-bold">SIP Calculator</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="p-2 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <TrendingUp className="w-7 h-7" />
              </span>
              <span>Mutual Fund SIP Wealth Calculator</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Calculate projected returns, maturity wealth, power of compounding, and annual step-up growth for mutual fund Systematic Investment Plans (SIP).
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm">
              <Coins className="w-3.5 h-3.5" /> Compound Interest Engine
            </span>
          </div>
        </div>

        {/* Sliders & Visualizer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Interactive Input Controls */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-6" style={{ backgroundColor: 'var(--card)' }}>
              
              {/* 1. Monthly Investment Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-muted-foreground uppercase tracking-wider">Monthly Investment</span>
                  <div className="flex items-center gap-1 font-mono text-base font-black text-primary">
                    <span>₹</span>
                    <input
                      type="number"
                      min={500}
                      max={1000000}
                      step={500}
                      value={monthlyInvestment}
                      onChange={(e) => setMonthlyInvestment(Math.max(100, Number(e.target.value)))}
                      className="w-28 text-right bg-muted/40 border border-border rounded-lg px-2 py-0.5 text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={500}
                  max={200000}
                  step={500}
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                  <span>₹500</span>
                  <span>₹50,000</span>
                  <span>₹2,00,000</span>
                </div>
              </div>

              {/* 2. Expected Annual Return Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-muted-foreground uppercase tracking-wider">Expected Return Rate (p.a.)</span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-400 font-mono text-sm font-black">
                    {annualReturn}%
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={0.5}
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                  <span>1% (Debt/FD)</span>
                  <span>12% - 15% (Equity/Index)</span>
                  <span>30% (Aggressive)</span>
                </div>
              </div>

              {/* 3. Duration in Years Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-muted-foreground uppercase tracking-wider">Time Period</span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/15 text-amber-400 font-mono text-sm font-black">
                    {durationYears} Years ({durationYears * 12} Months)
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={40}
                  step={1}
                  value={durationYears}
                  onChange={(e) => setDurationYears(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                  <span>1 Year</span>
                  <span>15 Years</span>
                  <span>40 Years</span>
                </div>
              </div>

              {/* 4. Optional Annual Step-Up % */}
              <div className="space-y-2 pt-2 border-t border-border">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-muted-foreground uppercase tracking-wider">Annual Step-Up (Top-Up)</span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-cyan-500/15 text-cyan-400 font-mono text-sm font-black">
                    {stepUpPercent}% yearly
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={25}
                  step={1}
                  value={stepUpPercent}
                  onChange={(e) => setStepUpPercent(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                  <span>0% (Fixed)</span>
                  <span>10% (Salary Growth)</span>
                  <span>25%</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Wealth Corpus Summary & Ratio Chart */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-lg space-y-6" style={{ backgroundColor: 'var(--card)' }}>
              
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <PiggyBank className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-xs sm:text-sm font-bold text-foreground">
                    Projected Wealth Summary
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copySummary}
                    className="py-1.5 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Big Metrics Cards */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-muted/20 border border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">Invested Amount</span>
                  <span className="text-base sm:text-lg font-black font-mono text-foreground">
                    ₹{formatRupees(calculation.totalInvested)}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-emerald-400">
                  <span className="text-xs font-bold">Estimated Wealth Gain</span>
                  <span className="text-base sm:text-lg font-black font-mono">
                    +₹{formatRupees(calculation.estimatedReturns)}
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-between text-primary">
                  <div>
                    <span className="text-sm font-black uppercase tracking-wider block">Total Maturity Value</span>
                    <span className="text-[10px] text-muted-foreground font-mono">Multiplier: {calculation.wealthMultiplier}x initial capital</span>
                  </div>
                  <span className="text-xl sm:text-3xl font-black font-mono">
                    ₹{formatRupees(calculation.maturityValue)}
                  </span>
                </div>
              </div>

              {/* Visual Proportion Bar (Invested vs Wealth Gain) */}
              <div className="space-y-2 pt-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Portfolio Composition (Invested vs Gains)
                </div>
                
                <div className="h-4 w-full rounded-full bg-muted/40 overflow-hidden flex">
                  <div
                    className="h-full bg-cyan-500 transition-all duration-500"
                    style={{ width: `${(calculation.totalInvested / calculation.maturityValue) * 100}%` }}
                    title={`Invested: ${Math.round((calculation.totalInvested / calculation.maturityValue) * 100)}%`}
                  />
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${(calculation.estimatedReturns / calculation.maturityValue) * 100}%` }}
                    title={`Gains: ${Math.round((calculation.estimatedReturns / calculation.maturityValue) * 100)}%`}
                  />
                </div>

                <div className="flex justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block"></span>
                    Invested: {Math.round((calculation.totalInvested / calculation.maturityValue) * 100)}%
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                    Gain: {Math.round((calculation.estimatedReturns / calculation.maturityValue) * 100)}%
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Year-by-Year Growth Table */}
        <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center justify-between border-b border-border pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xs sm:text-sm font-bold text-foreground">
                Year-Wise Compounding Schedule ({calculation.yearlyData.length} Years)
              </h3>
            </div>

            <button
              type="button"
              onClick={downloadCsv}
              className="py-1.5 px-3 rounded-xl border border-border bg-muted/60 hover:bg-muted text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-left">
                  <th className="py-2.5 px-3">Year</th>
                  <th className="py-2.5 px-3">Monthly SIP</th>
                  <th className="py-2.5 px-3">Invested (Year)</th>
                  <th className="py-2.5 px-3">Cumulative Invested</th>
                  <th className="py-2.5 px-3 text-emerald-400">Future Value</th>
                  <th className="py-2.5 px-3 text-emerald-400">Cumulative Gain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {calculation.yearlyData.map((row) => (
                  <tr key={row.year} className="hover:bg-muted/20 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-foreground">Year {row.year}</td>
                    <td className="py-2.5 px-3">₹{formatRupees(row.monthlyP)}</td>
                    <td className="py-2.5 px-3">₹{formatRupees(row.investedThisYear)}</td>
                    <td className="py-2.5 px-3">₹{formatRupees(row.cumulativeInvested)}</td>
                    <td className="py-2.5 px-3 font-bold text-emerald-400">₹{formatRupees(row.valueAtYearEnd)}</td>
                    <td className="py-2.5 px-3 font-bold text-emerald-400">+₹{formatRupees(row.totalGain)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How To Use Guide */}
        <div className="p-6 rounded-3xl border border-border bg-card space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-foreground">How to Plan Your SIP Investment</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">01. Set Monthly Amount</span>
              <p>Determine a comfortable monthly savings amount that fits within your budget.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">02. Estimate Return &amp; Tenure</span>
              <p>Historical broad index funds deliver 12-14% CAGR over 10+ year timeframes.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">03. Review Compounding</span>
              <p>Examine the year-wise growth breakdown and export the CSV table for your financial planner.</p>
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
            Related Finance &amp; Calculation Tools:
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
                <div className="text-[11px] text-muted-foreground truncate">Live Sensex &amp; Nifty indices</div>
              </div>
            </Link>

            <Link
              href="/tools/gst-calculator"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Calculator className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">GST Calculator</div>
                <div className="text-[11px] text-muted-foreground truncate">Calculate 5%, 12%, 18%, 28% GST</div>
              </div>
            </Link>

            <Link
              href="/tools/age-calculator"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Age &amp; Milestone Calculator</div>
                <div className="text-[11px] text-muted-foreground truncate">Chronological &amp; planetary age</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Master SEO Blueprint & Structured Data Schema Footer */}
        <ToolSeoFooter toolSlug="sip-calculator" />
      </div>
    </div>
  );
}
