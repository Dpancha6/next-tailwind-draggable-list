/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repoName = 'next-tailwind-draggable-list';

const nextConfig = {
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  images: {
    loader: 'default',
    path: isProd ? `/${repoName}/` : '/',
  },
};

export default nextConfig;
