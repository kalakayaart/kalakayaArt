import type { NextConfig } from "next";

// Backend URL — used server-side only (never baked into the client bundle)
// On your VPS set: BACKEND_URL=http://localhost:5000
const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:5000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // All /api/* calls from the browser are forwarded server-side to the backend
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
      // Static uploads (images, CVs) also served through the proxy
      {
        source: "/uploads/:path*",
        destination: `${BACKEND_URL}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
