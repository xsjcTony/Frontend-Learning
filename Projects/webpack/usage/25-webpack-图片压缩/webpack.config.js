const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

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
        test: /\.(png|jpe?g|gif)$/,
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
        test: /\.(htm|html)$/,
        loader: 'html-withimg-loader'
      },
      {
        test: /iconfont\.(eot|json|svg|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name][ext]'
          // publicPath: 'http://127.0.0.1/assets/'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env'
              ]
            ],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  absoluteRuntime: false,
                  corejs: 3,
                  helpers: true,
                  regenerator: true,
                  version: '^7.15.4'
                }
              ]
            ]
          }
        }
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
    }),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }]
        ]
      }
    })
  ],


  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  },


  devServer: {
    static: {
      directory: './bundle'
    },
    port: 9090,
    hot: 'only'
  }
}
