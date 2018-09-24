const ROOT_PATH = process.cwd();

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const config = {
  entry: `${ROOT_PATH}/client/index.js`,
  output: {
    path: `${ROOT_PATH}/.dist`,
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  watch: devMode,
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),
    new CleanWebpackPlugin('.dist', {}),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      minify: true,
      template: './client/index.html',
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: [
          /node_modules/,
          './client/**/*.test.js',
          './client/**/*.test.js.snap',
          './client/**/*.config.js',
          './client/test-setup.js',
          './client/helpers/test/*'
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [{
          loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: true,
            localIdentName: '[local]___[hash:base64:5]'
          }
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;
