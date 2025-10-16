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
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.tmdb.org",
                port: "",            
            }
        ] 
    }
};
export default nextConfig;
