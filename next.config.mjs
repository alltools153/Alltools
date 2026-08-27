/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: [
      'pdfjs-dist',
      'tesseract.js',
      'libreoffice-convert',
      'canvas',
      'sharp',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/py/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:8000/api/v1/:path*'
            : 'http://127.0.0.1:8000/api/v1/:path*',
      },
    ];
  },
  images: {
    domains: ['images.unsplash.com', 'api.dicebear.com'],
  },
};

export default nextConfig;
