import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/context": path.resolve(__dirname, "./src/context"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/layouts": path.resolve(__dirname, "./src/layouts"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/routes": path.resolve(__dirname, "./src/routes"),
      "@/services": path.resolve(__dirname, "./src/services"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/constants": path.resolve(__dirname, "./src/constants"),
      "@/stores": path.resolve(__dirname, "./src/stores"),
      "@/api": path.resolve(__dirname, "./src/api"),
    },
  },
});
