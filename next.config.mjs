/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
  env: {
    URL_API: process.env.URL_API,
    LOGIN_URL: process.env.LOGIN_URL
  }
};

export default nextConfig;
