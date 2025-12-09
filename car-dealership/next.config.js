/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Static export mode for deployment
    typescript: {
        // Disable TypeScript during production builds
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
