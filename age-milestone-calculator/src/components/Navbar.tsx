'use client';

import React from 'react';
import { 
  Calculator, 
  Hourglass, 
  Compass, 
  Share2, 
  Sun, 
  Moon,
  PartyPopper,
  Trophy,
  Orbit,
  Grid3X3,
  Scale
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  onOpenShare: () => void;
  onCelebrate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  setIsDark,
  onOpenShare,
  onCelebrate,
}) => {
  const tabs = [
    { id: 'age', label: 'Age Calculator', icon: Hourglass },
    { id: 'milestones', label: 'Milestones', icon: Trophy },
    { id: 'cosmic', label: 'Cosmic Voyage', icon: Orbit },
    { id: 'lifegrid', label: 'Life in Weeks', icon: Grid3X3 },
    { id: 'comparison', label: 'Compare', icon: Scale },
    { id: 'astrology', label: 'Astrology', icon: Compass },
    { id: 'about', label: 'About', icon: Calculator },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-indigo-500/20 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => setActiveTab('age')}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                Age Calculator
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-2xl border border-slate-800 overflow-x-auto max-w-full no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={onCelebrate}
              title="Celebrate with Confetti!"
              className="p-2 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 border border-pink-500/30 text-pink-400 hover:text-pink-300 transition-all flex items-center gap-1 text-xs font-semibold"
            >
              <PartyPopper className="w-4 h-4" />
              <span className="hidden md:inline">Celebrate</span>
            </button>

            <button
              onClick={onOpenShare}
              title="Share / Export Summary"
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-1 text-xs font-semibold"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden md:inline">Share</span>
            </button>

            <button
              onClick={() => {
                const nextDark = !isDark;
                setIsDark(nextDark);
                if (typeof document !== 'undefined') {
                  if (nextDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  }
                }
              }}
              title="Toggle Dark/Light Mode"
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-yellow-400 transition-all"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
