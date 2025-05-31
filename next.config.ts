import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
    domains: [
      "lh3.googleusercontent.com", // adiciona este
      "cdn-icons-png.freepik.com" // se quiser permitir também o fallback
    ],
  }
};

export default nextConfig;
