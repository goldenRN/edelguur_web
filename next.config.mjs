/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     domains: ['images.unsplash.com'],
    // },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '4000',
                pathname: '/uploads/**',
            },
        ],
    },
};

export default nextConfig;

