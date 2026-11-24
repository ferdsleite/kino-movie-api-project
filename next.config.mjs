/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/movies",
                permanent: true
            }
        ]
    },
    images: {
        // TMDB serves pre-sized images from its own CDN (see imageURLFormat),
        // so Vercel Image Optimization is not needed and was over the Hobby limits.
        unoptimized: true,
    }
};
export default nextConfig;
