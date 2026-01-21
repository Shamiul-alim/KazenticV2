import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsHmrCache: true,
    turbopackFileSystemCacheForDev: true,
  }
};

export default nextConfig;
