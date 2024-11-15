// next.config.js
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/radio-proxy/stream/",
        destination: "https://radio.ztqckg569b.workers.dev/stream/",
      },
      {
        source: "/radio-proxy/stations",
        destination: "https://radio.ztqckg569b.workers.dev/stations",
      },
    ];
  },
  trailingSlash: true, // 모든 URL에 끝에 슬래시 추가
};

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

export default nextConfig;
