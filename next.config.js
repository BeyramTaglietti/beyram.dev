/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'texts.com',
    ],
  },
};

module.exports = nextConfig;
