import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Only use basePath in production for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/robin-marsman' : ''
};

export default nextConfig;
