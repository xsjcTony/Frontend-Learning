const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'js/bundle.js'
  },
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 默认8kb
          }
        },
        generator: {
          filename: 'images/[name][ext]'
          // publicPath: 'http://127.0.0.1/assets/'
        }
      },
      {
        test: /\.(eot|json|svg|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name][ext]'
          // publicPath: 'http://127.0.0.1/assets/'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: './doc', to: './doc' }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  }
}
