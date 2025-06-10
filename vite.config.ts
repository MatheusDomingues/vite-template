import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const API_URL = env.API_URL;
  const API_KEY = env.API_KEY;

  return {
    plugins: [react(), tailwindcss()],
    publicDir: "public",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
      hmr: { overlay: false },
      watch: { usePolling: true, interval: 1000 },
      proxy: {
        "/api": {
          target: API_URL,
          headers: {
            "x-api-key": API_KEY,
          },
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000,
      copyPublicDir: true,
    },
    clearScreen: false,
  };
});
