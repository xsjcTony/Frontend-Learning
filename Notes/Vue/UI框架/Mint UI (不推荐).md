## Mint UI (for Vue 2)



> [Mint UI](https://mint-ui.github.io/#!/zh-cn)



## 定义

- 也是由 `饿了么` 前端团队开发的框架
- 与 `Element` 的区别是 `Mint UI` 是 `移动端` 框架, 而 `Element` 是桌面端
- 除了这个区别其他都是一样的
- 好像暂时不支持 `Vue 3`
- <span style="color: #0ff;">由于 `BUG ` 太多, 所以 `移动端` 推荐使用 `Vant`</span>

---

## 安装

```shell
npm i mint-ui
```

---

## 导入



### 完整导入

- 在 `main.js` 入口文件中导入并使用

```js
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)
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
    - <span style="color: #f40">在 `Mint Ui` 中不能使用 `Vue.use()` 的形式, 必须使用 `Vue.component()`

```js
import { Button, Switch } from 'mint-ui'

Vue.component(Button.name, Button)
Vue.component(Switch.name, Switch)
```

---

## 使用组件

- 查看文档, 复制对应代码到 `.vue` 文件的 `<template>` 中即可

示例

```vue
<template>
    <div id="app">
        <div>
            <mt-button type="default">default</mt-button>
            <mt-button type="primary">primary</mt-button>
            <mt-button type="danger">danger</mt-button>
        </div>
        <div>
            <mt-switch v-model="value"></mt-switch>
        </div>
    </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      value: true
    }
  }
}
</script>

<style>

</style>
```

