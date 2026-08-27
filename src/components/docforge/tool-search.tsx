"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchTools } from "@/lib/docforge/tools-config";
import { cx } from "@/lib/docforge/utils";

export function ToolSearch({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchTools(query).slice(0, 6), [query]);
  const showResults = focused && query.trim().length > 0;

  function go(slug: string) {
    setQuery("");
    setFocused(false);
    inputRef.current?.blur();
    router.push(`/${slug}`);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!showResults || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[activeIndex].slug);
    } else if (e.key === "Escape") {
      setFocused(false);
    }
  }

  return (
    <div className="relative">
      <label htmlFor="tool-search" className="sr-only">
        Search PDF tools
      </label>
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-600/50 dark:text-paper-200/40"
          width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
        >
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          id="tool-search"
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 120)}
          onKeyDown={onKeyDown}
          placeholder={compact ? "Search PDF tools…" : "What do you want to do?"}
          role="combobox"
          aria-expanded={showResults}
          aria-controls="tool-search-results"
          autoComplete="off"
          className={cx(
            "w-full rounded-full border border-ink-900/10 bg-white pl-9 pr-4 text-sm text-ink-900 placeholder:text-ink-600/50 focus-ring dark:border-paper-100/15 dark:bg-ink-800 dark:text-paper-50 dark:placeholder:text-paper-200/40",
            compact ? "h-9" : "h-12 text-base"
          )}
        />
      </div>

      {showResults && (
        <ul
          id="tool-search-results"
          role="listbox"
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-paper-200 bg-white shadow-lift dark:border-ink-700 dark:bg-ink-800"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-ink-600 dark:text-paper-200/70">No matching tools. Try a different word.</li>
          ) : (
            results.map((tool, i) => (
              <li key={tool.slug} role="option" aria-selected={i === activeIndex}>
                <button
                  type="button"
                  onMouseDown={() => go(tool.slug)}
                  className={cx(
                    "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm",
                    i === activeIndex ? "bg-forge-500/10 text-forge-700 dark:text-forge-300" : "text-ink-800 dark:text-paper-100"
                  )}
                >
                  <span>{tool.name}</span>
                  <span className="font-mono text-xs uppercase text-ink-600/60 dark:text-paper-200/40">{tool.category}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
