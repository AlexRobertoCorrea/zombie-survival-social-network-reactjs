const ROOT_PATH = process.cwd();

const config = {
  mode: 'development',
  entry: `${ROOT_PATH}/client/index.js`,
  output: {
    path: `${ROOT_PATH}/.tmp`,
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: "[local]___[hash:base64:5]"
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;
