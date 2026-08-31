'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  Zap,
} from 'lucide-react';

type MarketSnapshot = {
  name: string;
  value: string;
  change: string;
  percent: string;
  positive: boolean;
  trend: 'up' | 'down' | 'flat';
  rawPrice?: number;
};

type SectorHeat = {
  sector: string;
  value: number;
  color: string;
};

type StockRow = {
  name: string;
  price: string;
  change: string;
  positive: boolean;
  rawPrice?: number;
};

type WatchlistRow = {
  symbol: string;
  price: number;
  change: number;
  positive: boolean;
};

type MarketBreadth = {
  label: string;
  value: number;
  color: string;
};

type MarketData = {
  marketSnapshots: MarketSnapshot[];
  sectorHeat: SectorHeat[];
  topMovers: StockRow[];
  watchlist: WatchlistRow[];
  marketBreadth: MarketBreadth[];
  miniTrend: number[];
  totalMarketCap: string;
  updatedAt: string;
  source?: 'indianapi' | 'live_feed';
};

const defaultData: MarketData = {
  marketSnapshots: [
    { name: 'SENSEX', value: '76,878.98', change: '-385.53', percent: '-0.50%', positive: false, trend: 'down' },
    { name: 'NIFTY 50', value: '24,068.85', change: '-106.80', percent: '-0.44%', positive: false, trend: 'down' },
    { name: 'BANK NIFTY', value: '57,441.05', change: '-55.25', percent: '-0.10%', positive: false, trend: 'down' },
    { name: 'MIDCAP', value: '18,289.05', change: '-116.75', percent: '-0.63%', positive: false, trend: 'down' },
  ],
  sectorHeat: [
    { sector: 'Banking', value: 68, color: 'bg-emerald-500' },
    { sector: 'IT', value: 52, color: 'bg-cyan-500' },
    { sector: 'Auto', value: 61, color: 'bg-amber-500' },
    { sector: 'Metal', value: 45, color: 'bg-violet-500' },
    { sector: 'Energy', value: 74, color: 'bg-red-500' },
    { sector: 'FMCG', value: 40, color: 'bg-pink-500' },
    { sector: 'Pharma', value: 56, color: 'bg-sky-500' },
    { sector: 'Realty', value: 59, color: 'bg-orange-500' },
  ],
  topMovers: [
    { name: 'Reliance Industries', price: '₹1,285.40', change: '-0.12%', positive: false },
    { name: 'TCS', price: '₹2,323.40', change: '-0.79%', positive: false },
    { name: 'HDFC Bank', price: '₹723.15', change: '+0.40%', positive: true },
    { name: 'Infosys', price: '₹1,122.60', change: '-1.87%', positive: false },
    { name: 'ICICI Bank', price: '₹1,191.80', change: '+1.08%', positive: true },
    { name: 'Sun Pharma', price: '₹1,923.50', change: '+0.18%', positive: true },
  ],
  watchlist: [
    { symbol: 'RELIANCE', price: 1285.4, change: -0.12, positive: false },
    { symbol: 'TCS', price: 2323.4, change: -0.79, positive: false },
    { symbol: 'INFY', price: 1122.6, change: -1.87, positive: false },
    { symbol: 'HDFCBANK', price: 723.15, change: 0.4, positive: true },
    { symbol: 'ITC', price: 264.85, change: -0.43, positive: false },
    { symbol: 'SUNPHARMA', price: 1923.5, change: 0.18, positive: true },
  ],
  marketBreadth: [
    { label: 'Advancers', value: 1180, color: 'bg-emerald-500' },
    { label: 'Decliners', value: 1100, color: 'bg-red-500' },
    { label: 'Unchanged', value: 215, color: 'bg-slate-500' },
  ],
  miniTrend: [48, 52, 62, 58, 72, 78, 71, 84, 88, 74, 96, 100],
  totalMarketCap: '₹227.4L Cr',
  updatedAt: new Date().toISOString(),
  source: 'live_feed',
};

const getStatusText = (updatedAt: string, tickCount: number) => {
  if (!updatedAt) return 'Connecting live feed...';
  const secondsAgo = Math.max(0, Math.floor((Date.now() - new Date(updatedAt).getTime()) / 1000));
  if (secondsAgo === 0) return `Live • Tick #${tickCount} • Updated just now`;
  return `Live • Tick #${tickCount} • ${secondsAgo}s ago`;
};

