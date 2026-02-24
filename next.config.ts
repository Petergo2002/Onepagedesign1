import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standard Next.js features (Image Optimization, etc.)
  /* 
  output: 'export', // Commented out to enable Image Optimization
  images: { unoptimized: true }, // Commented out to enable Image Optimization 
  */

  images: {
    qualities: [60, 75, 80],
  },

  // Base path if your app is served from a subdirectory
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',

  // Asset prefix for serving assets from a CDN
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',

  // Enable static optimization
  trailingSlash: true,
};

export default nextConfig;
