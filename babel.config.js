module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      ["nativewind/babel"],   // Nativewind preset
    ],
    plugins: [
      // add other plugins here if needed, like babel-plugin-inline-import
    ],
  };
};
