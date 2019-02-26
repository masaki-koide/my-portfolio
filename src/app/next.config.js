const withTypescript = require("@zeit/next-typescript");
const webpack = require("webpack");
const path = require("path");

const { parsed: localEnv } = require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env"
});

module.exports = withTypescript({
  distDir: "../../dist/functions/next",
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    config.resolve.alias = {
      ...config.resolve.alias,
      "~": path.resolve("src/app")
    };

    return config;
  }
});
