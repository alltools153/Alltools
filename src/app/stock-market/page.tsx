'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CircleDollarSign,
  Gauge,
  TrendingUp,
  TrendingDown,
  Wallet,
} from 'lucide-react';

const marketSnapshots = [
  {
    name: 'SENSEX',
    value: '81,563.42',
    change: '+482.67',
    percent: '+0.59%',
    positive: true,
    trend: 'up',
  },
  {
    name: 'NIFTY 50',
    value: '24,826.15',
    change: '+154.30',
    percent: '+0.62%',
    positive: true,
    trend: 'up',
  },
  {
    name: 'BANK NIFTY',
    value: '52,473.88',
    change: '-118.94',
    percent: '-0.23%',
    positive: false,
    trend: 'down',
  },
  {
    name: 'MIDCAP',
    value: '56,942.10',
    change: '+271.34',
    percent: '+0.48%',
    positive: true,
    trend: 'up',
  },
];

const sectorHeat = [
  { sector: 'Banking', value: 72, color: 'bg-emerald-500' },
  { sector: 'IT', value: 58, color: 'bg-cyan-500' },
  { sector: 'Auto', value: 64, color: 'bg-amber-500' },
  { sector: 'Metal', value: 45, color: 'bg-violet-500' },
  { sector: 'Energy', value: 81, color: 'bg-red-500' },
  { sector: 'FMCG', value: 38, color: 'bg-pink-500' },
  { sector: 'Pharma', value: 53, color: 'bg-sky-500' },
  { sector: 'Realty', value: 61, color: 'bg-orange-500' },
];

const topMovers = [
  { name: 'Reliance', price: '2,914.70', change: '+2.83%', positive: true },
  { name: 'TCS', price: '3,889.10', change: '+1.94%', positive: true },
  { name: 'HDFC Bank', price: '1,758.45', change: '+0.96%', positive: true },
  { name: 'Infosys', price: '1,598.25', change: '-0.61%', positive: false },
  { name: 'ICICI Bank', price: '1,191.80', change: '+1.08%', positive: true },
  { name: 'Axis Bank', price: '1,166.55', change: '-0.72%', positive: false },
];

const watchlist = [
  { symbol: 'RELIANCE', price: 2914.7, change: 2.83, positive: true },
  { symbol: 'TCS', price: 3889.1, change: 1.94, positive: true },
  { symbol: 'INFY', price: 1598.25, change: -0.61, positive: false },
  { symbol: 'HDFCBANK', price: 1758.45, change: 0.96, positive: true },
  { symbol: 'ITC', price: 483.6, change: 1.2, positive: true },
  { symbol: 'SUNPHARMA', price: 1784.3, change: -1.4, positive: false },
];

const marketBreadth = [
  { label: 'Advancers', value: 1243, color: 'bg-emerald-500' },
  { label: 'Decliners', value: 1062, color: 'bg-red-500' },
  { label: 'Unchanged', value: 247, color: 'bg-slate-500' },
];

const miniTrend = [48, 52, 62, 58, 72, 78, 71, 84, 88, 74, 96, 100];

