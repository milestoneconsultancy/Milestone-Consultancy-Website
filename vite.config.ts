// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
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
    // ✅ Proxy Configuration
    server: {
      proxy: {
        '/api': {
          target: 'https://script.google.com/macros/s/AKfycbwsiGCEACppsej0TI4-JGvCMtCYXhxvzNl9G2z0QNXMcZR9vAfAqTbeQ5Akij1L4pRE/exec',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
        },
      },
    },
  },
});