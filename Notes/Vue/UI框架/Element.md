# Element (for Vue 2)



> [Element - 网站快速成型工具](https://element.eleme.io/#/zh-CN)



## 定义

- `饿了么` 前端团队推出的一款基于 `Vue` 的桌面端UI框架
- 和 `Bootstrap` 差不多, 对原生的 `HTML` 标签进行了封装以及美化, 让我们专注于业务逻辑而不是 `UI界面`
- `Vue3` 使用 `Element+` [Element - 网站快速成型工具 | Element Plus](https://element-plus.org/zh-CN/)

---

## 安装

```shell
npm i element-ui
```

---

## 导入



### 完整导入

- 在 `main.js` 入口文件中导入并使用

```js
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
```



### 按需导入

- 需要借助 `babel-plugin-component` 插件

```shell
npm i -D babel-plugin-component
```

- 修改 `babel.config.js` , 加入如下信息, 示例为 `json` 格式, 需要转换为 `JavaScript`

```json
{
  "presets": [[{ "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

- 在 `main.js` 中按需导入

```js
import { Row, Button, Switch } from 'element-ui'

Vue.use(Row)
Vue.use(Button)
Vue.use(Switch)
```

---

## 使用组件

[组件 | Element](https://element.eleme.io/#/zh-CN/component/layout)

- 查看文档, 复制对应代码到 `.vue` 文件的 `<template>` 中即可

示例

```vue
<template>
    <div id="app">
        <el-row>
            <el-button>默认按钮</el-button>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="success">成功按钮</el-button>
            <el-button type="info">信息按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
        </el-row>
        <div>
            <el-switch
                v-model="value"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
        </div>
    </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      value: true
    }
  }
}
</script>

<style>

</style>
```

