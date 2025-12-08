/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone', // Explicitly set to standalone (server mode, not static export)
    typescript: {
        // Disable TypeScript during production builds
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
