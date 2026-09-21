import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  TOOLS_REGISTRY,
  getToolMetadataBySlug,
  ToolMetadata,
} from '@/lib/tools-registry';
import { getToolBySlug, TOOLS as DOCUMENT_TOOLS } from '@/lib/docforge/tools-config';
import { ToolDispatcher } from '@/components/tools/ToolDispatcher';
import { constructToolMetadata } from '@/lib/seo';
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Lock,
  Zap,
} from 'lucide-react';

const CATEGORY_HUB: Record<ToolMetadata['category'], { href: string; label: string }> = {
  developer: { href: '/dev-tools', label: 'Developer tools' },
  security: { href: '/#tools', label: 'Security tools' },
  pdf: { href: '/document-tools', label: 'PDF Studio' },
  finance: { href: '/#tools', label: 'Finance tools' },
  utility: { href: '/#tools', label: 'Utility tools' },
};

function resolveTool(slug: string): ToolMetadata | undefined {
  const registered = getToolMetadataBySlug(slug);
  if (registered) return registered;

  const pdfTool = getToolBySlug(slug);
  if (!pdfTool) return undefined;

  return {
    slug: pdfTool.slug,
    name: pdfTool.name,
    h1: pdfTool.name,
    category: 'pdf',
    title: `${pdfTool.name} Online Free`,
    description: pdfTool.description || pdfTool.tagline,
    keywords: pdfTool.keywords || [],
    howItWorks: [
      `Upload the file you want to process with ${pdfTool.name}.`,
      'Confirm the conversion or edit options for this tool.',
      'Download the result. Uploaded files are discarded after processing.',
    ],
    faq: [
      {
        question: `Is ${pdfTool.name} free to use?`,
        answer: `Yes. ${pdfTool.name} is free to use with no account required.`,
      },
      {
        question: 'Are uploaded files stored?',
        answer: 'No. Files are processed in memory for this request and then discarded.',
      },
    ],
  };
}

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const slugs = new Set([
    ...TOOLS_REGISTRY.map((t) => t.slug),
    ...DOCUMENT_TOOLS.map((t) => t.slug),
  ]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const tool = resolveTool(params.slug);
  if (!tool) return { robots: { index: false, follow: false } };

  return constructToolMetadata({
    title: tool.title,
    description: tool.description,
    path: `/tools/${tool.slug}`,
    category: tool.category,
    keywords: tool.keywords,
  });
}

