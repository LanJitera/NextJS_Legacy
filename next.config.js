/**
 * @type {import('next').NextConfig}
 */
const { i18n } = require("./next-i18next.config");

module.exports = {
  images: {
    domains: ["jitera.com", "jitera.app", "picsum.photos", "studio.jitera.app"],
  },
  i18n,
  reactStrictMode: true,
  webpack(config) {
    return config;
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  publicRuntimeConfig: Object.keys(process.env).reduce((all, key) => {
    if (key.startsWith("NEXT_PUBLIC")) {
      return { ...all, [key]: process.env[key] };
    }
    return all;
  }, {}),
};
