import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tsconfigPaths({
      projects: ["./tsconfig.app.json"],
    }),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app"),
    },
  },

  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://localhost:5149",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //     //代理odata 格式请求
  //     "/odata": {
  //       target: "https://localhost:5149",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
});
