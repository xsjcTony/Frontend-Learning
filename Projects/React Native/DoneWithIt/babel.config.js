module.exports = (api) => {
  api.cache(true)

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.js', '.ts', '.tsx', '.json', '.ios.tsx', '.android.tsx'],
          alias: {
            '@': './src',
            '@assets': './src/assets',
            '@screens': './src/screens',
            '@constants': './src/constants',
            '@components': './src/components'
          }
        }
      ]
    ]
  }
}
