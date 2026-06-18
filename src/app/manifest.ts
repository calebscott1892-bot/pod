import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Spare Space — Premium Lifestyle Studios",
    short_name: "Spare Space",
    description:
      "Premium modular lifestyle studios for home gyms, offices, creative spaces and wellness retreats — rent or own, delivered across Northern NSW and Southeast QLD.",
    start_url: "/",
    display: "standalone",
    background_color: "#f0e3db",
    theme_color: "#f0e3db",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
