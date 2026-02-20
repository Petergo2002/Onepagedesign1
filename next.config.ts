import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standard Next.js features (Image Optimization, etc.)
  /* 
  output: 'export', // Commented out to enable Image Optimization
  images: { unoptimized: true }, // Commented out to enable Image Optimization 
  */

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },

  // Base path if your app is served from a subdirectory
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',

  // Asset prefix for serving assets from a CDN
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',

  // Enable static optimization
  trailingSlash: true,
};

export default nextConfig;
