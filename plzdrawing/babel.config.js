module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      "react-native-reanimated/plugin",
      "babel-plugin-styled-components",
      [
        "module-resolver",
        {
          alias: {
            "@": ".",
          },
        },
      ],
    ],
  };
};
