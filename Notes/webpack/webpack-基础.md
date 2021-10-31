# webpack - 基础 (Basic)



> [webpack](https://webpack.js.org/)
>
> [webpack 中文文档](https://webpack.docschina.org/)



## 定义

- 一套基于 `NodeJS` 的 `模块打包工具`
- 不仅能够打包 `JavaScript` 模块, 还可以打包 `css` / `less` / `sass` / `图片` 等其他文件

---

## 安装

[Installation | webpack](https://webpack.js.org/guides/installation/)

```
npm init -y
npm install --save-dev webpack
npm install --save-dev webpack-cli
```

---

## 基本使用

打包JavaScript文件

- 想要打包 `JavaScript` 文件, 先要将其转换成 `模块` , 即通过 `NodeJS` 的 `exports` / `require` 方式编写文件
- 打包命令为 `npx webpack` , 没有配置文件的话需要追加写上需要打包的文件的名称 `xxx.js`
- 打包之后的文件没有配置文件的话默认会放到 `dist` 目录中, 名称叫做 `main.js`

保存打包指令

- 在 `package.json` 中, 通过 `scripts` 来保存指令

    ```json
    "scripts": {
      "test": "npx webpack"
    },
    ```

---

## 配置文件

[Configuration | webpack](https://webpack.js.org/configuration/)

文件格式

- 配置文件需要手动创建, 名称为 `webpack.config.js`
    - 如果硬要更改的话可以在指令中通过 `--config xxx` 使用指定的配置文件 [Use a different configuration file | webpack](https://webpack.js.org/configuration/#use-a-different-configuration-file)
- 固定格式为 `module.exports = {}` , 配置选项全部放到该 `对象` 中

选项

- `mode` : 打包模式 [Mode | webpack](https://webpack.js.org/configuration/mode/)
    - `development` : 开发模式, 不会对打包的 `JavaScript` 代码进行压缩
    - `production` : 上线 (生产) 模式, 会对打包的 `JavaScript` 代码进行压缩
- `entry` : 指定需要打包的文件 (应用程序入口起点) [Entry | webpack](https://webpack.js.org/configuration/entry-context/#entry)
    - `path/to/file` : 需要打包的文件的路径, 必须是一个路径
- `output` : 指定打包之后的文件输出选项 [Output | webpack](https://webpack.js.org/configuration/output/)
    - `path` : 打包之后的文件路径
    - `filename` : 打包之后的文件名称
- `devtool` : `source map` 相关选项, 详见相关笔记 [Devtool | webpack](https://webpack.js.org/configuration/devtool/)
- `module` : 决定如何处理项目中不同类型的 `模块` [Module | webpack](https://webpack.js.org/configuration/module/)
    - `rules` : 创建模块时, 匹配请求的规则数组, 这些规则能够修改 `模块` 的创建方式, 对 `模块` 应用 `loader` , 或者修改 `parser` [Module - rules | webpack](https://webpack.js.org/configuration/module/#modulerules)
        - `test` : 引入所有通过 `test` 的模块
        - `type` : 设置类型用于匹配模块
- `plugins` : 以各种插件自定义 `webpack` 的构建过程, 是一个 `数组` [Plugins | webpack](https://webpack.js.org/configuration/plugins/)
    - `webpack` 自带一些插件: [Plugins | webpack](https://webpack.js.org/plugins/)
- `optimization` : 自定义配置优化项, 可以覆盖当前 `mode` 的默认选项 [Optimization | webpack](https://webpack.js.org/configuration/optimization/)
- `watch` : 监听打包文件的变化, 文件修改后会自动重新编译打包 [Watch | webpack](https://webpack.js.org/configuration/watch/)
- `watchOptions` : 用于定制 `watch` 模式的选项 [WatchOptions | webpack](https://webpack.js.org/configuration/watch/#watchoptions)

---

## Source Map

[An Introduction to Source Maps | Treehouse Blog](https://blog.teamtreehouse.com/introduction-source-maps)

定义

- 用于存储打包之后的代码和打包之前的代码的映射关系
- 可以方便打包之后的调试

使用方法

- 在 `配置文件` 中加上 `devtool` , 具体配置见下文

`devtool` 配置 [Devtool | webpack](https://webpack.js.org/configuration/devtool/)

- `eval` 开头
    - 不会单独生成 `source map` 文件
    - 会将关系存储到打包的文件中
    - 通过 `eval` 存储
    - <span style="color: #0f0;">优势: 性能好</span>
    - <span style="color: #f40;">缺点: 业务逻辑复杂时, 信息提示可能不全面不正确</span>
    - <span style="color: #ff0">企业开发: 不推荐, 因为映射信息存储到打包好的文件中, 所以体积大, 不利于传输</span>
- `inline` 开头
    - 不会会单独生成 `source map` 文件
    - 会将关系存储到打包的文件中
    - 通过 `base64字符串` 的形式存储
- `source-map` 结尾
    - 会单独生成 `source map` 文件
    - 会将关系存储到新建的 `source map` 文件中
    - <span style="color: #0f0;">优势: 信息全面, 可以直接定位到错误代码的行和列</span>
    - <span style="color: #f40;">缺点: 打包速度慢</span>

- `cheap` 相关
    - 生成的信息提示只能定位到错误 `行` , 不能定位到错误 `列`
- `module` 相关
    - 不仅存储自己代码的映射关系, 还会存储第三方模块的映射关系, 以便于第三方模块出错时更好的debug

<span style="color: #ff0">企业开发中的使用</span>

- 开发阶段
    - `eval-cheap-module-source-map`
    - 只需要 `行` 错误信息
    - 包含第三方模块错误信息
    - 不会生成单独的 `source map` 文件
- 上线 (生产) 阶段
    - `cheap-module-source-map`
    - 只需要 `行` 错误信息
    - 包含第三方模块错误信息
    - 会生成单独的 `source map` 文件

---

## Loader

[Loaders | webpack](https://webpack.js.org/loaders/)

定义

- `webpack` 的本质是一个模块打包工具, 所以默认只能处理 `JavaScript` 文件, 不能处理其他文件
- 但由于其他文件没有模块的概念, 但又需要对 `图片` / `CSS` 等文件进行打包, 所以必须先将其他类型的文件转换为 `webpack` 能够识别打包的 `模块`
- 将其他类型的文件转换为 `webpack` 能够识别处理的 `模块` 的工具就叫 `loader`
- 企业开发中常用的 `loader` 都有现成的, 使用 `NodeJS` 编写

特点

- 单一原则: 一个 `loader` 制作一件事情
- 多个 `loader` 会按照从右至左, 从下至上的顺序执行 (从 `use` 数组的末尾开始执行)

```js
// 两种先执行 css-loader 再执行 style-loader
use: ['style-loader', 'css-loader']
use: [
  {
    loader: 'style-loader'
  },
  {
    loader: 'css-loader'
  }
]
```





### file-loader (Deprecated)

- `v5.x` 中被废弃, 使用 `asset/resource` 代替



### url-loader (Deprecated)

- `v5.x` 中被废弃, 使用 `asset` / `asset/inline` 代替



### css-loader

[css-loader | webpack](https://webpack.js.org/loaders/css-loader/)

定义

- 解析 `.css` 文件中的 `@import` 和 `url()`
- 与 `style-loader` 配合使用

用法

- 在模块中需要使用的地方使用 `import 'path/to/xxx.css'` 导入
- 在 `配置文件` 中的 `module` 的 `rules` 中添加规则

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  }
}
```

模块化

- 想要让 `css` 模块只在导入的文件下生效, 而不是全局生效, 则需要开启模块化功能
- 在 `配置文件` 的 `rules` 中的规则的 `use` 中添加 `options.modules` , 并设置为 `true`
- 开启之后想要使用需要先导入 `css` 模块并存储, 是一个对象
- 需要用到某个 `class` 的时候, 通过 `cssModule.xxx` 的方式使用即可

```js
// webpack.config.js
use: [
	'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: true
    }
  }
]
```

```js
// index.js
import icon from './lnj.jpg'
import cssModule from './index.css'

const img = document.createElement('img')
img.src = icon
img.setAttribute('class', cssModule.size) // 只在当前文件下生效
document.body.appendChild(img)
```

加载字体图标

```js
{
  test: /\.(eot|json|svg|ttf|woff|woff2)$/,
  type: 'asset/resource',
  generator: {
    filename: 'font/[name][ext]'
  }
}
```



### style-loader

[style-loader | webpack](https://webpack.js.org/loaders/style-loader/)

定义

- 用于将 `css` 插入到 `DOM` 中 (将 `webpack` 处理之后的内容插入到 `<head>` 中)
- 与 `css-loader` 配合使用

用法

- 同 `css-loader`



### less-loader

[less-loader | webpack](https://webpack.js.org/loaders/less-loader/)

定义

- 用于将 `less` 编译为 `css`

- 想要使用还需要安装 `less`

    ```
    npm install --save-dev less-loader less
    ```

- 与 `style-loader` 和 `css-loader` 配合使用

用法

- 在模块中需要使用的地方使用 `import 'path/to/xxx.less'` 导入
- 在 `配置文件` 中的 `module` 的 `rules` 中添加规则

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      }
    ]
  }
}
```



### sass-loader

[sass-loader | webpack](https://webpack.js.org/loaders/sass-loader/)

定义

- 用于将 `less` 编译为 `css`

- 想要使用还需要安装 `less`

    ```
    npm install --save-dev sass-loader sass
    ```

- 与 `style-loader` 和 `css-loader` 配合使用

- `less-loader` 几乎一样

用法

- 在模块中需要使用的地方使用 `import 'path/to/xxx.less'` 导入
- 在 `配置文件` 中的 `module` 的 `rules` 中添加规则

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ]
  }
}
```



### postcss-loader

[postcss-loader | webpack](https://webpack.js.org/loaders/postcss-loader/)

PostCSS

[PostCSS - a tool for transforming CSS with JavaScript](https://postcss.org/)

[PostCSS - 是一个用 JavaScript 工具和插件来转换 CSS 代码的工具 | PostCSS 中文网](https://www.postcss.com.cn/)

- 一款使用 `JavaScript` 工具和插件去转换 `css` 的工具

定义

- 用于使用 `PostCSS` 来处理 `css`
- 与 `style-loader` 和 `css-loader` 配合使用

安装

```shell
npm i -D postcss-loader postcss
```

用法

- 安装需要使用的 `Plugin`
- 创建配置文件 `postcss.config.js` 
- 在 `配置文件` 中的 `module` 的 `rules` 中添加规则

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      }
    ]
  }
}
```



### babel-loader

[babel-loader | webpack](https://webpack.js.org/loaders/babel-loader/)

[Babel · The compiler for next generation JavaScript](https://babeljs.io/)

定义

- 将 `ES6+` 的高级语法转换为 `ES5` 的低级语法

安装所有需要的

```
npm i -D babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime core-js
```

```
npm i @babel/runtime @babel/runtime-corejs3
```

用法

- 在 `配置文件` 中的 `module` 的 `rules` 中添加规则
- `options` 中的选项参考文档: [What is Babel? · Babel](https://babeljs.io/docs/en/)
- 是否转换会参考 `package.json` 中的 `browserslist` , 见 `autoprefixer` 插件

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/, // 处理所有 .js .mjs 的文件
        exclude: /(node_modules|bower_components)/, // 不处理的文件夹
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env' // 用于转换, 可以转换有对应关系的语言 (let变成var等等)
              ]
            ],
            plugins: [
              [
                "@babel/plugin-transform-runtime", // 不会污染全局环境
                {
                  absoluteRuntime: false,
                  corejs: 3, // 用于转换没有对应关系的语法 (Promise等等)
                  helpers: true,
                  regenerator: true,
                  version: "^7.15.4"
                }
              ]
            ]
          }
        }
      }
    ]
  }
}
```



### html-withimg-loader

[html-withimg-loader - npm](https://www.npmjs.com/package/html-withimg-loader)

定义

- 用于打包 `html` 中引入的资源

安装

```shell
npm i -D html-withimg-loader
```

- 与其他 `rule` 配合使用

用法

- 在 `配置文件` 中的 `module` 的 `rules` 中添加规则

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(htm|html)$/,
        loader: 'html-withimg-loader'
      }
    ]
  }
}
```



### html-loader

[html-loader - npm](https://www.npmjs.com/package/html-loader)

定义

- 用于处理 `HTML` 中的包含 `变量` 的 `字符串模板`
- <span style="color: #ff0">配合 `Vue 2` 的话, 最多使用 `v1.3.2` 版本, 不然会报错</span>

安装

```shell
npm i -D html-loader
```

用法

- 在 `配置文件` 中的 `module` 的 `rules` 中添加规则

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(htm|html)$/,
        loader: 'html-withimg-loader'
      }
    ]
  }
}
```

---

## 资源模块 (Asset Modules)

[Asset Modules | webpack](https://webpack.js.org/guides/asset-modules/)

定义

- 一种模块类型
- 允许使用资源文件 (字体, 图标, 图片等)
- 无需额外配置 `loader`
- 有 `4` 中资源模块
    - `asset/resource`
    - `asset/inline`
    - `asset/source`
    - `asset`



### asset/resource

[Asset Modules - asset/resource | webpack](https://webpack.js.org/guides/asset-modules/#resource-assets)

定义

- 发送一个单独的文件并导出 `URL`
- `v5.x` 之前使用 `file-loader` 实现
- 处理之后导入文件拿到的是文件打包之后的地址

格式

- 在 `配置文件` 中的 `module` 的 `rules` 中添加规则
- `type` 为 `asset/resource`

```js
module: {
   rules: [
     {
       test: /\.(png|jpg|gif)$/, // 引入所有这三种格式的图片文件
       type: 'asset/resource'
     }
   ]
 }
```

自定义输出文件名 [Asset Modules - asset/resource - Custom output filename | webpack](https://webpack.js.org/guides/asset-modules/#custom-output-filename)

- 默认情况下, `asset/resource` 模块以 `[hash][ext][query]` 的文件名发送到输出目录, 字符串模板详见 [Output - Template strings | webpack](https://webpack.js.org/configuration/output/#template-strings)

- 全局 (所有文件): 在 `配置文件` 中的 `output` 中添加 `assetModuleFilename`
- 该类型文件: 在上面添加的 `rules` 中的规则里添加 `generator.filename`

资源在上线 (生产) 阶段被托管到 `cdn` 的解决办法 [Module - Rule.generator - publicPath | webpack](https://webpack.js.org/configuration/module/#rulegeneratorpublicpath)

- 全局 (所有文件: 在 `配置文件` 中的 `output` 中添加 `publicPath`
- 该类型文件: 在上面添加的 `rules` 中的规则里添加 `generator.publicPath`

示例

```js
// webpack.config.js
// 两种方法二选一即可, 仅适用于 asset 或 asset/resource
module.exports = {
  module: {
    rules: [
     {
       test: /\.(png|jpg|gif)$/,
       type: 'asset/resource',
       generator: {
         filename: 'images/[name][ext]', // 输出到打包输出目录下的 images 文件夹中, 文件名为原文件名 [name] => 原文件名, [ext] => 原文件扩展名
         publicPath: 'https://cdn.xxx.com/assets/' // <img src="images/Tony.jpg"> 会变成 <img src="https://cdn.xxx.com/assets/images/Tony.jpg"
       }
     }
    ]
  }
}
```



### asset/inline

[Asset Modules - asset/inline | webpack](https://webpack.js.org/guides/asset-modules/#inlining-assets)

定义

- 导出一个资源的 `data URI`
- 将打包的资源转换成 `base64` 字符串
- `v5.x` 之前使用 `url-loader` 实现

格式

- 在 `配置文件` 中的 `module` 的 `rules` 中添加规则
- `type` 为 `asset/inline`

```js
module: {
   rules: [
     {
       test: /\.(png|jpg|gif)$/, // 引入所有这三种格式的图片文件
       type: 'asset/inline'
     }
   ]
 }
```

注意点

- 对于比较小的图片, 使用 `asset/inline` 转换成 `base64` 字符串可以提升网页性能
- 对于比较大的图片, 使用 `asset/inline` 转换成 `base64` 反而容易降低网页性能



### asset

[Asset Modules - asset | webpack](https://webpack.js.org/guides/asset-modules/#general-asset-type)

定义

- 在 `asset/resource` 和 `asset/inline` 之间自动选择
- 小于 `8kb` 的文件会默认变成 `asset/inline` , 大于的变成 `asset/resource`
- `v5.x` 之前使用 `url-loader` 设置 `limit` 实现

格式

- 在 `配置文件` 中的 `module` 的 `rules` 中添加规则
- `type` 为 `asset`

改变判断条件的大小

- 在上面添加的 `rules` 中的规则里面添加 `parser.dataUrlCondition.maxSize` , 单位为 `Byte`

自定义输出文件名 / 资源在上线 (生产) 阶段被托管到 `cdn` 的解决办法 

- 同 `asset/resource`

```js
module: {
   rules: [
     {
       test: /\.(png|jpg|gif)$/, // 引入所有这三种格式的图片文件
       type: 'asset',
       parser: {
         dataUrlCondition: {
           maxSize: 200 * 1024 // 200kb 以上的打包成文件, 200kb以下的转换成 base64 字符串
         }
       },
       generator: {
         filename: 'images/[name][ext]', // 输出到打包输出目录下的 images 文件夹中, 文件名为原文件名 [name] => 原文件名, [ext] => 原文件扩展名
         publicPath: 'https://cdn.xxx.com/assets/' // <img src="images/Tony.jpg"> 会变成 <img src="https://cdn.xxx.com/assets/images/Tony.jpg"
       }
     }
   ]
 }
```

---

## Plugin

[Plugins | webpack](https://webpack.js.org/plugins/)

定义

- 用于扩展 `webpack` 的功能
- `配置文件` 中的 `plugins` 是一个 `数组` , 保存了需要添加的 `Plugin` , 作用是告诉 `webpack` 需要新增一些什么样的功能



### autoprefixer

[postcss/autoprefixer: Parse CSS and add vendor prefixes to rules by Can I Use](https://github.com/postcss/autoprefixer)

用途

- 基于 `PostCSS` 的插件
- 用于给 `CSS` 属性添加需要的私有前缀

安装插件

```
npm i -D autoprefixer
```

配置 `postcss.config.js`

```js
// postcss.config.js
module.exports = {
  plugins: {
    'autoprefixer': {} // 对象中是配置选项
  }
}
```

在 `package.json` 中添加 `browserslist` , 还可以和 `babel` / `ESLint` 等共享

```json
"browserslist": [
  "ie >= 8",
  "Firefox >= 3.5",
  "chrome >= 35",
  "opera >= 11.5"
]
```



### pxtorem

[cuth/postcss-pxtorem: Convert pixel units to rem (root em) units using PostCSS](https://github.com/cuth/postcss-pxtorem)

用途

- 基于 `PostCSS` 的插件
- 用于将 `CSS` 属性的 `px` 单位转换为 `rem` 单位
- <span style="color: #ff0">配合 `Vue 2` 的话, 最多使用 `v5.1.1` 版本, 因为再新的要求 `PostCSS 8` , 而 `Vue 2` 使用的是 `v7.x`</span>
- <span style="color: #0ff">除了使用 `通配符 *` , 还可以将 `px` 来改成大写的 `Px` 来防止被转换</span>

安装插件

```
npm i -D postcss-pxtorem
```

配置 `postcss.config.js`

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 100, // 根元素 (<html>) 字体大小
      propList: ['*', '!*transform*'] // 可以从 px 更改到 rem 的属性, 详见github => readme
    }
  }
}
```



### postcss-sprites

[2createStudio/postcss-sprites: Generate sprites from stylesheets.](https://github.com/2createstudio/postcss-sprites)

用途

- 基于 `PostCSS` 的插件
- 用于将一堆图片合并为 `精灵图`

安装插件

```
npm i -D postcss-sprites
```

配置 `postcss.config.js`

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-sprites': {
      spritePath: './bundle/images', // 输出目录, 必须要设置
      
      groupBy: (image) => { // 根据图片的上级目录分类
        const path = image.url.substring(0, image.url.lastIndexOf('/')) // path: "../images/header/1.png" => "../images/header"
        const name = path.substring(path.lastIndexOf('/') + 1) // name: "../images/header/" => "header"
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
```



### HtmlWebpackPlugin

[HtmlWebpackPlugin | webpack](https://webpack.js.org/plugins/html-webpack-plugin/)

[jantimon/html-webpack-plugin: Simplifies creation of HTML files to serve your webpack bundles](https://github.com/jantimon/html-webpack-plugin)

用途

- 打包时自动创建 `html` 文件并引入相关资源
- <span style="color: #f40;">注意该插件无法处理 `HTML` 文件中 `<script>` 中用到 `变量` 的 `字符串模板` , 需要借助 `html-loader`</span>

安装插件

```
npm i -D html-webpack-plugin
```

配置 `webpack.config.js` 配置文件

- 引入插件

    ```js
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    ```

- 在配置中将其创建并加进 `plugins` 数组中

- 创建时的设置参考: [jantimon/html-webpack-plugin: Simplifies creation of HTML files to serve your webpack bundles - options](https://github.com/jantimon/html-webpack-plugin#options)

    ```js
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html'
      })
    ]
    ```



### clean-webpack-plugin

[johnagan/clean-webpack-plugin: A webpack plugin to remove your build folder(s) before building](https://github.com/johnagan/clean-webpack-plugin)

用途

- 打包前清空输出目录文件夹

安装插件

```
npm i -D clean-webpack-plugin
```

配置 `webpack.config.js` 配置文件

- 引入插件

    ```js
    const { CleanWebpackPlugin } = require('clean-webpack-plugin')
    ```

- 在配置中将其创建并加进 `plugins` 数组中

    ```js
    plugins: [
      new CleanWebpackPlugin()
    ]
    ```



### CopyWebpackPlugin

[CopyWebpackPlugin | webpack](https://webpack.js.org/plugins/copy-webpack-plugin/)

用途

- 拷贝不需要处理的文档到打包目录

安装插件

```
npm i -D copy-webpack-plugin
```

配置 `webpack.config.js` 配置文件

- 引入插件

    ```js
    const CopyWebpackPlugin = require('copy-webpack-plugin')
    ```

- 在配置中将其创建并加进 `plugins` 数组中

- 具体设置见文档: [CopyWebpackPlugin | webpack](https://webpack.js.org/plugins/copy-webpack-plugin/)

    ```js
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: './doc', to: './doc' }
        ]
      })
    ]
    ```



### MiniCssExtractPlugin

[MiniCssExtractPlugin | webpack](https://webpack.js.org/plugins/mini-css-extract-plugin/)

用途

- 将打包的 `css` 内容提取到单独的文件中

安装插件

```
npm i -D mini-css-extract-plugin
```

配置 `webpack.config.js` 配置文件

- 引入插件

    ```js
    const MiniCssExtractPlugin = require('mini-css-extract-plugin')
    ```

- 在配置中将其创建并加进 `plugins` 数组中

- 具体设置见文档: [MiniCssExtractPlugin | webpack](https://webpack.js.org/plugins/mini-css-extract-plugin/)

    ```js
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      })
    ]
    ```

- 将 `loader` 加进 `css` 文件的 `rule` 中, 代替 `style-loader`

    ```js
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
      ]
    }
    ```



### TerserWebpackPlugin

[TerserWebpackPlugin | webpack](https://webpack.js.org/plugins/terser-webpack-plugin/)

用途

- 用于压缩 `JavaScript` 文件
- `webpack5` 自带, 但是想要额外配置仍然需要安装
- 使用其他 `minimizer` 的话可以在 `minimizer` 数组中用 `'...'` 代替

安装插件

```
npm i -D terser-webpack-plugin
```

配置 `webpack.config.js` 配置文件

- 引入插件

    ```js
    const TerserPlugin = require('terser-webpack-plugin')
    ```

- 在配置中将其创建并加进 `optimization.minimizer` 数组中

- 具体设置见文档: [TerserWebpackPlugin | webpack](https://webpack.js.org/plugins/terser-webpack-plugin/)

    ```js
    optimization: {
      minimize: true, // 在 develop 环境也开启代码压缩, 否则默认只在 production 环境压缩
      minimizer: [
        new TerserPlugin()
      ]
    }
    ```



### CssMinimizerWebpackPlugin

[CssMinimizerWebpackPlugin | webpack](https://webpack.js.org/plugins/css-minimizer-webpack-plugin/)

用途

- 用于优化和压缩 `css` 文件
- 配合 `mini-css-extract-plugin` 一起使用

安装插件

```
npm i -D css-minimizer-webpack-plugin
```

配置 `webpack.config.js` 配置文件

- 引入插件

    ```js
    const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
    ```

- 在配置中将其创建并加进 `optimization.minimizer` 数组中

- 具体设置见文档: [CssMinimizerWebpackPlugin | webpack](https://webpack.js.org/plugins/css-minimizer-webpack-plugin/)

    ```js
    optimization: {
      minimize: true, // 在 develop 环境也开启代码压缩, 否则默认只在 production 环境压缩
      minimizer: [
        '...', // 扩展现有的 minimizer (webpack5自带默认设置的terser-webpack-plugin)
        new CssMinimizerPlugin()
      ]
    }
    ```



### HotModuleReplacementPlugin

[HotModuleReplacementPlugin | webpack](https://webpack.js.org/plugins/hot-module-replacement-plugin/)

用途

- 内容发生改变的时候会实时更新修改的内容, 但不会重新刷新网站
- <span style="color: #f40; font-weight: 700;">绝对不能被用于 `生产环境` 中</span>
- <span style="color: #ff0">使用 `DevServer` 并设置了 `hot` 选项的话, 不需要额外添加此插件</span>

安装插件

- `webpack` 自带的插件, 不需要额外安装

配置 `webpack.config.js` 配置文件

- 引入 `webpack`

    ```js
    const Webpack = require('webpack')
    ```

- 在配置中将其创建并加进 `plugins` 数组中

    ```js
    plugins: [
      new Webpack.HotModuleReplacementPlugin()
    ]
    ```

热更新 `JavaScript` 文件

- 插件不会自动热更新 `JavaScript` 文件, 所以需要手动配置
- `xxx.js` 为需要监听的 `JavaScript` 模块

```js
if (module.hot) {
  module.hot.accept('./xxx.js', function () {
    // callback function
  })
}
```



### ImageMinimizerWebpackPlugin

[ImageMinimizerWebpackPlugin | webpack](https://webpack.js.org/plugins/image-minimizer-webpack-plugin/)

用途

- 压缩打包的图片

安装插件

- 插件本体

```
npm i -D image-minimizer-webpack-plugin
```

- 插件依赖 (imagemin - lossless [不损失质量] 模式)

```
npm i -D imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo
```

配置 `webpack.config.js` 配置文件

- 引入

    ```js
    const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
    ```

- 在配置中将其创建并加进 `plugins` 数组中

    - 示例不包含 `svg` 格式设置
    - 具体设置分别参考
    - `gif` : [imagemin/imagemin-gifsicle: Imagemin plugin for Gifsicle](https://github.com/imagemin/imagemin-gifsicle)
    - `jpg` / `jpeg` : [imagemin/imagemin-jpegtran: jpegtran plugin for imagemin](https://github.com/imagemin/imagemin-jpegtran)
    - `png` : [imagemin/imagemin-optipng: optipng plugin for imagemin](https://github.com/imagemin/imagemin-optipng)
    - `svg` : [imagemin/imagemin-svgo: SVGO plugin for imagemin](https://github.com/imagemin/imagemin-svgo)

    ```js
    plugins: [
      new ImageMinimizerPlugin({
        minimizerOptions: {
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 5 }]
          ]
        }
      })
    ]
    ```



### EslintWebpackPlugin

[EslintWebpackPlugin | webpack](https://webpack.js.org/plugins/eslint-webpack-plugin/)

[webpack-contrib/eslint-webpack-plugin: A ESLint plugin for webpack](https://github.com/webpack-contrib/eslint-webpack-plugin)

用途

- 一个插件化的 `JavaScript` 代码检查工具
- 企业开发中, 项目负责人会定制一套 `ESLint` 规则, 应用到项目上
- 在编译打包时, 如果语法有错或者代码不符合规范就会报错, 并提示相关信息

安装插件

```
npm i -D eslint eslint-webpack-plugin 
```

配置 `.eslintrc.js`

- 具体设置见文档: [ESLint - Pluggable JavaScript linter](https://eslint.org/)

配置 `webpack.config.js` 配置文件

- 引入插件

    ```js
    const ESLintPlugin = require('eslint-webpack-plugin')
    ```

- 在配置中将其创建并加进 `plugins` 数组中

- 具体设置见文档: [EslintWebpackPlugin | webpack](https://webpack.js.org/plugins/eslint-webpack-plugin/)

    ```js
    plugins: [
      new ESLintPlugin({
        extensions: ['js', 'ts'],
        context: './',
        exclude: 'node_modules',
        files: 'src',
        fix: true
      })
    ]
    ```



---

## Watch & WatchOptions

[Watch and WatchOptions | webpack](https://webpack.js.org/configuration/watch/)

定义

- 用于监听打包文件的变化, 文件修改后会自动重新编译打包
- 企业开发中不常用, 一般使用 `DevServer`



### Watch

- 在 `配置文件` 中将 `watch` 设置为 `true` 

```js
module.exports = {
  watch: true
}
```



### WatchOptions

定义

- 用于定制 `watch` 模式的选项
- 是一个 `对象`

配置选项

- `poll` : 设置每隔多少事件检查一次文件改动, 单位为 `ms` , 默认值为 `1000`
- `aggregateTimeout` : 文件改动完成指定时间后才打包, 单位为 `ms` , 默认值为 `300`
    - 起到防抖作用, 防止系统资源占用过多
- `ignored` : 排除一些巨大 / 不需要监控的文件夹, 例如 `node_modules` , 可以使用:
    - 正则表达式
    - 绝对路径
    - `glob` 模式

---

## DevServer

[DevServer | webpack](https://webpack.js.org/configuration/dev-server/)

定义

- 和 `watch` 一样可以监听文件变化
- 可以将打包好的程序运行在一个 `server` 环境下
- 可以解决企业开发中 `develop` 阶段的 `CORS` (跨域) 问题

注意点

- 通过 `DevServer` 自动打包并没有真正的将文件放到指定目录中
- 为了避免消耗读写磁盘的时间和性能, 打包好的内容被放到了 `内存` 中
- 避免监听到文件变化之后刷新网页应使用 `HMR` 热更新插件, 这样修改的内容会被更新但不会重新刷新网站

安装

```
npm i -D webpack-dev-server
```

运行方法

```
npx webpack serve
```

在 `配置文件` 中添加 `devServer` 对象

```js
module.exports = {
  devServer: {
    // configurations
  }
}
```

配置选项

- `static` : 允许配置从目录提供静态文件的选项, 可以是 `对象` , 也可以是 `数组` 中包含 `对象`
    - `directory` : 告诉服务器从哪里提供内容

- `open` : 是否在启动服务器后自动打开浏览器
    - `false` : 不打开
    - `true` : 使用默认浏览器打开
    - `app.name` : 使用指定浏览器打开
- `port` : 指定使用的端口号
    - `auto` : 自动指定一个端口号
    - `number` / `string` : 指定的端口号
- `proxy` : 为指定 `url` 使用代理 [DevServer - proxy | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/configuration/dev-server/#devserverproxy)
    - 下面例子中的意思即为将 `/user` 和 `/login` 的请求代理为 `http://127.0.0.1:3000/user` 或 `login`
    - 可以解决开发阶段 `CORS` 跨域问题 <span style="color: yellow;">(不能解决上线 (生产) 阶段的跨域问题)</span>
