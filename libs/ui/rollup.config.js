const nrwlConfig = require('@nrwl/react/plugins/bundle-rollup');
const { default: sourcemaps } = require('rollup-plugin-sourcemaps');

module.exports = (config) => {
  nrwlConfig(config);
  return {
    ...config,
    plugins: [...config.plugins],
  };
};
