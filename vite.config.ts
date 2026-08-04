// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
    },
  },

  nitro: {
    preset: "netlify",
  },

  vite: {
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },

    publicDir: "public",

    server: {
      proxy: {
        "/api": {
          target:
            "https://script.google.com/macros/s/AKfycbwsiGCEACppsej0TI4-JGvCMtCYXhxvzNl9G2z0QNXMcZR9vAfAqTbeQ5Akij1L4pRE/exec",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          secure: false,
        },
      },
    },
  },
});