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
            ? 'https://alltools-c30i.onrender.com/v1/:path*'
            : 'https://alltools-c30i.onrender.com/api/v1/:path*',
      },
    ];
  },
  images: {
    domains: ['images.unsplash.com', 'api.dicebear.com'],
  },
};

export default nextConfig;
