const path = require('path')

module.exports = {
  devtool: false,
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'bundle')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [path.resolve(__dirname, 'loader/style-loader.js'), path.resolve(__dirname, 'loader/less-loader.js')]
      }
    ]
  }
}
