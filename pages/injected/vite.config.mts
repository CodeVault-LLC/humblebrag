import { defineConfig } from "vite";
import { resolve } from "path";
import { makeEntryPointPlugin, watchRebuildPlugin } from "@humblebrag/hmr";

const rootDir = resolve(__dirname);
const libDir = resolve(rootDir, "lib");

const isDev = process.env.__DEV__ === "true";
const isProduction = !isDev;

export default defineConfig({
  resolve: {
    alias: {
      "@lib": libDir,
    },
  },
  plugins: [
    isDev && watchRebuildPlugin({ refresh: true }),
    isDev && makeEntryPointPlugin(),
  ],
  publicDir: resolve(rootDir, "public"),
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      formats: ["iife"],
      name: "InjectedScripts",
      fileName: "index",
    },
    outDir: resolve(rootDir, "..", "..", "dist", "injected"),
    sourcemap: isDev,
    minify: isProduction,
    reportCompressedSize: isProduction,
    modulePreload: true,
    rollupOptions: {
      external: ["chrome"],
    },
  },
  define: {
    "process.env.NODE_ENV": isDev ? `"development"` : `"production"`,
  },
});
