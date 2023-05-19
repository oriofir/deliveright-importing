const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/index.js", // Update with your entry file path
  output: {
    path: path.resolve(__dirname, "dist"), // Update with your output directory path
    filename: "bundle.js", // Update with your output file name
  },
  target: "node",
  externals: [nodeExternals()],
  // Other configuration options...
};
