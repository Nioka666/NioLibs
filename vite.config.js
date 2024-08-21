import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteTsconfigPaths from "vite-tsconfig-paths";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  server: {
    port: 80,
  },
  plugins: [react(), ViteTsconfigPaths()],
  build: {
    rollupOptions: {
      input: "./index.html",
    },
  },
});
