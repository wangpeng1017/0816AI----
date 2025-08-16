/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // 图片优化配置
  images: {
    unoptimized: true,
  },

  // 环境变量配置
  env: {
    SITE_URL: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000',
  },
};

module.exports = nextConfig;
