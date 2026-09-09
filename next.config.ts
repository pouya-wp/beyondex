import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: process.env.NEXT_BUILD_DIR ?? ".next",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/agents", destination: "/fa/agents", permanent: false },
      { source: "/pricing", destination: "/fa/pricing", permanent: false },
    ];
  },
};

export default nextConfig;
