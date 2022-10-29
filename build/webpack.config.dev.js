const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.config.base');
const { dev: { host, port } } = require('../config');

module.exports = env => merge(baseConfig(env), {
  devServer: {
    contentBase: path.join(process.cwd(), 'dist'),
    host,
    port,
    overlay: true
  },
  optimization: {
    usedExports: true
  },
  devtool: 'cheap-module-eval-source-map'
})