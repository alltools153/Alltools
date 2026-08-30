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
    domains: ['images.unsplash.com', 'api.dicebear.com'],
  },
};

export default nextConfig;
