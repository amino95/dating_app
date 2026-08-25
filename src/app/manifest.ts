import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ask Them Out",
    short_name: "Ask Them Out",
    description: "Send a link, let them pick the date, time, and food.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff7f5",
    theme_color: "#ec4899",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