export default function ToolSubRoutePage({ params }: Props) {
  const tool = resolveTool(params.slug);
  if (!tool) notFound();

  const pdfTool = getToolBySlug(tool.slug);

  // Schema must describe visible content on this particular URL.
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `https://alltoolss.com/tools/${tool.slug}#app`,
        name: tool.name,
        headline: tool.h1,
        description: tool.description,
        url: `https://alltoolss.com/tools/${tool.slug}`,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        inLanguage: 'en',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://alltoolss.com/' },
          { '@type': 'ListItem', position: 2, name: CATEGORY_HUB[tool.category].label, item: `https://alltoolss.com${CATEGORY_HUB[tool.category].href}` },
          { '@type': 'ListItem', position: 3, name: tool.name, item: `https://alltoolss.com/tools/${tool.slug}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: tool.faq.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
      {
        '@type': 'HowTo',
        name: `How to use ${tool.name}`,
        description: tool.description,
        step: tool.howItWorks.map((text, index) => ({
          '@type': 'HowToStep', position: index + 1, text,
        })),
      },
    ],
  };

  // Compute related tools for internal linking (PDF Step 8)
  const sameCategoryTools = TOOLS_REGISTRY.filter(
    (t) => t.category === tool.category && t.slug !== tool.slug
  );
  const otherCategoryTools = TOOLS_REGISTRY.filter(
    (t) => t.category !== tool.category && t.slug !== tool.slug
  );
  const relatedTools = [...sameCategoryTools, ...otherCategoryTools].slice(0, 6);

  return (
    <div className="min-h-screen pb-20">
      {/* Dynamic JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Header Banner */}
      <div className="border-b border-border bg-card/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav aria-label="Breadcrumb" className="mb-2 text-xs text-muted-foreground flex items-center gap-2">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href={CATEGORY_HUB[tool.category].href} className="hover:text-primary transition-colors capitalize">
              {CATEGORY_HUB[tool.category].label}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{tool.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
                {tool.h1}
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground max-w-3xl">
                {tool.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Data Storage • 100% Private</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tool Mount Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-2xl border border-border bg-card shadow-sm p-4 sm:p-6">
          <ToolDispatcher slug={tool.slug} pdfTool={pdfTool} toolName={tool.name} />
        </div>
      </div>

      {/* Server-Rendered Semantic Text Section (Crawlable by Googlebot) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Why Use & Practical Applications */}
        <section className="p-6 sm:p-8 rounded-2xl border border-border bg-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2.5 border-b border-border pb-4">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>Why Use {tool.name}?</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {tool.name} provides instant, browser-based execution designed for developers, security professionals, and everyday web users. Built with high-performance client-side and ephemeral server algorithms, it delivers production-grade results without requiring user registration, software downloads, or subscription fees.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3.5 rounded-xl border border-border/60 bg-muted/20 text-xs space-y-1">
              <span className="font-semibold text-foreground block">⚡ Lightning Performance</span>
              <span className="text-muted-foreground">Executed in local browser memory or dedicated low-latency workers for zero waiting time.</span>
            </div>
            <div className="p-3.5 rounded-xl border border-border/60 bg-muted/20 text-xs space-y-1">
              <span className="font-semibold text-foreground block">🔒 Enterprise Security</span>
              <span className="text-muted-foreground">100% data confidentiality guarantee with zero file or snippet persistence.</span>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="p-6 sm:p-8 rounded-2xl border border-border bg-card space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2.5 border-b border-border pb-4">
            <Wrench className="w-5 h-5 text-primary" />
            <span>How to Use {tool.name}</span>
          </h2>
          <ol className="list-decimal pl-5 space-y-3 text-sm text-muted-foreground leading-relaxed">
            {tool.howItWorks.map((step, idx) => (
              <li key={idx} className="pl-1 text-foreground/90 font-medium">
                <span className="text-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Key Features & Security Section */}
        <section className="p-6 sm:p-8 rounded-2xl border border-border bg-card space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2.5 border-b border-border pb-4">
            <Lock className="w-5 h-5 text-emerald-400" />
            <span>Key Features & Security Standards</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
            <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Client-Side & In-Memory Privacy</span>
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All computations, transformations, and string manipulations execute in your local browser memory or isolated ephemeral worker instances with zero permanent disk persistence.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Zero File or Data Retention</span>
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your sensitive files, JWT keys, credentials, and code snippets are never shared, logged, or indexed. Data is automatically flushed as soon as your browser tab closes.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>100% Free & Unlimited Usage</span>
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                No credit cards, sign-ups, subscriptions, or watermarks. All {tool.name} features are accessible without rate limitations or intrusive paywalls.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="p-6 sm:p-8 rounded-2xl border border-border bg-card space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2.5 border-b border-border pb-4">
            <HelpCircle className="w-5 h-5 text-primary" />
            <span>Frequently Asked Questions</span>
          </h2>
          <div className="space-y-3">
            {tool.faq.map((f, idx) => (
              <details
                key={idx}
                className="group border border-border rounded-xl p-4 transition-all open:border-primary/40 open:bg-muted/10 cursor-pointer"
              >
                <summary className="font-semibold text-sm text-foreground flex items-center justify-between list-none">
                  <span>{f.question}</span>
                  <span className="text-primary text-base font-mono transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Related Tools Internal Linking Grid (PDF Step 8) */}
        <section className="p-6 sm:p-8 rounded-2xl border border-border bg-card space-y-6">
          <div className="border-b border-border pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2.5">
              <Wrench className="w-5 h-5 text-primary" />
              <span>Related Tools & Utilities</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Explore complementary utilities in the AllToolss suite for seamless developer workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedTools.map((relTool) => (
              <Link
                key={relTool.slug}
                href={`/tools/${relTool.slug}`}
                className="group p-4 rounded-xl border border-border/80 bg-background/50 hover:bg-muted/30 hover:border-primary/40 transition-all space-y-1.5 block"
              >
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                  <span>{relTool.name}</span>
                  <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {relTool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
