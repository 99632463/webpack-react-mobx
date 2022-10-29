const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const baseConfig = require('./webpack.config.base');

module.exports = env => merge(baseConfig(env), {
  optimization: {
    minimize: true,
    minimizer:[
      new TerserPlugin(),
      new OptimizeCssAssetsPlugin()
    ],  
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    // new BundleAnalyzerPlugin()
  ],
  devtool: 'cheap-module-source-map'
})