/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [`${process.env.BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com`, 'openweathermap.org'],
  },
};

module.exports = nextConfig;
