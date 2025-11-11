import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from 'vite-plugin-pwa';
import { metadata } from "./src/config/metadata";

// Plugin to inject meta tags at build time
function injectMetaTags(): Plugin {
  return {
    name: "inject-meta-tags",
    transformIndexHtml(html) {
      // Get the base URL for production (can be configured)
      const baseUrl = process.env.VITE_BASE_URL || "https://taneirainvites.onslate.in";
      const ogImageUrl = `${baseUrl}/og-image.jpg`;
      
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
    allowedHosts: true as const
  },
  plugins: [
    react(), 
    injectMetaTags(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
        type: 'module'
      },
      includeAssets: [
        'favicon.ico',
        'favicon-96x96.png',
        'favicon.svg',
        'apple-touch-icon.png',
        'og-image.jpg',
        'placeholder.svg',
        'robots.txt',
        'site.webmanifest',
        'web-app-manifest-192x192.png',
        'web-app-manifest-512x512.png'
      ],
      manifest: {
        name: 'Princess Taneira 1st Birthday Invitation',
        short_name: 'Taneira Party',
        description: 'Join us for Princess Taneira\'s magical first birthday celebration!',
        theme_color: '#8B5CF6',
        background_color: '#FFC0CB',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,avif,webp,png,svg,ico,jpg,jpeg}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
