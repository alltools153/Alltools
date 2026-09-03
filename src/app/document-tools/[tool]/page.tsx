import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug, TOOLS } from "@/lib/docforge/tools-config";
import { ToolWorkspace } from "@/components/docforge/tool-workspace";
import ToolSeoFooter from "@/components/seo/ToolSeoFooter";

import { constructToolMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ tool: t.slug }));
}

export function generateMetadata({ params }: { params: { tool: string } }): Metadata {
  const tool = getToolBySlug(params.tool);
  if (!tool) return {};
  return constructToolMetadata({
    title: `${tool.name} — ${titleSuffix(tool.outputExt)}`,
    description: tool.description || tool.tagline,
    path: `/document-tools/${tool.slug}`,
    category: `PDF Studio • ${tool.category}`,
    keywords: ['pdf studio', 'document converter', tool.name.toLowerCase(), ...(tool.keywords || [])],
  });
}

function titleSuffix(ext: string) {
  if (ext === "pdf") return "Convert Online for Free";
  return `Convert Online to ${ext.toUpperCase()}`;
}

export default function ToolPage({ params }: { params: { tool: string } }) {
  const tool = getToolBySlug(params.tool);
  if (!tool) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-4 font-mono text-xs uppercase tracking-wide text-ink-600/60 dark:text-paper-200/40">
        Document Tools / {tool.category}
      </nav>
      <h1 className="font-display text-3xl font-medium text-ink-900 dark:text-paper-50 sm:text-4xl">{tool.name}</h1>
      <p className="mt-2 max-w-xl text-ink-700 dark:text-paper-200/70">{tool.description}</p>

      {tool.requiresNativeBinary && (
        <p className="mt-3 rounded-lg bg-paper-100 px-3 py-2 font-mono text-xs text-ink-600 dark:bg-ink-800 dark:text-paper-200/60">
          Server note: this tool needs {tool.requiresNativeBinary} installed on the deployment.
        </p>
      )}

      <div className="mt-8">
        <ToolWorkspace tool={tool} />
      </div>

      <ToolExplainer slug={tool.slug} />

      <div className="mt-12">
        <ToolSeoFooter toolSlug={tool.slug} />
      </div>
    </div>
  );
}

function ToolExplainer({ slug }: { slug: string }) {
  const copy = EXPLAINERS[slug];
  if (!copy) return null;
  return (
    <div className="mt-16 border-t border-paper-200 pt-8 text-sm leading-relaxed text-ink-700 dark:border-ink-700 dark:text-paper-200/70">
      {copy}
    </div>
  );
}

const EXPLAINERS: Record<string, string> = {
  "merge-pdf": "Merging keeps every page from your source files at full quality — nothing is re-rendered or recompressed in the process, so text stays selectable and images stay sharp.",
  "compress-pdf": "Compression savings depend entirely on what's inside your PDF. A file full of scanned photos usually shrinks a lot; a file that's mostly text may barely change size.",
  "ocr-pdf": "OCR works best on clear, reasonably high-resolution scans. Handwriting and heavily skewed or low-contrast pages will produce less accurate results.",
  "pdf-to-word": "This conversion rebuilds your PDF's text, paragraphs, and page breaks in an editable Word document. Complex multi-column layouts or heavily designed pages won't come out pixel-identical — for that, keep working from the original source file."
};
