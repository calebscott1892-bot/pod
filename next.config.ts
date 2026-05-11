import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the local dev server to be accessed via Cloudflare quick tunnels and
  // similar wildcard domains. Dev-only — has no effect in production builds.
  allowedDevOrigins: ["*.trycloudflare.com"],
};

export default nextConfig;
