import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Optimize for Vercel deployment
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Enable static optimization where possible
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
