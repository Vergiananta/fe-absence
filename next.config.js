/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL_USER: process.env.BASE_URL_USER,
    BASE_URL_ABSENCE: process.env.BASE_URL_ABSENCE,
  },
};

module.exports = nextConfig;
