module.exports = {
  plugins: {
    autoprefixer: {},
    /*
    'postcss-pxtorem': {
      rootValue: 100,
      propList: ['*', '!*transform*']
    },
    */
    'postcss-sprites': {
      spritePath: './bundle/images', // 输出目录, 必须要设置
      groupBy: (image) => { // 根据图片的上级目录分类
        const path = image.url.substring(0, image.url.lastIndexOf('/'))
        const name = path.substring(path.lastIndexOf('/') + 1) // "images/header/1.png" => "header"
        return Promise.resolve(name)
      },
      filterBy: (image) => { // 过滤图片
        if (!/\.png$/.test(image.url)) { // 不处理除了png之外的任何图片
          return Promise.reject()
        }
        return Promise.resolve()
      }
    }
  }
}
