const ROOT_PATH = process.cwd();

const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const baseConfig = require(`${ROOT_PATH}/webpack.base.js`);

const config = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({
        filename: 'style.[contenthash].css'
      })
    ]
  }
};

module.exports = merge(baseConfig, config);