export default function StockMarketPage() {
  const [marketData, setMarketData] = useState<MarketData>(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [tickCount, setTickCount] = useState(0);
  const [flashes, setFlashes] = useState<Record<string, 'up' | 'down'>>({});

  const prevPricesRef = useRef<Record<string, number>>({});

  useEffect(() => {
    let isMounted = true;

    const loadMarket = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/market-live', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed to fetch live market data');
        }
        const data = (await response.json()) as MarketData;

        if (isMounted && data?.marketSnapshots?.length) {
          // Calculate price direction changes for flash animation
          const newFlashes: Record<string, 'up' | 'down'> = {};

          data.marketSnapshots.forEach((snap) => {
            const numVal = parseFloat(snap.value.replace(/,/g, ''));
            const prev = prevPricesRef.current[snap.name];
            if (prev !== undefined && numVal !== prev) {
              newFlashes[snap.name] = numVal > prev ? 'up' : 'down';
            }
            prevPricesRef.current[snap.name] = numVal;
          });

          data.watchlist.forEach((item) => {
            const prev = prevPricesRef.current[`watch_${item.symbol}`];
            if (prev !== undefined && item.price !== prev) {
              newFlashes[`watch_${item.symbol}`] = item.price > prev ? 'up' : 'down';
            }
            prevPricesRef.current[`watch_${item.symbol}`] = item.price;
          });

          setMarketData(data);
          setTickCount((prev) => prev + 1);

          if (Object.keys(newFlashes).length > 0) {
            setFlashes(newFlashes);
            setTimeout(() => {
              if (isMounted) setFlashes({});
            }, 700);
          }
        }
      } catch (error) {
        console.warn('Live market update notice:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    // Initial fetch
    loadMarket();

    // Poll every 1 second (1000ms) for live real-time price updates
    const interval = window.setInterval(loadMarket, 1000);
    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const totalMarketCap = useMemo(() => marketData.totalMarketCap || '₹227.4L Cr', [marketData.totalMarketCap]);
  const statusText = useMemo(
    () => getStatusText(marketData.updatedAt || new Date().toISOString(), tickCount),
    [marketData.updatedAt, tickCount]
  );

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
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl font-black tracking-tight sm:text-3xl">Sensex & Nifty 50 Market View</h1>
                  <span className="relative inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    LIVE 1s
                  </span>
                  {marketData.source === 'indianapi' && (
                    <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-400 flex items-center gap-1">
                      <Zap className="h-2.5 w-2.5" /> IndianAPI
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Accurate real-time market snapshot for major Indian indices, sector performance, and live price tickers updated every second.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start lg:self-auto">
              <div className="rounded-2xl border border-border bg-muted/40 px-3.5 py-2 text-sm text-muted-foreground shadow-inner">
                <div className="flex items-center gap-2 text-foreground">
                  <Bell className="h-4 w-4 text-amber-400 animate-pulse" />
                  <span className="font-semibold text-xs uppercase tracking-wider">Live Stream</span>
                </div>
                <div className="mt-1 text-xs font-mono">{isLoading ? 'Syncing...' : statusText}</div>
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
            {marketData.marketSnapshots.map((item) => {
              const flash = flashes[item.name];
              const flashBg =
                flash === 'up'
                  ? 'bg-emerald-500/15 border-emerald-500/60 ring-2 ring-emerald-500/30'
                  : flash === 'down'
                  ? 'bg-red-500/15 border-red-500/60 ring-2 ring-red-500/30'
                  : 'bg-card border-border';

              return (
                <div
                  key={item.name}
                  className={`rounded-2xl border p-4 shadow-sm transition-all duration-300 ${flashBg}`}
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
                  <div className="mt-4 flex items-end justify-between gap-2">
                    <div>
                      <div className="text-3xl font-black tracking-tight font-mono">{item.value}</div>
                      <div className={`mt-2 text-sm font-medium ${item.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                        {item.change} today
                      </div>
                    </div>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        item.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                      }`}
                    >
                      {item.positive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                    </div>
                  </div>
                </div>
              );
            })}
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
                  Live Ticker Active
                </div>
              </div>

              <div className="mt-6 flex h-56 items-end gap-2 rounded-2xl border border-border bg-muted/20 p-3">
                {marketData.miniTrend.map((value, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center justify-end gap-2">
                    <div
                      className={`w-full rounded-t-xl transition-all duration-500 ${
                        index >= 8
                          ? 'bg-gradient-to-t from-emerald-500 via-emerald-400 to-emerald-300'
                          : 'bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-300'
                      }`}
                      style={{ height: `${value}%` }}
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {marketData.marketBreadth.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-border bg-muted/30 p-3">
                    <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span>{item.label}</span>
                      <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                    </div>
                    <div className="mt-3 text-2xl font-black font-mono">{item.value.toLocaleString()}</div>
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
                <div className="mt-3 text-4xl font-black tracking-tight font-mono">{totalMarketCap}</div>
                <div className="mt-2 text-sm text-emerald-400">+₹4.8L Cr net gain this week</div>
              </div>

              <div className="mt-5 space-y-3">
                {marketData.sectorHeat.map((sector) => (
                  <div key={sector.sector}>
                    <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{sector.sector}</span>
                      <span className="font-mono">{sector.value}%</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${sector.color}`}
                        style={{ width: `${sector.value}%` }}
                      />
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
                {marketData.topMovers.map((stock) => (
                  <div
                    key={stock.name}
                    className="flex items-center justify-between rounded-2xl border border-border bg-muted/20 px-3 py-2.5 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-foreground">{stock.name}</div>
                      <div className="text-xs text-muted-foreground font-mono">{stock.price}</div>
                    </div>
                    <div
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${
                        stock.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                      }`}
                    >
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
                {marketData.watchlist.map((stock) => {
                  const flash = flashes[`watch_${stock.symbol}`];
                  const flashBg =
                    flash === 'up'
                      ? 'bg-emerald-500/15 border-emerald-500/60'
                      : flash === 'down'
                      ? 'bg-red-500/15 border-red-500/60'
                      : 'bg-muted/20 border-border';

                  return (
                    <div
                      key={stock.symbol}
                      className={`grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-2xl border px-3 py-2.5 text-sm transition-all duration-300 ${flashBg}`}
                    >
                      <div className="font-semibold text-foreground">{stock.symbol}</div>
                      <div className="text-muted-foreground font-mono">
                        ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${
                          stock.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {stock.positive ? '+' : ''}
                        {stock.change.toFixed(2)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

