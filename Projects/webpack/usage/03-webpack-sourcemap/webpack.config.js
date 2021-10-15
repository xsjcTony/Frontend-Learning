const path = require('path')

module.exports =  {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'bundle.js'
  },
  // devtool: 'eval-cheap-module-source-map'
  devtool: 'cheap-module-source-map'
}
