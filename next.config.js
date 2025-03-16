/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/cdu-muscleforge-app',
  trailingSlash: true,
};

module.exports = nextConfig;
