/** @type {import('next').NextConfig} */
module.exports = {
  compress: true,
  reactStrictMode: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    domains: ['images.ctfassets.net','carbon.now.sh','gist.github.com']
  }
}
