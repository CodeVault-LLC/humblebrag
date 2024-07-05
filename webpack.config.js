const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    background: path.join(__dirname, "./src/background/background.ts"),
    content: path.join(__dirname, "./src/content/content.ts"),
    injected: path.join(__dirname, "./src/content/inject/injected.ts"),
  },
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "[name].js",
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks(chunk) {
        return chunk.name !== "background";
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.ts|.tsx$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devtool: false,
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "./static" }],
    }),
  ],
};
