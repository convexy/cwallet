import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
  build: {
    outDir: "./../backend/build/public"
  },
  plugins: [vue()]
});
