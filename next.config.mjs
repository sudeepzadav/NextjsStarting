/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t4.ftcdn.net"
      }
    ]
  }
};

export default nextConfig;
