'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Cookie, X, Check } from 'lucide-react';

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('alltools_cookie_consent');
      if (!consent) {
        // Small delay to prevent layout jump on immediate mount
        const timer = setTimeout(() => setShowBanner(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage not accessible
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('alltools_cookie_consent', 'accepted');
    } catch {}
    setShowBanner(false);
  };

  const handleDeclineNonEssential = () => {
    try {
      localStorage.setItem('alltools_cookie_consent', 'essential_only');
    } catch {}
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-5 rounded-3xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl text-foreground space-y-3 animate-in slide-in-from-bottom-5 duration-300"
      style={{ backgroundColor: 'var(--card)' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Cookie className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-foreground">Cookie &amp; Privacy Notice</div>
            <span className="text-[10px] text-muted-foreground font-mono">GDPR &amp; AdSense Compliant</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDeclineNonEssential}
          className="text-muted-foreground hover:text-foreground p-1 rounded-lg transition-colors cursor-pointer"
          aria-label="Close cookie consent banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        AllToolss uses essential cookies for in-server utilities and anonymous telemetry to optimize tool performance. Third-party advertising partners like Google AdSense may use cookies to serve relevant ads. Learn more in our{' '}
        <Link href="/privacy-policy" className="text-primary font-medium hover:underline">
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link href="/cookie-policy" className="text-primary font-medium hover:underline">
          Cookie Policy
        </Link>.
      </p>

      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={handleAcceptAll}
          className="flex-1 py-2 px-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5 shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer"
        >
          <Check className="w-3.5 h-3.5" /> Accept All
        </button>
        <button
          type="button"
          onClick={handleDeclineNonEssential}
          className="py-2 px-3.5 rounded-xl border border-border bg-muted/40 hover:bg-muted text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          Essential Only
        </button>
      </div>
    </aside>
  );
}
