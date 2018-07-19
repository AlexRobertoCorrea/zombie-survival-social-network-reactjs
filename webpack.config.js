const ROOT_PATH = process.cwd();

const config = {
  entry: `${ROOT_PATH}/client/App.js`,
  output: {
    path: `${ROOT_PATH}/.tmp`,
    filename: 'bundle.js'
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};

module.exports = config;
