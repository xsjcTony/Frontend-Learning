const path = require('path')

module.exports = {
  devtool: false,
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'js/index.js',
    path: path.resolve(__dirname, 'bundle')
  }
}
