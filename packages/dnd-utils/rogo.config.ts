import { getConfig, GetConfigOptions } from "rogo";

const options: GetConfigOptions = {
  name: "dndUtils",
  handleTypescript2Config(config) {
    if (!config.tsconfigOverride) {
      config.tsconfigOverride = {};
    }
    config.tsconfigOverride["exclude"] = ["test"];
    return config;
  },
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
