'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { Palette, Check, Sparkles, X } from 'lucide-react';
import { THEMES_LIST } from '@/lib/themeConfig';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentThemeObj = THEMES_LIST.find((t) => t.id === theme) || THEMES_LIST[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card/90 backdrop-blur hover:border-primary/60 text-foreground transition-all duration-200 text-sm shadow-sm"
        aria-label="Select Application Theme"
        aria-expanded={isOpen}
      >
        <span
          className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-inner flex-shrink-0"
          style={{ backgroundColor: currentThemeObj.previewAccent }}
        />
        <span className="font-semibold hidden sm:inline max-w-36 truncate">{currentThemeObj.name}</span>
        <Palette className="w-4 h-4 text-primary opacity-80" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-[min(26rem,calc(100vw-1.5rem))] rounded-2xl border border-border bg-card/98 backdrop-blur-xl shadow-2xl z-50 p-3.5 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-start justify-between gap-4 pb-3 mb-2.5 border-b border-border">
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-foreground">Choose your workspace look</h4>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{THEMES_LIST.length} handcrafted themes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Close theme selector"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 max-h-[min(32rem,calc(100vh-8rem))] overflow-y-auto pr-1">
            {THEMES_LIST.map((t) => {
              const isSelected = t.id === theme;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  aria-pressed={isSelected}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between gap-3 border ${
                    isSelected
                      ? 'border-primary/70 bg-primary/10 shadow-sm'
                      : 'border-transparent hover:border-border hover:bg-muted/50'
                  }`}
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div
                      className="relative mt-0.5 h-9 w-9 flex-shrink-0 overflow-hidden rounded-lg border border-white/15 shadow-sm"
                      style={{ backgroundColor: t.previewBg }}
                    >
                      <span
                        className="absolute inset-2 rounded-full"
                        style={{ backgroundColor: t.previewAccent }}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-sm font-semibold leading-5 text-foreground">
                        {t.name}
                        {isSelected && (
                          <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 text-xs leading-4 text-muted-foreground line-clamp-2">{t.tagline}</div>
                    </div>
                  </div>

                  {isSelected && <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
