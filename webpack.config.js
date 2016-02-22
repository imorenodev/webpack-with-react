const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const NpmInstallPlugin = require("npm-install-webpack-plugin");
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
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app
      }
    ]
  }
};

//Default configuration
if (TARGET === "start" || !TARGET) {
  module.exports = merge(common, {
    devtool: "eval-source-map",
    devServer: {
      contentBase: PATHS.build,

      //Enable history API fallback so HTML5 History API-base routing works for default
      historyApiFallback: true,
      //using --hot AND HotModuleReplacementPlugin breaks the feature...
      //hot: true
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
