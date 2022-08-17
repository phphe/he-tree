function readPackage(pkg, context) {
  // Override the manifest of foo@1.x after downloading it from the registry
  if (pkg.name === "vue-template-compiler") {
    pkg.dependencies = {
      ...pkg.dependencies,
      vue: pkg.version,
    };
    console.log("Force set dependence vue for vue-template-compiler.\n");
  }
  if (pkg.name === "cz-lerna-changelog") {
    pkg.dependencies = {
      ...pkg.dependencies,
      "@lerna/project": "latest",
    };
  }

  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
