/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'clsx',
      'tailwind-merge',
    ],
    serverComponentsExternalPackages: [
      'pdfjs-dist',
      'tesseract.js',
      'libreoffice-convert',
      'canvas',
      'sharp',
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
  async rewrites() {
    return [
      {
        source: '/nmap-scanner',
        destination: '/vapt-scanner',
      },
      {
        source: '/spf-dkim-dmarc-checker',
        destination: '/email-security',
      },
      {
        source: '/pdf-studio',
        destination: '/document-tools',
      },
      {
        source: '/qr-code-generator',
        destination: '/qr-generator',
      },
      {
        source: '/indian-stock-market',
        destination: '/stock-market',
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
