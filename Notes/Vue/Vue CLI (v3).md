# Vue CLI (v4)



> [Vue CLI](https://cli.vuejs.org/)
>
> [Vue CLI - 中文文档](https://cli.vuejs.org/zh/)



## 定义

- 全称为 `Vue Command Line Interface`
- 官方提供的 `脚手架` 工具
- 默认已经搭建好了一套利用 `webpack` 管理 `Vue` 的 `项目结构`

---

## 安装

- 全局安装

```shell
npm install -g @vue/cli
```

- 检查安装是否成功

```shell
vue --version
```

---

## 创建一个项目

- 使用指令 `vue create projectName` 开始创建

```shell
vue create my-project
```

- 通过 `↑` / `↓` 键来选择需要的 `配置` , `Enter` 键确认

```shell
? Please pick a preset: (Use arrow keys)
> Default ([Vue 2] babel, eslint)
  Default (Vue 3) ([Vue 3] babel, eslint)
  Manually select features
```

- 如果选择 `默认配置` , 那么会直接跳转到 `创建完成`
- 如果选择 `手动配置` 的话, 通过 `↑` / `↓` 键来选择, 通过 `Space` 来选择 / 取消选择, 通过 `a` 键来全选 / 全不选, 通过 `i` 键来反选, `Enter` 键确认

```shell
? Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection)
>(*) Choose Vue version
 (*) Babel
 ( ) TypeScript
 ( ) Progressive Web App (PWA) Support
 ( ) Router
 ( ) Vuex
 ( ) CSS Pre-processors
 (*) Linter / Formatter
 ( ) Unit Testing
 ( ) E2E Testing
```

- 选择 `Vue` 的版本

```shell
? Choose a version of Vue.js that you want to start the project with (Use arrow keys)
> 2.x
  3.x
```

- 如果选择了 `Router` , 需要选择是否使用 `Vue Router` 的 `history` 模式 [HTML5 History 模式 | Vue Router](https://router.vuejs.org/zh/guide/essentials/history-mode.html)

```shell
? Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n)
```

- 如果选择了 `CSS Pre-processors` , 需要选择使用哪个
- 如果使用 `Sass/SCSS` 那么推荐 `dart-sass`

```shell
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): (Use arrow keys)
> Sass/SCSS (with dart-sass)
  Sass/SCSS (with node-sass)
  Less
  Stylus
```

- 如果选择了 `Linter/Formatter`
    - 则需要选择一个配置

  ```shell
  ? Pick a linter / formatter config: (Use arrow keys)
  > ESLint with error prevention only
    ESLint + Airbnb config
    ESLint + Standard config
    ESLint + Prettier
  ```

    - 需要选择什么时候进行 `格式检查` , 通过 `↑` / `↓` 键来选择, 通过 `Space` 来选择 / 取消选择, 通过 `a` 键来全选 / 全不选, 通过 `i` 键来反选, `Enter` 键确认
  
    ```shell
    Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)
    >(*) Lint on save
     ( ) Lint and fix on commit
    ```
  
- 选择在哪里保存 `babel` / `ESLint` 等配置文件

```shell
Where do you prefer placing config for Babel, ESLint, etc.? (Use arrow keys)
> In dedicated config files
  In package.json
```

- 选择是否将上述配置作为一个 `preset` 保存, 可以直接给以后的工程使用

```shell
? Save this as a preset for future projects? (y/N)
```

- <span style="color: #0ff;">出现这句话就说明创建完成了</span>

```shell
Successfully created project my-project.
```

---

## 项目结构

- `Vue-CLI v3.x` 之后项目结构中已经没有了 `webpack` 相关的 `build` 和 `config` 目录, 这是为了化繁为简, 让开发者不用关心 `webpack` , 只关心如何使用 `Vue`
- `node_modules` 目录: 当前项目依赖的相关的包
- `public` 目录: 其中的文件不会被 `webpack` 处理, 只会被简单的复制, 一般用于存储一些永远不会改变的 `静态资源` 或者 `webpack` 不支持的第三方库
- `src` 目录: 代码文件夹
    - `assets` 目录: 存储项目中自己的一些静态文件 (图片 / 字体等)
    - `components` 目录: 存储项目中的 `自定义组件` (小组件 / 公共组件)
    - `views` 目录: 存储项目中的 `自定义组件` (大组件 / 页面级组件 / 路由级别组件)
    - `router` 目录: 存储 `Vue Router` 相关文件
    - `store` 目录: 存储 `Vuex` 相关文件
    - `App.vue` : 根组件, 相当于 `Vue实例对象` 的控制区域
    - `main.js` : 整个 `Vue` 项目的 `入口`

---

## 打包运行项目

[CLI 服务 | Vue CLI](https://cli.vuejs.org/zh/guide/cli-service.html)

- 使用 `dev-server` 运行项目 (开发模式)

```shell
npm run serve
```

- 打包项目到 `dist` 目录中

```shell
npm run build
```

---

## 修改项目webpack配置

[webpack 相关 | Vue CLI](https://cli.vuejs.org/zh/guide/webpack.html)

- 创建 `vue.config.js` 文件
- 添加 `configureWebpack` 属性, 可以是一个 `对象` , 里面和 `webpack.config.js` 设置一样
- 但不是所有 `webpack` 选项都可以这样配置, 因为有些是基于 `vue.config.js` 的 [配置参考 | Vue CLI](https://cli.vuejs.org/zh/config/#vue-config-js)
    - `outputDir` 代替 `webpack` 的 `output.path` , 并且不需要写在 `configureWebpack` 中
- 先查看 `配置参考` 文档查询 `Vue-CLI` 的封装能否满足需求, 如果不能再去 `configureWebpack` 属性中修改 `webpack` 配置

---

## 注意点

- 修改 `.browserslistrc` 之后必须重新打包
- 使用 `postcss.config.js` 文件配置 `PostCSS` 之后必须手动开启 `autoprefixer` , 否则会覆盖 `Vue` 默认开启 `autoprefixer` 的设定

```js
module.exports = {
  plugins: {
    // 如果配置了该文件, 需要重新添加autoprefixer避免覆盖vue2默认配置
    autoprefixer: {},
    // ...
  }
}
```

