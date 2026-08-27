import { ToolCard } from "./tool-card";
import { CATEGORIES, toolsByCategory } from "@/lib/docforge/tools-config";

const CATEGORY_COPY: Record<string, string> = {
  Convert: "Move content between PDF and the formats you actually work in.",
  Organize: "Reshape a document's pages — combine, split, or reorder them.",
  Optimize: "Get a PDF into better shape without changing what's on the page.",
  Edit: "Mark up a PDF's pages directly.",
  Security: "Control who can open, copy, or print a document.",
  OCR: "Turn scanned pages into text you can search and select."
};

export function ToolGrid() {
  return (
    <div className="space-y-16">
      {CATEGORIES.map((category) => (
        <section key={category} id={category.toLowerCase()} className="scroll-mt-20">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-medium text-ink-900 dark:text-paper-50">{category}</h2>
              <p className="mt-1 text-sm text-ink-600 dark:text-paper-200/70">{CATEGORY_COPY[category]}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {toolsByCategory(category as any).map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
