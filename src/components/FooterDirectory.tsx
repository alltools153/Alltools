import React from 'react';
import Link from 'next/link';
import { TOOLS_REGISTRY } from '@/lib/tools-registry';

export default function FooterDirectory() {
  const categories = [
    { key: 'developer', title: 'Developer Utilities' },
    { key: 'security', title: 'Security & Diagnostics' },
    { key: 'pdf', title: 'PDF Studio (31 Tools)' },
    { key: 'finance', title: 'Finance & Wealth' },
    { key: 'utility', title: 'Career & Utilities' },
  ] as const;

  return (
    <nav
      aria-label="Comprehensive Tool Directory"
      className="border-t border-border/60 bg-muted/20 py-10 px-4 sm:px-6 lg:px-8 text-xs"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-4">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
              AllToolss Programmatic Tool Index
            </h2>
            <p className="text-muted-foreground text-[11px] mt-0.5">
              Direct semantic crawl links to all {TOOLS_REGISTRY.length} tools and document utilities.
            </p>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded-md border border-border">
            100% In-Server & Client-Side Privacy
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map(({ key, title }) => {
            const tools = TOOLS_REGISTRY.filter((t) => t.category === key);
            return (
              <div key={key} className="space-y-3">
                <h3 className="font-semibold text-foreground text-xs uppercase tracking-wide border-l-2 border-primary pl-2">
                  {title}
                </h3>
                <ul className="space-y-1.5 list-none p-0 m-0">
                  {tools.map((tool) => (
                    <li key={tool.slug}>
                      <a
                        href={`/tools/${tool.slug}`}
                        title={tool.title}
                        className="text-muted-foreground hover:text-primary transition-colors block truncate py-0.5"
                      >
                        {tool.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
