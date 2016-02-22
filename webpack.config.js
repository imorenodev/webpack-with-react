const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, "app"),
  build: path.join(__dirname, "build")
};

const common = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: "bundle.js"
  }
};

//Default configuration
if (TARGET === "start" || !TARGET) {
  module.exports = merge(common, {
    devServer: {
      contentBase: PATHS.build,

      //Enable history API fallback so HTML5 History API-base routing works for default
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      //Display only errors, to reduce amount of output
      stats: "errors-only",

      //Parse host and port from env so this is easy to customize
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}
if (TARGET === "build") {
  module.exports = merge(common, {});
}