export default function StockMarketPage() {
  const totalMarketCap = useMemo(() => '₹227.4L Cr', []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <header className="mb-8 rounded-3xl border border-border bg-card/80 p-5 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 text-black shadow-lg shadow-orange-500/25">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-black tracking-tight sm:text-3xl">Sensex & Nifty 50 Market View</h1>
                  <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400">
                    LIVE STYLE
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  In-browser market snapshot for major Indian indices, sector performance, and price movers.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start lg:self-auto">
              <div className="rounded-2xl border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 text-foreground">
                  <Bell className="h-4 w-4 text-amber-400" />
                  <span className="font-semibold">Market Status</span>
                </div>
                <div className="mt-1 text-xs">Open • Risk-on sentiment</div>
              </div>
              <Link
                href="/"
                className="rounded-xl border border-primary/40 bg-primary/10 px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
              >
                Back to AllTools
              </Link>
            </div>
          </div>
        </header>

        <main className="space-y-8">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {marketSnapshots.map((item) => (
              <div key={item.name} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  <span>{item.name}</span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-bold ${item.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {item.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {item.percent}
                  </span>
                </div>
                <div className="mt-4 flex items-end justify-between gap-2">
                  <div>
                    <div className="text-3xl font-black tracking-tight">{item.value}</div>
                    <div className={`mt-2 text-sm font-medium ${item.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                      {item.change} today
                    </div>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {item.positive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Market Pulse</p>
                  <h2 className="mt-1 text-xl font-bold">Index performance trend</h2>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-2.5 py-1.5 text-xs font-semibold text-emerald-400">
                  <Gauge className="h-3.5 w-3.5" />
                  Strong breadth
                </div>
              </div>

              <div className="mt-6 flex h-56 items-end gap-2 rounded-2xl border border-border bg-muted/20 p-3">
                {miniTrend.map((value, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center justify-end gap-2">
                    <div
                      className={`w-full rounded-t-xl ${index >= 8 ? 'bg-gradient-to-t from-emerald-500 via-emerald-400 to-emerald-300' : 'bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-300'}`}
                      style={{ height: `${value}%` }}
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][index]}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {marketBreadth.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-border bg-muted/30 p-3">
                    <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span>{item.label}</span>
                      <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                    </div>
                    <div className="mt-3 text-2xl font-black">{item.value.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Market Cap</p>
                  <h2 className="mt-1 text-xl font-bold">Broad market value</h2>
                </div>
                <div className="rounded-xl bg-violet-500/10 p-2 text-violet-400">
                  <Wallet className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-violet-500/30 bg-violet-500/5 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Total market cap</div>
                <div className="mt-3 text-4xl font-black tracking-tight">{totalMarketCap}</div>
                <div className="mt-2 text-sm text-emerald-400">+₹4.8L Cr net gain this week</div>
              </div>

              <div className="mt-5 space-y-3">
                {sectorHeat.map((sector) => (
                  <div key={sector.sector}>
                    <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{sector.sector}</span>
                      <span>{sector.value}%</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                      <div className={`h-full rounded-full ${sector.color}`} style={{ width: `${sector.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">IPO Launch</p>
                  <h2 className="mt-1 text-xl font-bold">Upcoming issue watch</h2>
                </div>
                <div className="rounded-xl bg-amber-500/10 p-2 text-amber-400">
                  <BriefcaseBusiness className="h-4 w-4" />
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {[
                  { name: 'Aether AI', status: 'IPO opens soon', highlight: '₹1,200 Cr' },
                  { name: 'Nova Infra', status: 'Price band fixed', highlight: '₹280-310' },
                  { name: 'GreenOrbit', status: 'Issue live today', highlight: '2.4x oversubscribed' },
                ].map((ipo) => (
                  <div key={ipo.name} className="rounded-2xl border border-slate-700 bg-slate-900/70 p-3">
                    <div className="text-sm font-bold text-white">{ipo.name}</div>
                    <div className="mt-1 text-[11px] text-slate-400">{ipo.status}</div>
                    <div className="mt-3 text-xs font-semibold text-emerald-400">{ipo.highlight}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Top Movers</p>
                  <h2 className="mt-1 text-xl font-bold">Most active stocks</h2>
                </div>
                <div className="rounded-xl bg-amber-500/10 p-2 text-amber-400">
                  <BriefcaseBusiness className="h-4 w-4" />
                </div>
              </div>

              <div className="space-y-2.5">
                {topMovers.map((stock) => (
                  <div key={stock.name} className="flex items-center justify-between rounded-2xl border border-border bg-muted/20 px-3 py-2.5">
                    <div>
                      <div className="font-semibold text-foreground">{stock.name}</div>
                      <div className="text-xs text-muted-foreground">₹{stock.price}</div>
                    </div>
                    <div className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${stock.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      {stock.positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                      {stock.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Watchlist</p>
                  <h2 className="mt-1 text-xl font-bold">Key names to track</h2>
                </div>
                <div className="rounded-xl bg-cyan-500/10 p-2 text-cyan-400">
                  <CircleDollarSign className="h-4 w-4" />
                </div>
              </div>

              <div className="space-y-2.5">
                {watchlist.map((stock) => (
                  <div key={stock.symbol} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-2xl border border-border bg-muted/20 px-3 py-2.5 text-sm">
                    <div className="font-semibold text-foreground">{stock.symbol}</div>
                    <div className="text-muted-foreground">₹{stock.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
                    <div className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${stock.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      {stock.positive ? '+' : ''}{stock.change.toFixed(2)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
