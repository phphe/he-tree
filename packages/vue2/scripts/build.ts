// run npm run compile-build when you changed this file to generate build.js
import {
  belongsTo,
  report,
  resolveOutputName,
  resolveModuleName,
  resolveAllDependencies,
  resolveUMDDependencies,
} from "@rollup-use/core";
import * as rollup from "rollup";
import * as path from "path";
import babel from "@rollup/plugin-babel";
import node from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser"; // to minify bundle
// don't convert follow to imponst xx from 'xx'
const cjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const vue = require("rollup-plugin-vue");
const css = require("rollup-plugin-css-only");
const typescript = require("rollup-plugin-typescript2");
const replace = require("@rollup/plugin-replace");
// @ts-ignore
import pkg = require("../package.json");

// quick config
const input = "src/lib-entry.ts";
const outDir = "dist";
const outputName = resolveOutputName(pkg.name); // the built file name is outDir/outputName.format.js. You can modify it.
const moduleName = resolveModuleName(pkg.name); // for umd, amd. You can modify it.
const outputExports = "auto"; // You might get warning 'Mixing named and default exports'. https://rollupjs.org/guide/en/#outputexports
const external = [...resolveAllDependencies(pkg)];
const umdExternal = [...resolveUMDDependencies(pkg)]; // umd should bundle dependencies
const extractCssPath = path.join(outDir, `${outputName}.css`);
// for declaration files
const declarationDir = "types"; //
const umdReplace = {
  preventAssignment: true,
  values: { "process.env.NODE_ENV": JSON.stringify("production") },
}; // replace process.env.NODE_ENV in umd

const getBabelConfig = () => ({
  // .babelrc
  presets: [
    [
      "@vue/cli-plugin-babel/preset",
      {
        useBuiltIns: false,
        polyfills: [],
        targets: { browsers: "defaults" }, // default browsers, coverage 90%
      },
    ],
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    ["@babel/plugin-proposal-optional-chaining", { loose: false }],
  ],
  assumptions: {
    /**
     * When true, class properties are compiled to use an assignment expression instead of Object.defineProperty. Check: https://babeljs.io/docs/en/babel-plugin-proposal-class-properties#options
     * 当设置为 true 时，类属性将被编译为赋值表达式而不是 Object.defineProperty。参考: https://babel.docschina.org/docs/en/babel-plugin-proposal-class-properties/#%E9%80%89%E9%A1%B9
     */
    // "setPublicClassFields": true
  },
  // for rollup babel plugin
  babelHelpers: "runtime",
  exclude: [
    /@babel\/runtime/,
    /@babel\\runtime/,
    /regenerator-runtime/,
    /vue-runtime-helpers/,
    /tslib/,
  ],
  extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".vue", ".ts", ".tsx"],
  babelrc: false,
});

const esmBabelConfig = <any>getBabelConfig();

const cjsBabelConfig = <any>getBabelConfig();
cjsBabelConfig.plugins.push(["module-extension", { mjs: "js" }]); // replace .mjs to .js

const umdBabelConfig = <any>getBabelConfig();

export default <rollup.RollupOptions[]>[
  // esm
  {
    input,
    external: (source) => belongsTo(source, external),
    plugins: [
      vue({ css: false }),
      css({ output: extractCssPath }),
      node(),
      typescript({
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
            declarationDir,
          },
        },
      }),
      babel(esmBabelConfig),
      cjs(),
      json(),
    ],
    output: {
      dir: "./",
      entryFileNames: path.join(outDir, `${outputName}.esm.js`),
      format: "esm",
      banner: getBanner(pkg),
      sourcemap: false,
      exports: outputExports,
    },
  },
  // cjs
  {
    input,
    external: (source) => belongsTo(source, external),
    plugins: [
      vue({ css: false }),
      css({ output: false }),
      node(),
      typescript({
        tsconfigOverride: { compilerOptions: { declaration: false } },
      }),
      babel(cjsBabelConfig),
      cjs(),
      json(),
    ],
    output: {
      file: path.resolve(outDir, `${outputName}.cjs.js`),
      format: "cjs",
      banner: getBanner(pkg),
      sourcemap: false,
      exports: outputExports,
    },
  },
  // umd
  {
    input,
    external: (source) => belongsTo(source, umdExternal),
    plugins: [
      vue({ css: false }),
      css({ output: false }),
      node(),
      replace(umdReplace),
      typescript({
        tsconfigOverride: { compilerOptions: { declaration: false } },
      }),
      babel(umdBabelConfig),
      cjs(),
      json(),
    ],
    output: {
      file: path.resolve(outDir, `${outputName}.js`),
      format: "umd",
      banner: getBanner(pkg),
      sourcemap: false,
      name: moduleName,
      exports: outputExports,
    },
  },
  // umd min
  {
    input,
    external: (source) => belongsTo(source, umdExternal),
    plugins: [
      vue({ css: false }),
      css({ output: false }),
      node(),
      replace(umdReplace),
      typescript({
        tsconfigOverride: { compilerOptions: { declaration: false } },
      }),
      babel(umdBabelConfig),
      cjs(),
      json(),
      terser(), // to minify bundle
    ],
    output: {
      file: path.resolve(outDir, `${outputName}.min.js`),
      format: "umd",
      banner: getBanner(pkg),
      sourcemap: false,
      name: moduleName,
      exports: outputExports,
    },
  },
];

if (process.argv.includes("--report")) {
  report(outDir);
}

function getBanner(pkg: any) {
  return `
/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${pkg.author}
 * Homepage: ${pkg.homepage || null}
 * Released under the ${pkg.license} License.
 */`.trim();
}
