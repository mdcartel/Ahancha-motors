/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Only run ESLint on development builds, not production
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript during production builds
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
