/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['lh3.googleusercontent.com', 's3.ap-southeast-2.amazonaws.com', 'images.pexels.com'],
    },
};

module.exports = nextConfig;
