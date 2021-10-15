const path = require('path')
const Webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',

  entry: {
    jquery: 'jquery',
    lodash: 'lodash'
  },

  output: {
    path: path.resolve(__dirname, 'dll'),
    filename: '[name].dll.js',
    library: '[name]'
  },

  plugins: [
    new Webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, 'dll/[name].manifest.json')
    })
  ],

  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ]
  }
}
