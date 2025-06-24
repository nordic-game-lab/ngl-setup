// nglBuild.config.default.cjs

module.exports = {
  startup:  [
    "npm i",
    "npm run build",
    "npx ngl-setup run startup"
  ]
};
