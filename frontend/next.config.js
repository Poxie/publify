module.exports = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE_HOST, 'cdn.discordapp.com']
  },
  experimental: {
    scrollRestoration: true
  }
}
