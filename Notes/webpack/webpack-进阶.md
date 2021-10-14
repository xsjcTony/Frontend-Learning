# webpack - 进阶 (Advanced)



## Tree Shaking (过滤代码)

定义

- 过滤无用的 `JavaScript` 代码和 `css` 代码

示例

- 比如在 `a.js` 中引入了 `b.js` 模块, `b.js` 模块中有2个方法, 但是 `a.js` 中只要到了一个
- 默认情况下会将 `b.js` 模块中的所有代码都打包到 `a.js` 中
- 使用 `Tree-Shaking` 可以只将用到的方法打包到 `a.js` 中



### 副作用 (Side Effect)

- 指除了导出的东西之外还做了其他特殊事情的代码

- 没有 `副作用` 的文件可以在 `package.json` 中的 `sideEffects` 属性中添加

- `css` 类文件一定要添加, 防止 `import` 之后没有在 `JavaScript` 文件中被使用而被过滤掉, 可以使用 `glob`

    ```json
    // package.json
    {
      "sideEffects": ["*.css", "*.less", "*.scss"]
    }
    ```



### `JavaScript` 过滤

- 开发模式
    - 给 `配置文件` 添加设置

        ```js
        module.exports = {
          optimization: {
            usedExports: true
          }
        }
        ```
        
    - 开发模式中是用 `注释` 的方式在打包好的文件中告知你这个应该被过滤, 为了方便调试并没有真的删掉, 但是在上线模式中会删除

- 上线模式
    - 会自动过滤, 无需额外配置



### `css` 过滤

