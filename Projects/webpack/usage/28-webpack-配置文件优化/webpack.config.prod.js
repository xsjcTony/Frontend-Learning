const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { merge } = require('webpack-merge')
const CommonConfig = require('./webpack.config.common')

const ProdConfig = {
  mode: 'production',

  devtool: 'cheap-module-source-map',

  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  }
}

module.exports = merge(CommonConfig, ProdConfig)
