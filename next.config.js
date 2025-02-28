/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Enable static exports
  trailingSlash: true,
  // Disable server components since we're doing static export
  experimental: {
    appDir: true,
  }
}

module.exports = nextConfig