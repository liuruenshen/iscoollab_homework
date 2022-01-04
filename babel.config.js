/* eslint no-undef: "off" */

module.exports = function (api) {
  api.cache(true)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          modules: 'commonjs',
        },
      ],
    ],
    plugins: [
    ],
  }
}
