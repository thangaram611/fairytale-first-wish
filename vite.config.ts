import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { metadata } from "./src/config/metadata";

// Plugin to inject meta tags at build time
function injectMetaTags(): Plugin {
  return {
    name: "inject-meta-tags",
    transformIndexHtml(html) {
      // Get the base URL for production (can be configured)
      const baseUrl = process.env.VITE_BASE_URL || "https://taneira1.onslate.in";
      const ogImageUrl = `${baseUrl}/og-image.png`;
      
      return html
        .replaceAll(/__META_TITLE__/g, metadata.title)
        .replaceAll(/__META_DESCRIPTION__/g, metadata.description)
        .replaceAll(/__META_AUTHOR__/g, metadata.author)
        .replaceAll(/__META_OG_TYPE__/g, metadata.og.type)
        .replaceAll(/__META_OG_URL__/g, baseUrl)
        .replaceAll(/__META_OG_TITLE__/g, metadata.og.title)
        .replaceAll(/__META_OG_DESCRIPTION__/g, metadata.og.description)
        .replaceAll(/__META_OG_IMAGE__/g, ogImageUrl)
        .replaceAll(/__META_OG_IMAGE_ALT__/g, metadata.og.imageAlt)
        .replaceAll(/__META_TWITTER_CARD__/g, metadata.twitter.card)
        .replaceAll(/__META_TWITTER_IMAGE_ALT__/g, metadata.twitter.imageAlt)
        .replaceAll(/__META_UPDATED_TIME__/g, Date.now().toString());
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), injectMetaTags()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
