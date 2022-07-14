import { getConfig, GetConfigOptions } from "rogo";

const options: GetConfigOptions = {
  name: "treeUtils",
};

export default [
  getConfig({ ...options, format: "esm" }),
  getConfig({ ...options, format: "cjs" }),
  getConfig({
    ...options,
    format: "iife",
    minify: true,
    sourcemap: true,
    targets: "defaults", // include ie11
  }),
];
