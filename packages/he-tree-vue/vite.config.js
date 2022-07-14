import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
export const pkg = require("./package.json");

// ============================ config area ============================
export const name = "heTreeVue"; // for umd, iife
export const banner = `
/*!
 * ${pkg.name} v${pkg.version}
 * Author: ${pkg.author}
 * Homepage: ${pkg.homepage || null}
 * Released under the ${pkg.license} License.
 */`.trim();
/**
 * globals are externals for iife format
 */
export const globals = {
  vue: "Vue",
  "vue-demi": "VueDemi",
};
// ============================ config area end ============================

// https://vitejs.dev/config/
export const isIIFE = detectIIFE();
export const formats = !isIIFE ? ["es", "cjs"] : ["iife"];
export default defineConfig({
  plugins: [
    vue(),
    !isIIFE &&
      dts({
        outputDir: "types",
        staticImport: true,
        insertTypesEntry: true,
        logDiagnostics: true,
      }),
  ],
  optimizeDeps: {
    exclude: ["vue-demi"],
  },
  build: {
    outDir: "dist/v3",
    sourcemap: isIIFE,
    emptyOutDir: !isIIFE,
    lib: {
      entry: "src/index.ts",
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

export const esmExternals = [
  ...Object.keys(pkg["dependencies"] || {}),
  ...Object.keys(pkg["peerDependencies"] || {}),
];
export const iifeExternals = [
  ...Object.keys(globals),
  ...Object.keys(pkg["peerDependencies"] || {}),
];

export function externalFunction(id) {
  id = id.replace(/\\/g, "/");
  const externals = isIIFE ? iifeExternals : esmExternals;
  for (const name of externals) {
    if (id.startsWith(name)) {
      return true;
    }
  }
  return false;
}

function detectIIFE() {
  let index = process.argv.indexOf("--");
  if (index > -1 && process.argv.indexOf("--iife", index + 1) > -1) {
    return true;
  }
  return false;
}
