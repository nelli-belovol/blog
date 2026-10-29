import dotenv from 'dotenv';
dotenv.config();

/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
