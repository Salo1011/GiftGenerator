import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxies /api/* to the Vercel dev server (port 3000) during local development.
      // Run `vercel dev` in a separate terminal to serve the serverless functions.
      "/api": "http://localhost:3000",
    },
  },
});
