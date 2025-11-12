import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // allow all Unsplash image paths
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
