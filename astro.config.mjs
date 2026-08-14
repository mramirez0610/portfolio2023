import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://marcoramirez.dev",
  integrations: [mdx({ smartypants: false })],
  output: "static",
  trailingSlash: "always",
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
