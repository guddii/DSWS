/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  transpilePackages: ["ui", "solid"],
};

module.exports = nextConfig;
