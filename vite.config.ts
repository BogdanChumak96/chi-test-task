import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@components": "/src/components",
      "@utils": "/src/utils",
      "@store": "/src/store",
      "@config": "/src/config",
      "@types": "/src/types",
      "@api": "store/api/*",
    },
  },
  plugins: [react()],
});
