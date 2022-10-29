const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin')
const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const { base: { webTitle } } = require('../config');

const resolve = dir => {
  return path.join(process.cwd(), dir);
}

const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contentHash:4].css'
  }),
  new PurgecssPlugin({
    paths: glob.sync(`${resolve('src')}/**/*`, { nodir: true })
  }),
  new ForkTsCheckerWebpackPlugin({
    tsconfig: resolve('tsconfig.json')
  })
];

const config = ({ ENVIRONMENT }) => {
  const configObject = {
    mode: ENVIRONMENT,
    entry: {
      index: './src',
      // detail: './src/detail'
    },
    output: {
      filename: 'js/[name].[contentHash:4].js',
      path: resolve('dist')
    },
    resolve: {
      modules: [resolve('src'), "node_modules"],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json'],
      alias: {

      }
    },
    module: {
      noParse: /jquery|lodash/,
      rules: [
        {
          test: /\.js$/i,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.(ts|tsx)$/i,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        },
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.scss$/i,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.(jpe?g|png|bmp|gif|svg)$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[contentHash:4].[ext]',
                outputPath: 'images/',
                limit: 1024 * 4
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true,
                disable: true,
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                }
              }
            }
          ]
        },
        {
          test: /\.(svg|eot|ttf|woff2?)$/i,
          exclude: /node_modules/,
          loader: 'file-loader',
          options: {
            name: '[name].[contentHash:4].[ext]',
            outputPath: 'fonts/'
          }
        }
      ]
    }
  };

  configObject.plugins = makePlugins(configObject);

  return configObject;
};

const makePlugins = ({ entry }) => {
  Object.keys(entry).forEach(key => {
    plugins.push(new HtmlPlugin({
      title: webTitle,
      filename: `${key}.html`,
      template: './src/index.html',
      chunks: [
        `${key}`,
        `vendors~${key}`,
        'vendors~index~detail',
        'vendors~detail~index',
      ],
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }))
  })

  addDynamicLinkPlugin();

  return plugins;
};

const addDynamicLinkPlugin = () => {
  const files = fs.readdirSync(resolve('dll'));
  (files || []).forEach(file => {
    file.endsWith('.js') ?
      plugins.push(new AddAssetHtmlPlugin({
        filepath: resolve(`dll/${file}`)
      }))
      :
      plugins.push(new webpack.DllReferencePlugin({
        manifest: require(`../dll/${file}`)
      }));
  })
}

module.exports = env => config(env);