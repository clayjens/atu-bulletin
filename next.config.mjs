import createJITI from "jiti";
import { fileURLToPath } from "node:url";
const jiti = createJITI(fileURLToPath(import.meta.url));

jiti("./src/env.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    images: {
        remotePatterns: [
            { hostname: "img.clerk.com" }
        ]
    }
};

export default nextConfig;
