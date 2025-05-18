import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      leaflet: "leaflet/dist/leaflet-src.esm.js",
    },
  },
  optimizeDeps: {
    include: ["leaflet", "react-leaflet", "react-leaflet/core"],
  },
});
