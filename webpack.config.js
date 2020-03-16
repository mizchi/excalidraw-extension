const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    devtools: path.join(__dirname, "src/devtools"),
    panel: path.join(__dirname, "src/panel"),
    options: path.join(__dirname, "src/options"),
    background: path.join(__dirname, "src/background")
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true
          }
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json", ".mjs", ".wasm"]
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: "assets/*",
        flatten: true
      }
    ])
  ]
};
