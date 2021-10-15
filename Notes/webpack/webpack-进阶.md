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

## Resolve (解析)

[Resolve | webpack](https://webpack.js.org/configuration/resolve/)

定义

- 配置导入 `模块` 的解析规则

语法

- 在 `配置文件` 中添加 `resolve` 对象

```js
module.exports = {
  resolve: {
    // ...
  }
}
```

常用配置

- `alias` : 创建 `import` 或 `require` 的别名, 来确保模块的引入变得简单, 是一个 `对象`

    ```js
    /*
    如下设置让
    import 'bootstrapcss'
    等价于
    import 'bootstrap/dist/css/bootstrap.css'
    */
    
    alias: {
      bootstrapcss: 'bootstrap/dist/css/bootstrap.css'
    }
    ```

- `mainFields` : 修改 `模块` 入口的查找顺序, 简化导入代码, 是一个 `数组`

    - 从左到右到 `包` 的 `package.json` 文件中查找入口
    - 若都找不到则报错

    ```js
    mainFields: ['style', 'module', 'main']
    ```

- `extensions` : 指定导入 `模块` 的 `扩展名` 查找顺序, 是一个 `数组`

    - 从左到右根据 `扩展名` 来查找同名文件
    - 若都找不到则报错
    - 可以使用 `'...'` 访问默认拓展名

    ```js
    extensions: ['.css', '...'] // 先查找 .css , 找不到则按默认配置继续查找 (.js, .json, .node)
    ```

- `modules` : 指定查找范围, 是一个 `数组`

    - 从左到右根据 `路径` 来查找 `模块`
    - 若都找不到则报错

    ```js
    modules: [path.resolve(__dirname, 'src'), 'node_modules'] // 先找 ./src 下, 找不到再找 node_modules 中, 再找不到就报错
    ```

---

## noParse

[Module - noParse | webpack](https://webpack.js.org/configuration/module/#modulenoparse)

定义

- 告诉 `webpack` 哪些 `模块` 是独立的, 不需要去分析它的依赖关系
- 可以提升打包速度

语法

- 在 `配置文件` 的 `module` 中加上如下内容

```js
module.exports = {
  module: {
    noParse: /jquery/ // 模块名包含jquery的都不用分析依赖关系
  }
}
```

---

## IgnorePlugin

[IgnorePlugin | webpack](https://webpack.js.org/plugins/ignore-plugin/)

定义

- 使用 `import` 或 `require` 时忽略掉指定的目录下的 `模块`
- 自带插件, 不需要额外安装

引入插件

- 插件属于 `webpack` 自带, 因此引入 `webpack` 即可

```js
const Webpack = require('webpack')
```

配置

- 在 `配置文件` 的 `plugins` 中创建并加入
- 可以使用 `正则表达式`

```js
plugins: [
  new Webpack.IgnorePlugin({
    resourceRegExp: /^\.\/locale$/, // 被忽略掉的目录
    contextRegExp: /moment$/ // 包的名称
  })
]
```

---

## Externals (外部扩展)

[Externals | webpack](https://webpack.js.org/configuration/externals/)

定义

- 将不会发生变化的第三方 `模块` 设置为 `外部扩展`
- 避免将这些内容打包到项目中, 提升打包速度
- <span style="color: #f40">不符合前端 `模块化` 思想, 建议使用 `dll` 方式</span>

用法

1. 手动全局引入需要设置为 `外部扩展` 的第三方 `模块`

    ```html
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.js"></script>
    ```

2. 在 `配置文件` 中配置

    ```js
    modules.export = {
      externals: {
        jquery: '$' // 键的意思是匹配 import 中的库, 告诉webpack是第三方库, 值的意思是从全局去寻找变量, 而不是node_modules
      }
    }
    ```

---

## dll (动态链接库)



定义

- 全称为 `dynamic link libiary`

- 防止重复打包不会发生变化的第三方 `模块`

优势

- 不用手动引用
- 所有第三方 `模块` 只会被打包一次

使用方法

1. 新定义一个 `配置文件` , 将需要打包的第三方 `模块` 打包一次

    ```js
    // webpack.config.dll.js
    const path = require('path')
    
    module.exports = {
      mode: 'production',
      entry: {
        vendors: ['jquery', 'lodash']
      },
      output: {
        path: path.resolve(__dirname, 'dll'),
        filename: '[name].dll.js',
        library: '[name]'
      }
    }
    ```

2. 使用 `add-asset-html-webpack-plugin` 插件将指定的文件插入到 `html` 中 [add-asset-html-webpack-plugin - npm](https://www.npmjs.com/package/add-asset-html-webpack-plugin)

    - 该插件基于 `html-webpack-plugin`

    - 引入插件

        ```js
        const HtmlWebpackPlugin = require('html-webpack-plugin')
        const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
        ```

    - 在 `配置文件` 的 `plugins` 中加入如下内容

        ```js
        // webpack.config.js
        plugins: [
          new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, 'dll/vendors.dll.js'), // 需要引入的文件
            publicPath: '' // 不设置的话引入的路径会多出 "auto/"
          })
        ]
        ```

3. 使用 `DllPlugin` 插件生成 `manifest.json` 文件, 用来给 `DllReferencePlugin` 识别 [DllPlugin | webpack](https://webpack.js.org/plugins/dll-plugin/)

    ```js
    // webpack.config.dll.js
    const path = require('path')
    
    module.exports = {
      plugins: [
        new Webpack.DllPlugin({
          name: '[name]',
          path: path.resolve(__dirname, 'dll/[name].manifest.json')
        })
      ]
    }
    ```

4. 使用 `DllReferencePlugin` 插件识别 `manifest.json` 文件, 在打包的时候跳过文件中已经打包好的第三方 `模块` [DllReferencePlugin | webpack](https://webpack.js.org/plugins/dll-plugin/#dllreferenceplugin)

    ```js
    // webpack.config.js
    const Webpack = require('webpack')
    
    plugins: [
      new Webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, 'dll/vendors.manifest.json') // manifest.json 的文件的绝对路径
      })
    ]
    ```

缺陷

- 上述写法并不通用
- 也没有分别打包每个第三方 `模块`

优化

- 在 `dll` 的 `配置文件` 中, 为每个第三方 `模块` 分别指定一个入口

    ```js
    // webpack.config.dll.js
    
    entry: {
      jquery: 'jquery',
      lodash: 'lodash'
    }
    ```

- 在 `配置文件` 中, 将 `plugins` 提取出来, 并将 `add-asset-html-webpack-plugin` 和 `DllReferencePlugin` 暂时删除

    ```js
    // webpack.config.js
    
    // imports
    plugins = [
      // plugins
    ]
    
    module.exports = {
      // ...
      plugins: plugins,
      // ...
    }
    ```

- 遍历存放 `dll` 打包完毕的文件夹, 根据 `.js` 和 `.json` 文件分别动态的添加插件即可

    ```js
    // webpack.config.js
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
    ```

---

## HappyPack

[happypack - npm](https://www.npmjs.com/package/happypack)

定义

- 实现多线程打包
- 充分发挥多核 `CPU` 的威力

安装

```shell
npm i -D happypack
```

使用

- 在 `配置文件` 中创建插件并加入 `plugins` 中

- 当中放上对应的 `id` 以及以前处理 `JavaScript` 文件的 `rules`

    ```js
    const HappyPack = require('happypack')
    
    const plugins = [
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
    
    
    ```

- 在 `配置文件` 中的 `rules` 中删除以前处理 `JavaScript` 文件的方法并改为如下

    ```js
    const HappyPack = require('happypack')
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: 'happypack/loader?id=js'
          }
        ]
      }
    }
    ```

---

## 打包多页应用

步骤

1. 有多少个页面就在 `配置文件` 的 `entry` 中指定多少个入口, 给不同入口指定不同名称
2. 在 `配置文件` 中的 `plugins` 中有多少个页面就创建多少个 `HtmlWebpackPlugin` , 并通过 `filename` 属性给不同的页面配置不同的名称
3. 在 `HtmlWebpackPlugin` 中通过 `chunks` 属性告知需要插入到当前界面的资源文件 ( `JavaScript` , `css` 等)
4. 通过遍历 `entry` 来动态实现步骤 `2~3`

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: {
    index: './src/js/index.js',
    detail: './src/js/detail.js',
    account: './src/js/account.js'
  }
  
  // ...
}

config.plugins = makePlugins(config)

function makePlugins (config) {
  const plugins = [
    // ...
  ]

  const entries = Object.keys(config.entry)
  entries.forEach((entry) => {
    plugins.push(new HtmlWebpackPlugin({
      template: `./src/index.html`,
      filename: `${entry}.html`,
      chunks: [entry]
    }))
  })
  
  // ...

  return plugins
}


module.exports = config
```

---

## Webpack Bundle Analyzer

[webpack-bundle-analyzer - npm](https://www.npmjs.com/package/webpack-bundle-analyzer)

定义

- 可视化打包优化插件
- 将打包的结果以 `GUI` 的形式展示

安装

```shell
npm i -D webpack-bundle-analyzer
```

用法

- 引入

    ```js
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
    ```

- 在 `配置文件` 中的 `plugins` 中创建并添加

    ```js
    plugins: [
      // ...
      new BundleAnalyzerPlugin()
    ]
    ```



