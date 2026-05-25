import type { NextConfig } from "next";
import pinpoint from "@pinpoint/next/config";

const nextConfig: NextConfig = {
  turbopack: {},
};

export default pinpoint(nextConfig, { spawnAgent: "inline" });
