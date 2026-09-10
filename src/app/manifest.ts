import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Beyondex",
    short_name: "Beyondex",
    description: "Dedicated AI agents with independent workspaces.",
    start_url: "/",
    display: "standalone",
    background_color: "#050711",
    theme_color: "#050711",
    lang: "fa",
    dir: "rtl",
    icons: [
      { src: "/brand/beyondex-mark.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/brand/logo-check.png", sizes: "1094x210", type: "image/png", purpose: "any" },
    ],
  };
}
