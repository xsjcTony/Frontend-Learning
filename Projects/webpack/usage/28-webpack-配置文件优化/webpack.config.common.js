const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',


  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'js/bundle.js'
  },


  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 1024 // 1kb, 不设置默认为8kb
          }
        },
        generator: {
          filename: 'images/[name][ext]'
          // publicPath: 'http://127.0.0.1:9090/images/'
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
          // publicPath: 'http://127.0.0.1:9090/font/'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
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
          ['optipng', { optimizationLevel: 7 }]
        ]
      }
    }),
    new ESLintPlugin({
      extensions: ['js', 'ts'],
      context: './',
      exclude: 'node_modules',
      files: 'src',
      fix: true
    })
  ]
}
