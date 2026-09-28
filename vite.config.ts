import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// Embed the build identity in the app bundle, so an offline/older PWA keeps
// showing its own version instead of a newer version fetched from the server.
const buildParts = Object.fromEntries(
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Mexico_City",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  })
    .formatToParts(new Date())
    .map(({ type, value }) => [type, value]),
);
const appVersion = `${buildParts.year}.${buildParts.month}.${buildParts.day}-${buildParts.hour}${buildParts.minute}${buildParts.second}`;

export default defineConfig({
  define: {
    "import.meta.env.VITE_APP_VERSION": JSON.stringify(appVersion),
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["favicon.svg", "icon-192.png", "icon-512.png"],
      manifest: {
        id: "/",
        name: "JudyQuest",
        short_name: "JudyQuest",
        description: "Pequeñas misiones, grandes descubrimientos.",
        lang: "es-MX",
        start_url: "/",
        scope: "/",
        display: "standalone",
        theme_color: "#193b35",
        background_color: "#f6f8f5",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,json,woff2}"],
        navigateFallback: "/index.html",
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  server: { host: "0.0.0.0", port: 5173, allowedHosts: true },
});
