const fs = require("fs");

let vue3 = process.argv.slice(2)[0] === "3";
let code = vue3
  ? `export { default } from "@virtual-list/vue"`
  : `export { default } from "@virtual-list/vue/vue2"`;
fs.writeFileSync("./src/virtual-list.ts", code);
