const { merge } = require('webpack-merge')
const CommonConfig = require('./webpack.config.common')

const DevConfig = {
  mode: 'development',

  devtool: 'eval-cheap-module-source-map',

  devServer: {
    'static': {
      directory: './bundle'
    },
    port: 9090,
    hot: 'only'
  },

  optimization: {
    usedExports: true
  }
}

module.exports = merge(CommonConfig, DevConfig)
