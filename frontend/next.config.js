const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE_HOST]
  },
  experimental: {
    scrollRestoration: true
  },
  i18n
}
