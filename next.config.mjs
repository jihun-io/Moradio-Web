// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/radio-proxy/stream/",
        destination: "https://radio.ztqckg569b.workers.dev/stream/",
      },
    ];
  },
  trailingSlash: true, // 모든 URL에 끝에 슬래시 추가
};

export default nextConfig;
