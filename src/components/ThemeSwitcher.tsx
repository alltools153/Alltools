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
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card hover:border-primary/60 text-foreground transition-all duration-200 shadow-sm cursor-pointer select-none"
        style={{ backgroundColor: 'var(--card)' }}
        aria-label="Select Application Theme"
        aria-expanded={isOpen}
      >
        <span
          className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-inner flex-shrink-0"
          style={{ backgroundColor: currentThemeObj.previewAccent }}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-[min(24rem,calc(100vw-1.5rem))] rounded-2xl border border-border bg-card shadow-2xl z-[100] p-3 sm:p-4 animate-in fade-in zoom-in-95 duration-150"
          style={{ backgroundColor: 'var(--card)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-2.5 border-b border-border/80">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-foreground">Theme Palette</h4>
                <p className="text-[11px] text-muted-foreground">{THEMES_LIST.length} Handcrafted Modes</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label="Close theme selector"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Theme List */}
          <div className="space-y-1.5 max-h-[min(26rem,calc(100vh-10rem))] overflow-y-auto pr-1">
            {THEMES_LIST.map((t) => {
              const isSelected = t.id === theme;
              return (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  aria-pressed={isSelected}
                  className={`w-full text-left p-2.5 sm:p-3 rounded-xl transition-all flex items-center justify-between gap-3 border cursor-pointer ${
                    isSelected
                      ? 'border-primary bg-primary/15 shadow-sm'
                      : 'border-transparent hover:border-border hover:bg-muted/70'
                  }`}
                  style={{
                    backgroundColor: isSelected ? undefined : undefined,
                  }}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className="relative h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 overflow-hidden rounded-lg border border-white/20 shadow-sm flex items-center justify-center"
                      style={{ backgroundColor: t.previewBg }}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/20"
                        style={{ backgroundColor: t.previewAccent }}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-semibold text-foreground">
                        <span>{t.name}</span>
                        {isSelected && (
                          <span className="rounded-full bg-primary/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary">
                            Active
                          </span>
                        )}
                        {!isSelected && (
                          <span className="text-[10px] text-muted-foreground opacity-75">
                            {t.isDark ? 'Dark' : 'Light'}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] leading-tight text-muted-foreground truncate">{t.tagline}</div>
                    </div>
                  </div>

                  {isSelected && <Check className="h-4 w-4 flex-shrink-0 text-primary" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
