/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  reactStrictMode: true,
  images: {
    domains: [`${process.env.BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com`, 'openweathermap.org'],
  },
};

const nextConfig = withPWA({
  dest: 'public',
  disable: !isProduction,
  runtimeCaching: [],
})(config);

module.exports = nextConfig;
