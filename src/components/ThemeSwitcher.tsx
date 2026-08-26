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
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card/80 backdrop-blur hover:border-primary/50 text-foreground transition-all duration-200 text-sm shadow-sm"
        aria-label="Select Application Theme"
      >
        <span
          className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-inner"
          style={{ backgroundColor: currentThemeObj.previewAccent }}
        />
        <span className="font-medium hidden sm:inline">{currentThemeObj.name}</span>
        <Palette className="w-4 h-4 text-primary opacity-80" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl z-50 p-3 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-border">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-primary" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Select Theme ({THEMES_LIST.length})
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
            {THEMES_LIST.map((t) => {
              const isSelected = t.id === theme;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg transition-all flex items-start justify-between gap-3 border ${
                    isSelected
                      ? 'border-primary bg-primary/10 shadow-glow-primary'
                      : 'border-transparent hover:border-border hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {/* Visual Color Palette Swatch */}
                    <div
                      className="w-5 h-5 rounded-md mt-0.5 flex-shrink-0 border border-white/20 shadow-sm"
                      style={{ backgroundColor: t.previewAccent }}
                    />
                    <div>
                      <div className="text-sm font-medium text-foreground flex items-center gap-1.5">
                        {t.name}
                        {isSelected && <span className="text-[10px] uppercase font-bold text-primary">Active</span>}
                      </div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{t.tagline}</div>
                    </div>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
