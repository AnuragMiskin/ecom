/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/protected',
                destination: '/login',
                permanent: false,
            },
        ];
    },
};

export default nextConfig;
