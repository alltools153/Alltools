'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Clock,
  Shield,
  Layers,
  Sparkles,
  BarChart3,
  Flame,
  Globe2,
  PieChart,
  CircleDollarSign,
  Gauge,
  Bell,
  Zap,
} from 'lucide-react';

interface MarketSnapshot {
  name: string;
  value: string;
  change: string;
  percent: string;
  positive: boolean;
}

interface SectorPerformance {
  name: string;
  change: string;
  positive: boolean;
}

interface TopMover {
  symbol: string;
  name: string;
  price: string;
  change: string;
  positive: boolean;
}

interface WatchlistItem {
  symbol: string;
  price: number;
  change: number;
  positive: boolean;
}

interface MarketData {
  marketSnapshots: MarketSnapshot[];
  sectorPerformance: SectorPerformance[];
  topGainers: TopMover[];
  topLosers: TopMover[];
  marketBreadth: { label: string; value: number; color: string }[];
  miniTrend: number[];
  totalMarketCap: string;
  updatedAt: string;
  watchlist?: WatchlistItem[];
  source?: string;
}

const defaultData: MarketData = {
  marketSnapshots: [
    { name: 'SENSEX', value: '76,878.98', change: '-385.53', percent: '-0.50%', positive: false },
    { name: 'NIFTY 50', value: '24,068.85', change: '-106.80', percent: '-0.44%', positive: false },
    { name: 'NIFTY BANK', value: '51,452.40', change: '+240.10', percent: '+0.47%', positive: true },
    { name: 'NIFTY IT', value: '38,910.60', change: '-415.20', percent: '-1.06%', positive: false },
  ],
  sectorPerformance: [
    { name: 'Banking', change: '+0.78%', positive: true },
    { name: 'Automobile', change: '+0.54%', positive: true },
    { name: 'Energy', change: '+0.21%', positive: true },
    { name: 'IT & Tech', change: '-1.06%', positive: false },
    { name: 'Pharma', change: '-0.42%', positive: false },
    { name: 'FMCG', change: '-0.15%', positive: false },
  ],
  topGainers: [
    { symbol: 'TATAMOTORS', name: 'Tata Motors', price: '₹986.40', change: '+3.45%', positive: true },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', price: '₹1,678.10', change: '+2.12%', positive: true },
    { symbol: 'RELIANCE', name: 'Reliance Ind.', price: '₹2,940.00', change: '+1.45%', positive: true },
    { symbol: 'ICICIBANK', name: 'ICICI Bank', price: '₹1,185.30', change: '+1.18%', positive: true },
  ],
  topLosers: [
    { symbol: 'INFY', name: 'Infosys Ltd', price: '₹1,512.60', change: '-2.35%', positive: false },
    { symbol: 'TCS', name: 'Tata Consultancy', price: '₹3,845.00', change: '-1.85%', positive: false },
    { symbol: 'WIPRO', name: 'Wipro Limited', price: '₹478.20', change: '-1.40%', positive: false },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', price: '₹2,420.50', change: '-0.95%', positive: false },
  ],
  marketBreadth: [
    { label: 'Advancers', value: 1180, color: 'bg-emerald-500' },
    { label: 'Decliners', value: 1100, color: 'bg-red-500' },
    { label: 'Unchanged', value: 215, color: 'bg-slate-500' },
  ],
  miniTrend: [48, 52, 62, 58, 72, 78, 71, 84, 88, 74, 96, 100],
  totalMarketCap: '₹227.4L Cr',
  watchlist: [
    { symbol: 'SBIN', price: 812.45, change: 0.64, positive: true },
    { symbol: 'BHARTIARTL', price: 1422.30, change: 1.15, positive: true },
    { symbol: 'LT', price: 3610.00, change: -0.42, positive: false },
    { symbol: 'ITC', price: 432.80, change: 0.35, positive: true },
  ],
  updatedAt: new Date().toISOString(),
  source: 'live_feed',
};

import { getIndianMarketStatus } from '@/lib/indianMarket';

