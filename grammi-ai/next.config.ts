import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Repository name on GitHub: XircTwerk/Grammi.AI
  // GitHub Pages URL: https://xirctwerk.github.io/Grammi.AI/
  basePath: "/Grammi.AI",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
