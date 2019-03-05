const path = require("path");

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [
            ['react-app', { flow: false, typescript: true }],
            "@emotion/babel-preset-css-prop"
          ]
        }
      }
    ]
  });
  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};
