const path = require("path")

// Setup Import Alias
exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  const output = getConfig().output || {}

  actions.setWebpackConfig({
    output,
    resolve: {
      alias: {
        components: path.resolve(__dirname, "src/components"),
        styles: path.resolve(__dirname, "src/assets/scss"),
        img: path.resolve(__dirname, "src/assets/img"),
        contexts: path.resolve(__dirname, "src/contexts"),
        functions: path.resolve(__dirname, "src/functions"),
      },
    },
  })
}
