import Link from "next/link";
import type { ToolConfig } from "@/lib/docforge/tools-config";

const ICONS: Record<string, JSX.Element> = {
  Convert: (
    <path d="M4 8a4 4 0 0 1 4-4h4M20 16a4 4 0 0 1-4 4h-4M8 5l-2 2 2 2M16 19l2-2-2-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  ),
  Organize: (
    <path d="M4 5h16M4 12h10M4 19h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  ),
  Optimize: (
    <path d="M12 3v6l4-2M12 21a9 9 0 1 0-9-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  ),
  Edit: (
    <path d="M4 20l4-1 11-11-3-3L5 16l-1 4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  ),
  Security: (
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  ),
  OCR: (
    <path d="M4 7V4h3M17 4h3v3M20 17v3h-3M7 20H4v-3M8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  )
};

export function ToolCard({ tool }: { tool: ToolConfig }) {
  return (
    <Link
      href={`/document-tools/${tool.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-glow-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {ICONS[tool.category]}
        </svg>
      </span>
      <div>
        <h3 className="font-medium text-foreground">{tool.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{tool.tagline}</p>
      </div>
    </Link>
  );
}
