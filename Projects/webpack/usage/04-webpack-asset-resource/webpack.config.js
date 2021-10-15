const path = require('path')

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'bundle.js'
  },
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
          // publicPath: 'http://127.0.0.1/assets/'
        }
      }
    ]
  }
}