[PurgeCSS - Remove unused CSS](https://purgecss.com/)

[Webpack | PurgeCSS](https://purgecss.com/plugins/webpack.html)

安装

- 插件本体

```shell
npm i -D purgecss-webpack-plugin
```

- `glob` 依赖

```shell
npm i -D glob-all
```

- 在 `配置文件` 中的 `plugins` 中创建并添加

```js
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path')

module.exports = {
  plugins: [
    new PurgecssPlugin({
      paths: glob.sync(
        [
          path.join(__dirname, 'src/*.html'),
          path.join(__dirname, 'src/js/*.js')
        ],
        { nodir: true } // 忽略目录, 只过滤文件, 防止插件因过滤目录而出错
      ),
    })
  ]
}
```

---

## Code Splitting (代码分离)

定义

- 默认情况下打包会将所有模块都打包到一个文件, 比如 `bundle.js` 中, 这样这个文件就会很大
- 一旦其中一个模块被修改, 那么会生成一个新的 `bundle.js` , 这样用户需要重新下载这个很大的文件
- 代码分离可以将不经常修改的内容打包到另一个文件中, 这样修改之后用户只需要下载修改后的文件
- 没有被修改的文件由于缓存的原因不需要重新下载, 这样就提升了性能, 避免资源浪费

用法

- 在 `配置文件` 中加入如下代码

```js
module.exports = {
  optimization: {
    splitChunks: { // webpack自带插件,无需额外安装
      chunks: 'all'
    }
  }
}
```

注意点

- 如果使用了 `动态加载模块` , 则不需要上述设置也能分离



### Dynamic Import (动态 / 异步加载模块)

[Code Splitting - Dynamic Imports | webpack](https://webpack.js.org/guides/code-splitting/#dynamic-imports)

定义

- 默认情况下为 `同步加载` , 即如果 `index.js` 导入了10个 `模块` , 那么只要他被执行, 就会一次性加载10个 `模块`
- 异步加载是比如在 `index.js` 中导入了10个 `模块` , 那么哪怕他被执行, 也要看是否满足加载条件才会去加载 `模块`
- 使用该技巧不需要配置 `代码分离` 也会自动分割代码

语法 

- 一开始不要 `import` , 在使用时才 `import`

```js
// index.js
// 异步加载模块代码

const btn = document.querySelector('button')
btn.onclick = function () {
  getComponent().then((div) => { // 接收 async 函数返回的 Promise
    document.body.appendChild(div.get(0)) // 正常使用
  })
}

// 写法一
/*
function getComponent () {
  return import('jquery').then(({ 'default': $ }) => $('<div>我是div</div>'))
}
*/

// 写法二 (推荐)
async function getComponent () {
  const { 'default': $ } = await import('jquery') // 通过解构赋值获取 module.default, 并使用 await 等待结果
  return $('<div>我是div</div>') // 正常使用
}
```



### Prefetching

[Code Splitting - Prefetching | webpack](https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules)

定义

- 浏览器处于 `idle` (空闲) 的时候自动加载 `模块`
- 基于 `动态加载模块`

语法

- `import` 的 `()` 中加上魔法注释即可
- `/* webpackPrefetch: true */` 意为 `prefetch`
- `/* webpackChunkName: 'name' */` 可以指定分离出来的 `模块` 的名称

```js
const { 'default': $ } = await import(/* webpackPrefetch: true *//* webpackChunkName: 'jquery' */ 'jquery')
```

---

## 缓存 (Cache)

定义

- 浏览器会自动缓存网页上的资源, 但如果被修改之后的文件的名称没有发生变化, 那么就不会去加载修改之后的资源
- 为了解决这个问题, 在打包的时候需要给文件名称加上 `hash` 值, 一般使用 `contenthash`

`hash` 种类

- `hash` : 根据整个项目生成, 每次打包都不一样, 不推荐
- `chunkhash` : 根据依赖的文件生成, 是以前使用的技术, 不推荐
- `contenthash` : 根据当前文件的内容生成, 只要文件内容发生变化, 那么生成的值就会变化, <span style="color: #ff0;">推荐</span>

语法

- 给打包之后的所有文件都加上 `[contenthash]`
- 可以使用 `[contenthash:x]` 来指定该值为 `x` 位长度

```js
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/js/index.js',

  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'js/[name].[contenthash:8].js'
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset',
        generator: {
          filename: 'images/[name].[contenthash:8][ext]'
        }
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    })
  ]
}
```

---

## Split-Chunks-Plugin

[SplitChunksPlugin | webpack](https://webpack.js.org/plugins/split-chunks-plugin/)

定义

- `代码分离` 的底层实现原理
- 自带插件, 不需要额外安装

相关配置

- `chunks` : 对哪种模块进行代码分割
    - `async` : (默认) 只分割异步导入模块, 这也就是为什么 `异步加载模块` 时不需要设置也会自动分割
    - `all` : 分割所有导入的模块
- `minSize` : 生成一个新 `chunk` 的最小体积 (单位为 `Byte` )
    - 默认值为 `20000`
- `minChunks` : 指定 `模块` 被引入多少次才进行分割
    - 默认值为 `1`
- `maxAsyncRequests` : 异步加载 `模块` 时的最大同时加载数
    - 默认值为 `30`
- `maxInitialRequests` : 初始化加载 `模块` 时的最大同时加载数
    - 默认值为 `30`
- `automaticNameDelimiter` : 文件生成名称的分隔符
    - 默认值为 `~`
- `cacheGroups` : 缓存组, 将当前文件中导入的所有模块缓存起来统一处理, 可以继承 / 覆盖来自配置中的任何选项
    - `test` : 控制次 `缓存组` 选择的模块, 可以是正则表达式或是其他
        - 不能给 `default` 组使用
    - `priority` : 优先级, 一个 `模块` 可以属于多个 `缓存组` , 那么会选取优先级高的 `缓存组` 归类处理
        - `default` 组默认为 `20`
        - 自定义组默认为 `0`
    - `reuseExistingChunk` : 是否复用已经分割的 `chunk`
        - 默认值为 `true`

---

## Provide-Plugin

[ProvidePlugin | webpack](https://webpack.js.org/plugins/provide-plugin/)

定义

- 自动加载常用 `模块` , 而不必导出 `import` 或 `require`
- 自带插件, 不需要额外安装

引入插件

- 插件属于 `webpack` 自带, 因此引入 `webpack` 即可

```js
const Webpack = require('webpack')
```

配置

- 在 `配置文件` 的 `plugins` 中创建并加入

```js
plugins: [
  new Webpack.ProvidePlugin({
    $: 'jquery' // 格式为 identifier: 'module'
  })
]
```

---

