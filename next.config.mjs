/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  serverExternalPackages: [
    'pdfjs-dist',
    'tesseract.js',
    'libreoffice-convert',
    'canvas',
    'sharp',
  ],
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'clsx',
      'tailwind-merge',
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://pagead2.googlesyndication.com https://adservice.google.com https://www.googletagmanager.com https://www.google-analytics.com https://fundingchoicesmessages.google.com https://ep2.adtrafficquality.google",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://pagead2.googlesyndication.com https://www.google.com https://googleads.g.doubleclick.net https://images.unsplash.com https://api.dicebear.com https://*.bseindia.com https://*.nseindia.com",
              "connect-src 'self' https://pagead2.googlesyndication.com https://www.google-analytics.com https://analytics.google.com https://ep2.adtrafficquality.google https://cloudflare-dns.com https://rdap.org https://query1.finance.yahoo.com https://query2.finance.yahoo.com https://alltools-c30i.onrender.com wss: ws:",
              "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://fundingchoicesmessages.google.com",
              "frame-ancestors 'self'",
              "form-action 'self'",
              "base-uri 'self'",
              "object-src 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/json-formatter', destination: '/tools/json-formatter', permanent: true },
      { source: '/regex-tester', destination: '/tools/regex-tester', permanent: true },
      { source: '/jwt-decoder', destination: '/tools/jwt-decoder', permanent: true },
      { source: '/sql-generator', destination: '/tools/sql-generator', permanent: true },
      { source: '/gitignore-generator', destination: '/tools/gitignore-generator', permanent: true },
      { source: '/base64-encoder-decoder', destination: '/tools/base64-encoder-decoder', permanent: true },
      { source: '/uuid-generator', destination: '/tools/uuid-generator', permanent: true },
      { source: '/cron-expression-generator', destination: '/tools/cron-expression-generator', permanent: true },
      { source: '/vapt-scanner', destination: '/tools/vapt-scanner', permanent: true },
      { source: '/vapt-security-scanner', destination: '/tools/vapt-scanner', permanent: true },
      { source: '/nmap-scanner', destination: '/tools/nmap-audit', permanent: true },
      { source: '/ssl-certificate-checker', destination: '/tools/ssl-certificate-checker', permanent: true },
      { source: '/ssl-checker', destination: '/tools/ssl-certificate-checker', permanent: true },
      { source: '/dns-lookup', destination: '/tools/dns-lookup', permanent: true },
      { source: '/whois-lookup', destination: '/tools/whois-lookup', permanent: true },
      { source: '/email-security', destination: '/tools/email-security', permanent: true },
      { source: '/password-generator', destination: '/tools/password-generator', permanent: true },
      { source: '/password-strength-checker', destination: '/tools/password-strength-checker', permanent: true },
      { source: '/resume-ats-checker', destination: '/tools/resume-ats-checker', permanent: true },
      { source: '/age-calculator', destination: '/tools/age-calculator', permanent: true },
      { source: '/bengali-calendar', destination: '/tools/bengali-calendar', permanent: true },
      { source: '/bengali-panjika', destination: '/tools/bengali-calendar', permanent: true },
      { source: '/qr-generator', destination: '/tools/qr-generator', permanent: true },
      { source: '/qr-code-generator', destination: '/tools/qr-generator', permanent: true },
      { source: '/image-compressor', destination: '/tools/image-compressor', permanent: true },
      { source: '/stock-market', destination: '/tools/stock-market', permanent: true },
      { source: '/indian-stock-market', destination: '/tools/stock-market', permanent: true },
      { source: '/gst-calculator', destination: '/tools/gst-calculator', permanent: true },
      { source: '/sip-calculator', destination: '/tools/sip-calculator', permanent: true },
      { source: '/spf-dkim-dmarc-checker', destination: '/tools/email-security', permanent: true },
      { source: '/document-tools/:tool', destination: '/tools/:tool', permanent: true },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/pdf-studio',
        destination: '/document-tools',
      },
      {
        source: '/api/py/docforge/:path*',
        destination: `${(process.env.PYTHON_API_URL || 'https://alltools-c30i.onrender.com').replace(/\/$/, '')}/api/v1/docforge/:path*`,
      },
      {
        source: '/api/py/:path*',
        destination: `${(process.env.PYTHON_API_URL || 'https://alltools-c30i.onrender.com').replace(/\/$/, '')}/api/v1/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
    ],
  },
};

export default nextConfig;
