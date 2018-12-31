const path = require("path");

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          presets: ["@emotion/babel-preset-css-prop"]
        }
      },
      {
        loader: require.resolve("awesome-typescript-loader")
      }
    ]
  });
  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};
