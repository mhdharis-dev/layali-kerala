/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'layalikerala.com',
      },
      {
        protocol: 'https',
        hostname: 'images.openai.com',
      },
    ],
  },
};

export default nextConfig;
