import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  TOOLS_REGISTRY,
  getToolMetadataBySlug,
  ToolMetadata,
} from '@/lib/tools-registry';
import { getToolBySlug } from '@/lib/docforge/tools-config';
import { ToolDispatcher } from '@/components/tools/ToolDispatcher';
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Lock,
  Zap,
} from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return TOOLS_REGISTRY.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const tool = getToolMetadataBySlug(params.slug);
  if (!tool) return {};

  const url = `https://alltoolss.com/tools/${tool.slug}`;

  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: url,
      siteName: 'AllToolss',
      type: 'website',
      images: [
        {
          url: `https://alltoolss.com/api/og?title=${encodeURIComponent(
            tool.name
          )}&desc=${encodeURIComponent(tool.description)}&cat=${encodeURIComponent(
            tool.category
          )}`,
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.title,
      description: tool.description,
      images: [
        `https://alltoolss.com/api/og?title=${encodeURIComponent(
          tool.name
        )}&desc=${encodeURIComponent(tool.description)}&cat=${encodeURIComponent(
          tool.category
        )}`,
      ],
    },
  };
}

export default function ToolSubRoutePage({ params }: Props) {
  const tool = getToolMetadataBySlug(params.slug);
  if (!tool) notFound();

  const pdfTool = getToolBySlug(tool.slug);

  // Schema.org WebApplication & FAQPage JSON-LD
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    headline: tool.h1,
    description: tool.description,
    url: `https://alltoolss.com/tools/${tool.slug}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Dynamic JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header Banner */}
      <div className="border-b border-border bg-card/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav aria-label="Breadcrumb" className="mb-2 text-xs text-muted-foreground flex items-center gap-2">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/seo-keywords" className="hover:text-primary transition-colors capitalize">
              {tool.category} Tools
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
      </div>
    </div>
  );
}
