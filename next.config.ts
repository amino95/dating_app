import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prisma 7's generated client and the libsql driver adapter rely on dynamic
  // WASM loading that breaks when Next.js tries to bundle them. Loading them
  // straight from node_modules at runtime instead avoids that.
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-libsql", "@libsql/client"],
};

export default nextConfig;
