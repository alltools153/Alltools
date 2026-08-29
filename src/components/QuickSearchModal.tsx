'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  ChevronRight,
  ShieldCheck,
  Code2,
  Calendar,
  FileText,
  FileJson,
  KeyRound,
  Calculator,
  Server,
  Layers,
  Sparkles,
  Command,
  Radio,
  Globe,
  User,
  ExternalLink,
} from 'lucide-react';
import { ALL_TOOLS_CATALOG, ToolItem } from '@/lib/allToolsList';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck,
  Code2,
  Calendar,
  FileText,
  FileJson,
  KeyRound,
  Calculator,
  Server,
  Layers,
  Radio,
  Globe,
  User,
};

export function QuickSearchModal({ isOpen, onClose }: QuickSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredTools.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredTools.length - 1));
      } else if (e.key === 'Enter') {
        if (filteredTools[selectedIndex]) {
          e.preventDefault();
          router.push(filteredTools[selectedIndex].href);
          onClose();
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, router]);

  const filteredTools = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_TOOLS_CATALOG;

    return ALL_TOOLS_CATALOG.filter((tool) => {
      const matchName = tool.name.toLowerCase().includes(q);
      const matchNameBn = tool.nameBn?.toLowerCase().includes(q);
      const matchTagline = tool.tagline.toLowerCase().includes(q);
      const matchCategory = tool.category.toLowerCase().includes(q);
      const matchKeyword = tool.keywords.some((k) => k.toLowerCase().includes(q));
      return matchName || matchNameBn || matchTagline || matchCategory || matchKeyword;
    });
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center pt-12 sm:pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-border bg-card text-foreground shadow-2xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        style={{ backgroundColor: 'var(--card)' }}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-card">
          <Search className="w-5 h-5 text-primary flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search tools by name, topic, or file type (e.g. merge, jwt, vapt, bangla, compress)..."
            className="w-full bg-transparent text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground border border-border hidden sm:inline"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {filteredTools.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Search className="w-8 h-8 text-muted-foreground mx-auto opacity-50" />
              <p className="text-sm font-semibold text-foreground">No matching tools found</p>
              <p className="text-xs text-muted-foreground">
                Try searching for &quot;pdf&quot;, &quot;json&quot;, &quot;age&quot;, &quot;panjika&quot;, or &quot;security&quot;
              </p>
            </div>
          ) : (
            filteredTools.map((tool, idx) => {
              const Icon = ICON_MAP[tool.iconName] || FileText;
              const isSelected = idx === selectedIndex;
              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  onClick={onClose}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl transition-colors cursor-pointer border ${
                    isSelected
                      ? 'border-primary bg-primary/10 text-foreground shadow-sm'
                      : 'border-transparent hover:bg-muted/60 text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center text-primary flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold truncate">{tool.name}</span>
                        {tool.badge && (
                          <span
                            className={`text-[10px] uppercase font-mono px-1.5 py-0.2 rounded border ${
                              tool.badgeColor || 'bg-muted text-muted-foreground border-border'
                            }`}
                          >
                            {tool.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{tool.tagline}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className="text-[11px] text-muted-foreground hidden sm:inline">
                      {tool.category}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="px-4 py-2.5 bg-muted/40 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-card border border-border font-mono text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-card border border-border font-mono text-[10px] ml-1">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-card border border-border font-mono text-[10px]">↵</kbd> to select
            </span>
          </div>
          <span>{filteredTools.length} tools available</span>
        </div>
      </div>
    </div>
  );
}
