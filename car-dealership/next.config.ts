/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Only run ESLint on development builds, not production
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig