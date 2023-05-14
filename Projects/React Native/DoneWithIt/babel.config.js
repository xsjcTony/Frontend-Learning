module.exports = (api) => {
  api.cache(true)

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@assets': './src/assets',
            '@screens': './src/screens',
            '@constants': './src/constants'
          }
        }
      ]
    ]
  }
}
