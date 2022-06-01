const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/main.js",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Library App",
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ca]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, 
          "css-loader", 
          "sass-loader"
        ],
      },
      {
        test: /\.(?:png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      }
    ],
  },
};