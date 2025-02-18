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
  },
  experimental: {
    serverActions: true,
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"]
  }
};

module.exports = nextConfig;
