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
  // Disable ESLint during build to prevent warnings from failing the build
  // (ESLint will still run in CI/CD and development)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable type checking during build (types are checked in development)
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
