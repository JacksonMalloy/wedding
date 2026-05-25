import type { NextConfig } from "next";
import pinpoint from "@pinpoint/next/config";

const nextConfig: NextConfig = {
  /* config options here */
};

export default pinpoint(nextConfig, { spawnAgent: "inline" });
