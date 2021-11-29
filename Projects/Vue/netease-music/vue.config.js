const { JSDOM } = require('jsdom')

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          // 最多使用v1.3.2版本, 再高会报错
          test: /\.html$/i,
          exclude: /node_modeules/,
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }
      ]
    }
  },

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/recommend',
        '/artists',
        '/ranking',
        '/search',
        '/account',
        '/listDetail'
      ],

      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
      postProcess: (route) => {
        const regExp = /<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">/gi
        const res = route.html.match(regExp)
        route.html = route.html.replace(res[0], '')

        const html = new JSDOM(route.html)
        const document = html.window.document
        const loadingElement = document.querySelector('.container')
        loadingElement.remove()

        route.html = html.serialize()
        return route
      }
    }
  }
}
