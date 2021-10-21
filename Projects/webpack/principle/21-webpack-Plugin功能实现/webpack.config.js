const path = require('path')
const CleanWebpackPlugin = require('./plugin/clean-webpack-plugin')

module.exports = {
  devtool: false,
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'bundle')
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