- `hot` : `HMR` 热更新设置
    - `true` : 开启热更新, 但是构建失败会刷新网页
    - `'only'` : 开启热更新, 但是构建失败不会刷新网页

```js
module.exports = {
  devServer: {
    static: {
      directory: './bundle'
    },
    open: true,
    port: 12345,
    proxy: [
      {
        context: ['/user', '/login'],
        target: 'http://127.0.0.1:3000',
        changeOrigin: true, // 域名地址时需要添加
        secure: false, // https时需要添加
        pathRewrite: { '': '/api' } // 重写路径, 在前面添加上"/api"
      }
    ],
    hot: 'only'
  }
}
```

---

## Webpack-merge

定义

- 用于分开维护配置文件, 分为 `生产` 和 `开发` 还有 `公共` 三个配置文件

安装

```shell
npm i -D webpack-merge
```

用法

- 将 `webpack.config.js` 按 `定义` 所说分为三个文件

- 在 `生产` 和 `开发` 中导入

    ```js
    const { merge } = require('webpack-merge')
    ```

- 将原本的 `module.exports` 变成一个变量, 比如 `devConfig`

- 将 `公共` 配置文件导入

    ```js
    const commonConfig = require('./webpack.config.common.js')
    ```

- 文件最后写上

    ```js
    module.exports = merge(CommonConfig, devConfig)
    ```

- 修改 `package.json` 中 `scripts` 中的对应命令, 比如

    ```json
    "scripts": {
      "dev": "npx webpack --config webpack.config.dev.js",
      "prod": "npx webpack --config webpack.config.prod.js"
    }
    ```

---



