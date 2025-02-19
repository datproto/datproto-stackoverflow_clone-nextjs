/** @type {import('next').NextConfig} */
const nextConfig = {
  ignoreBuildErrors: true,
  images: {
    domains: ["i.pravatar.cc"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*"
      },
      {
        protocol: "http",
        hostname: "*"
      }
    ]
  }
};

module.exports = nextConfig;
