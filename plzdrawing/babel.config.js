module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            "@": ".",
          },
        },
      ],
      // "nativewind/babel", // 일시적으로 비활성화
    ],
  };
};
