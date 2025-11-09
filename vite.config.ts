import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { invitationDetails, metadata } from "./src/config/metadata";

// Plugin to inject meta tags at build time
function injectMetaTags(): Plugin {
  return {
    name: "inject-meta-tags",
    transformIndexHtml(html) {
      // Get the base URL for production (can be configured)
      const baseUrl = process.env.VITE_BASE_URL || "https://fairytale-first-wish-xknektmp.onslate.in";
      const ogImageUrl = `${baseUrl}/og-image.png`;
      
      return html
        .replace(/__META_TITLE__/g, metadata.title)
        .replace(/__META_DESCRIPTION__/g, metadata.description)
        .replace(/__META_AUTHOR__/g, metadata.author)
        .replace(/__META_OG_TYPE__/g, metadata.og.type)
        .replace(/__META_OG_URL__/g, baseUrl)
        .replace(/__META_OG_TITLE__/g, metadata.og.title)
        .replace(/__META_OG_DESCRIPTION__/g, metadata.og.description)
        .replace(/__META_OG_IMAGE__/g, ogImageUrl)
        .replace(/__META_OG_IMAGE_ALT__/g, metadata.og.imageAlt)
        .replace(/__META_TWITTER_CARD__/g, metadata.twitter.card)
        .replace(/__META_TWITTER_IMAGE_ALT__/g, metadata.twitter.imageAlt);
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
