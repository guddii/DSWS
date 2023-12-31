/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  transpilePackages: ["i18n", "ui", "solid", "vocab"],
};

module.exports = nextConfig;
