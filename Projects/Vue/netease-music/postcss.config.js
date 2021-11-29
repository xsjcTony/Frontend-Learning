module.exports = {
  plugins: {
    // 如果配置了该文件, 需要重新添加autoprefixer避免覆盖vue2默认配置
    autoprefixer: {},
    // 最多使用v5.1.1版本. 再高的依赖PostCSS 8, 而Vue2使用的是v7.x
    'postcss-pxtorem': {
      rootValue: 100, // 根元素 (<html>) 字体大小
      propList: ['*', '!*font-size*'] // 可以从 px 更改到 rem 的属性, 详见github => readme
    }
  }
}
