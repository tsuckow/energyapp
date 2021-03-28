import TsCheckerPlugin from "fork-ts-checker-webpack-plugin";
import { resolve } from "path";
import { Configuration } from "webpack";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
const PnpPlugin = require("pnp-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProductionBuild: boolean = process.env.NODE_ENV == "production";

const config: Configuration = {
  entry: {
    app: resolve(__dirname, "src/index.ts"),
  },
  mode: isProductionBuild ? "production" : "development",
  module: {
    rules: [
      {
        // If you're unfamiliar with Regex, this looks for .ts and optionally .tsx (react)
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              // If you're like me and keep your tsconfig bare,
              // you'll want to keep track of its location
              configFile: resolve(__dirname, "tsconfig.json"),
              // Skip type-checking, just convert to JavaScript, let FTCWPlugin handle it.
              transpileOnly: true,
            },
          },
        ],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  node: {
    // Relative to context of this file, rather than live resolution
    __dirname: true,
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "../dist/"),
  },
  plugins: [
    new TsCheckerPlugin({
      async: !isProductionBuild, // Only report after a run, freeing the process to work faster
      typescript: {
        build: true, // Build mode speeds up consequential builds (evertyhing after the first build, based on the prior build)
        configFile: resolve(__dirname, "tsconfig.json"),
        mode: "write-tsbuildinfo",
        profile: !isProductionBuild, // Don't slow down production by profiling, only in development do we need this information.
      },
    }),
    new HtmlWebpackPlugin({ title: "Energy" }),
  ],
  resolve: {
    // Tell Webpack what extensions we're looking for
    extensions: [".tsx", ".ts", ".js"],
    plugins: [PnpPlugin, new TsconfigPathsPlugin({})],
  },
  resolveLoader: {
    plugins: [PnpPlugin.moduleLoader(module)],
  },
  target: "async-node",
};

export default config;