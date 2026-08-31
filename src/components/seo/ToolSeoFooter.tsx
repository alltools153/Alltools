'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ArrowRight, Layers, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';
import { SEO_MASTER_BLUEPRINT } from '@/lib/seoMasterBlueprint';
import { SITE_CONFIG } from '@/lib/seo';

interface ToolSeoFooterProps {
  toolSlug: string;
}

export default function ToolSeoFooter({ toolSlug }: ToolSeoFooterProps) {
  const data = SEO_MASTER_BLUEPRINT[toolSlug];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!data) return null;

  // Generate Schema JSON-LD
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.name,
    description: data.metaDescription,
    url: `${SITE_CONFIG.url}${data.path}`,
    applicationCategory: data.category,
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
    mainEntity: data.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_CONFIG.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: data.category,
        item: `${SITE_CONFIG.url}/#${data.category.toLowerCase().replace(/\s+/g, '-')}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: data.name,
        item: `${SITE_CONFIG.url}${data.path}`,
      },
    ],
  };

  return (
    <section className="mt-16 pt-12 border-t border-border/60 space-y-12 max-w-5xl mx-auto w-full">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Internal Linking Silo */}
      {data.siloLinks && data.siloLinks.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm tracking-wide uppercase">
            <Layers className="w-4 h-4" />
            <span>Related Tools &amp; Strategic Silos</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {data.siloLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="group flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-card/50 hover:bg-primary/5 hover:border-primary/40 transition-all shadow-sm"
              >
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    {link.type === 'primary' ? 'Topic Silo' : 'Cross Utility'}
                  </span>
                  <span className="font-semibold text-sm group-hover:text-primary transition-colors text-foreground">
                    {link.name}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Accordion Section */}
      {data.faqs && data.faqs.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm tracking-wide uppercase">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 100% Client-Side / Secure
            </span>
          </div>

          <div className="space-y-3">
            {data.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-border/70 rounded-2xl bg-card/40 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    <span className="text-sm sm:text-base pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 text-muted-foreground ${
                        isOpen ? 'rotate-180 text-primary' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Trust & Architecture Badge */}
      <div className="p-4 rounded-2xl bg-muted/40 border border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>
            <strong>{data.name}</strong> runs on high-speed in-server architecture with zero third-party data tracking.
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono">
          <span>Search Vol: {data.searchVolume}</span>
          <span>•</span>
          <span>KD: {data.kd}</span>
        </div>
      </div>
    </section>
  );
}