export default function StockMarketPage() {
  const [marketData, setMarketData] = useState<MarketData>(defaultData);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [tickCount, setTickCount] = useState(0);
  const [currentMarketStatus, setCurrentMarketStatus] = useState(() => getIndianMarketStatus());

  useEffect(() => {
    let isMounted = true;

    const updateStatusAndData = async () => {
      // Update market open/closed status in real time
      const status = getIndianMarketStatus();
      if (isMounted) setCurrentMarketStatus(status);

      try {
        const response = await fetch('/api/market-live', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed to fetch market data');
        }
        const data = (await response.json()) as MarketData;

        if (isMounted && data?.marketSnapshots?.length) {
          setMarketData(data);
          setTickCount((prev) => prev + 1);
        }
      } catch (error) {
        console.warn('Market update notice:', error);
      } finally {
        if (isMounted) setIsInitialLoading(false);
      }
    };

    // Initial fetch
    updateStatusAndData();

    // Poll every 3 seconds for live streaming when open (or status updates when closed)
    const interval = window.setInterval(updateStatusAndData, 3000);
    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const totalMarketCap = useMemo(() => marketData.totalMarketCap || '₹227.4L Cr', [marketData.totalMarketCap]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-10">
        <header className="mb-5 sm:mb-8 rounded-2xl sm:rounded-3xl border border-border bg-card/80 p-3.5 sm:p-5 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 text-black shadow-lg shadow-orange-500/25 flex-shrink-0">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl xs:text-2xl sm:text-3xl font-black tracking-tight">Sensex &amp; Nifty 50 Market View</h1>
                  
                  {/* Status Badge: Green only when LIVE, Rose/Amber when CLOSED */}
                  {currentMarketStatus.isOpen ? (
                    <span className="relative inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      LIVE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/40 bg-rose-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-rose-400">
                      <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                      MARKET CLOSED
                    </span>
                  )}

                  {marketData.source === 'indianapi' && (
                    <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-400 flex items-center gap-1">
                      <Zap className="h-2.5 w-2.5" /> IndianAPI
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {currentMarketStatus.isOpen
                    ? 'Accurate real-time market snapshot for major Indian indices, sector performance, and live price tickers.'
                    : 'Indian Stock Market (NSE / BSE) is currently closed. Showing latest closing session prices.'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-2.5 sm:gap-3 w-full lg:w-auto">
              <div className="rounded-xl sm:rounded-2xl border border-border bg-muted/40 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm text-muted-foreground shadow-inner flex-1 sm:flex-initial">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {currentMarketStatus.isOpen ? (
                    <>
                      <Zap className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="font-semibold text-[11px] sm:text-xs uppercase tracking-wider text-emerald-400">Live Stream</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-3.5 w-3.5 text-rose-400" />
                      <span className="font-semibold text-[11px] sm:text-xs uppercase tracking-wider text-rose-400">Market Status</span>
                    </>
                  )}
                </div>
                <div className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs font-mono text-foreground font-medium">
                  {currentMarketStatus.displayText}
                </div>
              </div>
              <Link
                href="/"
                className="rounded-xl border border-primary/40 bg-primary/10 px-3 py-2 text-xs sm:text-sm font-semibold text-primary hover:bg-primary/20 transition-colors whitespace-nowrap"
              >
                Back to AllToolss
              </Link>
            </div>
          </div>
        </header>

        <main className="space-y-6 sm:space-y-8">
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
            {(marketData.marketSnapshots || defaultData.marketSnapshots).map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-border bg-card p-3.5 sm:p-4 shadow-sm transition-colors duration-200"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  <span className="font-bold">{item.name}</span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-bold ${
                      item.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                    }`}
                  >
                    {item.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {item.percent}
                  </span>
                </div>
                <div className="mt-3 sm:mt-4 flex items-end justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-2xl xs:text-3xl font-black tracking-tight font-mono truncate">{item.value}</div>
                    <div className={`mt-1 sm:mt-2 text-xs sm:text-sm font-medium ${item.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                      {item.change} today
                    </div>
                  </div>
                  <div
                    className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl flex-shrink-0 ${
                      item.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                    }`}
                  >
                    {item.positive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
            {/* Temporarily disabled until the graph version is ready */}
            {/*
            <div className="rounded-2xl sm:rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Market Pulse</p>
                  <h2 className="mt-1 text-lg sm:text-xl font-bold">Index performance trend</h2>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 rounded-xl bg-emerald-500/10 px-2 sm:px-2.5 py-1 sm:py-1.5 text-xs font-semibold text-emerald-400">
                  <Gauge className="h-3.5 w-3.5" />
                  <span>Live Active</span>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 flex h-44 sm:h-56 items-end gap-1 xs:gap-1.5 sm:gap-2 rounded-2xl border border-border bg-muted/20 p-2 sm:p-3">
                {(marketData.miniTrend || defaultData.miniTrend).map((value, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center justify-end gap-1.5">
                    <div
                      className={`w-full rounded-t-lg sm:rounded-t-xl transition-all duration-500 ${
                        index === (marketData.miniTrend || defaultData.miniTrend).length - 1
                          ? 'bg-primary'
                          : 'bg-primary/40 hover:bg-primary/70'
                      }`}
                      style={{ height: `${Math.max(12, value)}%` }}
                    />
                    <span className="text-[9px] sm:text-[10px] text-muted-foreground font-mono">T-{(marketData.miniTrend || defaultData.miniTrend).length - index}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="rounded-xl border border-border bg-muted/30 p-2.5 sm:p-3">
                  <div className="text-muted-foreground font-medium text-xs">Estimated Market Cap</div>
                  <div className="mt-1 text-base sm:text-lg font-bold font-mono text-foreground">{totalMarketCap}</div>
                </div>
                <div className="rounded-xl border border-border bg-muted/30 p-2.5 sm:p-3">
                  <div className="text-muted-foreground font-medium text-xs">Real-Time Refresh Frequency</div>
                  <div className="mt-1 text-base sm:text-lg font-bold text-emerald-400 flex items-center gap-1">
                    <Zap className="h-4 w-4" /> 2.5s Stream
                  </div>
                </div>
              </div>
            </div>
            */}

            <div className="rounded-2xl sm:rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Market Breadth</p>
                  <h2 className="mt-1 text-lg sm:text-xl font-bold">Advance / Decline Ratio</h2>
                </div>
                <div className="rounded-xl bg-amber-500/10 p-2 text-amber-400">
                  <PieChart className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {(marketData.marketBreadth || defaultData.marketBreadth).map((item) => (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-medium text-foreground">{item.label}</span>
                      <span className="font-bold font-mono">{item.value}</span>
                    </div>
                    <div className="h-2 sm:h-2.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${(item.value / 2500) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl sm:rounded-2xl border border-border bg-muted/20 p-3 sm:p-3.5 text-xs text-muted-foreground leading-relaxed">
                Market breadth metrics reflect overall market sentiment and liquidity distribution across BSE and NSE listed equities.
              </div>
            </div>
          </section>

          <section className="rounded-2xl sm:rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Sector Pulse</p>
                <h2 className="mt-1 text-lg sm:text-xl font-bold">Sectoral indices overview</h2>
              </div>
              <div className="rounded-xl bg-purple-500/10 p-2 text-purple-400">
                <Globe2 className="h-4 w-4" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2.5 sm:gap-3">
              {(marketData.sectorPerformance || defaultData.sectorPerformance).map((sector) => (
                <div
                  key={sector.name}
                  className="rounded-xl sm:rounded-2xl border border-border bg-muted/20 p-2.5 sm:p-3 transition-colors duration-200"
                >
                  <div className="text-xs font-medium text-muted-foreground truncate">{sector.name}</div>
                  <div
                    className={`mt-1 sm:mt-2 text-sm sm:text-base font-bold font-mono ${
                      sector.positive ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {sector.change}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-2xl sm:rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Top Movers</p>
                  <h2 className="mt-1 text-lg sm:text-xl font-bold text-emerald-400 flex items-center gap-1.5">
                    <TrendingUp className="h-5 w-5" /> Top Gainers
                  </h2>
                </div>
                <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-400">
                  <Flame className="h-4 w-4" />
                </div>
              </div>

              <div className="space-y-2">
                {(marketData.topGainers || defaultData.topGainers).map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center justify-between rounded-xl sm:rounded-2xl border border-border bg-muted/20 px-3 py-2 sm:py-2.5 text-xs sm:text-sm hover:bg-muted/40 transition-colors duration-200"
                  >
                    <div>
                      <div className="font-semibold text-foreground">{stock.symbol}</div>
                      <div className="text-[11px] sm:text-xs text-muted-foreground">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-medium text-foreground text-xs sm:text-sm">{stock.price}</div>
                      <div className="text-[11px] sm:text-xs font-bold text-emerald-400">{stock.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Top Movers</p>
                  <h2 className="mt-1 text-lg sm:text-xl font-bold text-red-400 flex items-center gap-1.5">
                    <TrendingDown className="h-5 w-5" /> Top Losers
                  </h2>
                </div>
                <div className="rounded-xl bg-red-500/10 p-2 text-red-400">
                  <TrendingDown className="h-4 w-4" />
                </div>
              </div>

              <div className="space-y-2">
                {(marketData.topLosers || defaultData.topLosers).map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center justify-between rounded-xl sm:rounded-2xl border border-border bg-muted/20 px-3 py-2 sm:py-2.5 text-xs sm:text-sm hover:bg-muted/40 transition-colors duration-200"
                  >
                    <div>
                      <div className="font-semibold text-foreground">{stock.symbol}</div>
                      <div className="text-[11px] sm:text-xs text-muted-foreground">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-medium text-foreground text-xs sm:text-sm">{stock.price}</div>
                      <div className="text-[11px] sm:text-xs font-bold text-red-400">{stock.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Watchlist</p>
                  <h2 className="mt-1 text-lg sm:text-xl font-bold">Key names to track</h2>
                </div>
                <div className="rounded-xl bg-cyan-500/10 p-2 text-cyan-400">
                  <CircleDollarSign className="h-4 w-4" />
                </div>
              </div>

              <div className="space-y-2">
                {(marketData.watchlist || defaultData.watchlist || []).map((stock) => (
                  <div
                    key={stock.symbol}
                    className="grid grid-cols-[1fr_auto_auto] items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-border bg-muted/20 px-3 py-2 sm:py-2.5 text-xs sm:text-sm hover:bg-muted/40 transition-colors duration-200"
                  >
                    <div className="font-semibold text-foreground">{stock.symbol}</div>
                    <div className="text-muted-foreground font-mono text-xs sm:text-sm">
                      ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div
                      className={`inline-flex items-center gap-0.5 rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-bold ${
                        stock.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                      }`}
                    >
                      {stock.positive ? '+' : ''}
                      {stock.change.toFixed(2)}%
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
