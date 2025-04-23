module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            utils: "./utils",
            src: "./src",
            navigation: "./navigation",
            hooks: "./hooks",
            components: "./components",
            assets: "./assets",
            constants: "./constants",
            configs: "./configs",
            styles: "./styles",
            i18n: "./i18n",
          },
        },
      ],
      ["react-native-reanimated/plugin"],
      ["@babel/plugin-proposal-decorators", { legacy: true }],
    ],
  };
};
