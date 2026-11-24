import type { MetadataRoute } from "next";

// This is a study project: keep crawlers out so they don't render
// thousands of /movies/[id] and /actor/[id] pages on Vercel's servers.
export default function robots(): MetadataRoute.Robots {
    return {
        rules: { userAgent: "*", disallow: "/" },
    };
}
