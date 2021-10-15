const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { merge } = require('webpack-merge')
const CommonConfig = require('./webpack.config.common')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path')

const ProdConfig = {
  mode: 'production',

  devtool: 'cheap-module-source-map',

  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  },

  plugins: [
    new PurgecssPlugin({
      paths: glob.sync(
        [
          path.join(__dirname, 'src/*.html'),
          path.join(__dirname, 'src/js/*.js')
        ],
        { nodir: true }
      ),
    })
  ]
}

module.exports = merge(CommonConfig, ProdConfig)
