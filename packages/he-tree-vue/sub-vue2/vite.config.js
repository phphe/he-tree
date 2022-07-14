import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";

import {
  pkg,
  banner,
  externalFunction,
  globals,
  name,
  isIIFE,
  formats,
} from "../vite.config.js";

export default defineConfig({
  plugins: [createVuePlugin()],
  optimizeDeps: {
    exclude: ["vue-demi"],
  },
  build: {
    outDir: "../dist/v2",
    sourcemap: isIIFE,
    emptyOutDir: !isIIFE,
    lib: {
      entry: "../src/index.ts",
      name,
      fileName: "index",
      formats,
    },
    rollupOptions: {
      external: externalFunction,
      output: {
        banner,
        exports: "auto",
        globals,
      },
    },
  },
});
