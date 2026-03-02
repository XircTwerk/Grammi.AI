import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export removed — we need API routes for the AI backend.
  // Deploy to Vercel (free): connect repo at vercel.com, done.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
