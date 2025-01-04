import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: false, // Turn off Turbopack
  },
};

export default nextConfig;
