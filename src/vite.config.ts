import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    mkcert(),
    react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler"],
          ["@babel/plugin-proposal-decorators", { legacy: true }],
        ],
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

  server: {
    https: {},
  },
});
