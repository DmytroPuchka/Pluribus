import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'http',
        hostname: 'example.com',
      },
      // Cloudinary (for future image uploads)
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
      },
      // Add more domains as needed for product images, user avatars, etc.
    ],
  },
};

export default nextConfig;
