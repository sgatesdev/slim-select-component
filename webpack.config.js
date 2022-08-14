const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");

let config = {
     entry: {
          slimselect: "./src/index.ts",
          style: "./src/slimselect.scss",
          test: "./dev/test.ts",
     },
     plugins: [
          new HtmlWebpackPlugin({
               template: "./dev/main.html",
               inject: "head",
               hash: true,
          }),
          new MiniCssExtractPlugin({
               filename: "[name].css",
          }),
     ],
     resolve: {
          extensions: [".ts", ".js"],
     },
     module: {
          rules: [
               {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
               },
               {
                    test: /\.(sass|scss)$/,
                    use: [
                         MiniCssExtractPlugin.loader,
                         "css-loader",
                         "sass-loader", // compiles Sass to CSS, using Node Sass by default
                    ],
               },
          ],
     },
     resolve: {
          extensions: [".tsx", ".ts", ".js"],
     },
     output: {
          filename: "[name].js",
          path: path.resolve(__dirname, "dist"),
          clean: true,
          publicPath: "/",
     },
     devServer: {
          static: "./dist",
     },
};

module.exports = (env, argv) => {
     if (!argv.mode || argv.mode === "development") {
          config.devtool = "inline-source-map";
          config.mode = "development";
          config.optimization = {
               runtimeChunk: "single",
          };
     }

     if (argv.mode === "production") {
          delete config.entry.test;
          config.plugins.splice(0, 1);
          config.mode = "production";
          config.optimization = {
               minimize: true,
          };
     }

     return config;
};
