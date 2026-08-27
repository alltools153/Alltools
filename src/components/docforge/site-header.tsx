"use client";

import Link from "next/link";
import { useState } from "react";
import { ToolSearch } from "./tool-search";

const NAV = [
  { label: "Convert", href: "/#convert" },
  { label: "Organize", href: "/#organize" },
  { label: "Optimize", href: "/#optimize" },
  { label: "Edit", href: "/#edit" },
  { label: "Security", href: "/#security" },
  { label: "OCR", href: "/#ocr" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-paper-200 bg-paper-50/90 backdrop-blur dark:border-ink-700 dark:bg-ink-950/90">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink-950 text-paper-50 dark:bg-forge-500">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2h7l5 5v7H2V2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M9 2v5h5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-display text-lg font-medium tracking-tight">DocForge</span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-ink-700 dark:text-paper-200 md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="rounded px-1 py-1 hover:text-forge-600 focus-ring dark:hover:text-forge-400">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden max-w-xs flex-1 md:block">
          <ToolSearch compact />
        </div>

        <Link
          href="/pricing"
          className="hidden shrink-0 rounded-full border border-ink-900/10 px-4 py-1.5 text-sm font-medium hover:bg-ink-900 hover:text-paper-50 focus-ring dark:border-paper-100/15 dark:hover:bg-paper-100 dark:hover:text-ink-950 md:inline-block"
        >
          Pricing
        </Link>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="ml-auto rounded-lg p-2 focus-ring md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-paper-200 px-4 pb-4 dark:border-ink-700 md:hidden">
          <div className="pt-3">
            <ToolSearch compact />
          </div>
          <nav className="mt-3 flex flex-col gap-1 text-sm">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded px-2 py-2 hover:bg-paper-100 dark:hover:bg-ink-800">
                {item.label}
              </Link>
            ))}
            <Link href="/pricing" onClick={() => setOpen(false)} className="rounded px-2 py-2 hover:bg-paper-100 dark:hover:bg-ink-800">
              Pricing
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
