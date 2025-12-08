/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // Disable TypeScript during production builds
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
