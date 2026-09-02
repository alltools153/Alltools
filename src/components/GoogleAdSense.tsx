'use client';

import Script from 'next/script';

export default function GoogleAdSense({ pId }: { pId?: string }) {
  const publisherId = pId || process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  if (!publisherId) {
    return null;
  }

  return (
    <Script
      id="google-adsense-script"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

/**
 * Responsive AdSense Ad Unit Component with CLS Protection
 */
export function AdSenseUnit({
  slotId,
  format = 'auto',
  responsive = true,
  className = '',
}: {
  slotId: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
}) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  if (!publisherId) {
    return null;
  }

  return (
    <div
      className={`min-h-[90px] sm:min-h-[100px] w-full flex items-center justify-center bg-muted/10 border border-border/30 rounded-2xl overflow-hidden my-4 ${className}`}
      aria-label="Advertisement"
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={publisherId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
