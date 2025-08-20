import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // or higher depending on your file size needs
    },
  },
};

export default nextConfig;
