"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, TOOLS, type ToolCategory } from "@/lib/docforge/tools-config";

export function QuickUploadPicker() {
  const router = useRouter();
  const [selectedTool, setSelectedTool] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toolsByCategory = useMemo(
    () =>
      CATEGORIES.reduce<Record<ToolCategory, typeof TOOLS>>((acc, category) => {
        acc[category] = TOOLS.filter((tool) => tool.category === category);
        return acc;
      }, {
        Convert: [],
        Organize: [],
        Optimize: [],
        Edit: [],
        Security: [],
        OCR: []
      }),
    []
  );

  const selectedToolMeta = TOOLS.find((tool) => tool.slug === selectedTool) ?? null;
  const hasSelection = Boolean(selectedToolMeta);

  return (
    <div className="mx-auto mt-6 flex max-w-2xl flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <div className="relative w-full max-w-md">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Choose a PDF tool"
          className="flex h-14 w-full items-center justify-between rounded-full border border-white/20 bg-white px-5 pr-11 text-left text-base font-medium text-ink-900 shadow-[0_12px_30px_rgba(18,7,29,0.30)] outline-none transition hover:border-forge-300/80 focus:border-forge-300/80 focus:ring-2 focus:ring-forge-400/20"
        >
          <span className={selectedToolMeta ? "text-ink-900" : "text-ink-600/70"}>
            {selectedToolMeta ? selectedToolMeta.name : "Choose a PDF tool"}
          </span>
        </button>

        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className={"pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-700 transition-transform " + (isOpen ? "rotate-180" : "")}
        >
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {isOpen && (
          <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-20 max-h-80 overflow-y-auto rounded-3xl border border-paper-200 bg-white p-2 shadow-[0_20px_60px_rgba(15,12,30,0.35)]">
            {CATEGORIES.map((category) => (
              <div key={category} className="mb-2 last:mb-0">
                <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-ink-500">
                  {category}
                </div>

                {toolsByCategory[category].map((tool) => {
                  const isSelected = tool.slug === selectedTool;

                  return (
                    <button
                      key={tool.slug}
                      type="button"
                      onClick={() => {
                        setSelectedTool(tool.slug);
                        setIsOpen(false);
                      }}
                      className={"flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm transition " + (isSelected ? "bg-forge-500/10 text-forge-700" : "text-ink-800 hover:bg-ink-100")}
                    >
                      <span>{tool.name}</span>
                      {isSelected && <span className="text-xs font-medium">Selected</span>}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        disabled={!hasSelection}
        onClick={() => {
          if (!hasSelection) return;
          router.push(`/tools/${selectedTool}`);
        }}
        className="inline-flex h-14 items-center justify-center rounded-full bg-forge-500 px-6 font-medium text-white shadow-[0_12px_30px_rgba(126,92,214,0.45)] transition hover:bg-forge-400 focus-ring disabled:cursor-not-allowed disabled:bg-forge-500/40 disabled:text-paper-100/60"
      >
        Upload a file
      </button>
    </div>
  );
}
