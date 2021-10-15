const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const Webpack = require('webpack')
const fs = require('fs')
const HappyPack = require('happypack')

const config = {
  entry: {
    index: './src/js/index.js',
    detail: './src/js/detail.js',
    account: './src/js/account.js'
  },


  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'js/[name].[contenthash:8].js'
  },


  module: {
    noParse: /jquery/,
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
          filename: 'images/[name].[contenthash:8][ext]'
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
          filename: 'font/[name].[contenthash:8][ext]'
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
        use: 'happypack/loader?id=js'
      }
    ]
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        'default': {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}

config.plugins = makePlugins(config)

function makePlugins (config) {
  const plugins = [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: './doc', to: './doc' }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
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
    }),
    new Webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new HappyPack({
      id: 'js',
      use: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
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
      ]
    })
  ]

  const entries = Object.keys(config.entry)
  entries.forEach((entry) => {
    plugins.push(new HtmlWebpackPlugin({
      template: `./src/index.html`,
      filename: `${entry}.html`,
      chunks: [entry]
    }))
  })

  const files = fs.readdirSync(path.resolve(__dirname, 'dll'))
  files.forEach((file) => {
    if (file.endsWith('.js')) {
      plugins.push(new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, 'dll', file),
        publicPath: ''
      }))
    } else if (file.endsWith('.json')) {
      plugins.push(new Webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, 'dll', file)
      }))
    }
  })

  return plugins
}


module.exports = config
