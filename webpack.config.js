const {addTailwindPlugin} = require("@ngneat/tailwind");
const tailwindConfig = require("./apps/get-a-car/src/tailwind.config.js");

module.exports = (config) => {
  addTailwindPlugin({
    webpackConfig: config,
    tailwindConfig,
    patchComponentsStyles: true
  });
  return config;
};
