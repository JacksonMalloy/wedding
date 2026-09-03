import type { NextConfig } from "next";
import pinpoint from "@pinpoint/next/config";

const nextConfig: NextConfig = {
  turbopack: {},
  async headers() {
    return [
      {
        source: "/invite/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
        ],
      },
    ];
  },
};

export default pinpoint(nextConfig, { spawnAgent: "inline" });
