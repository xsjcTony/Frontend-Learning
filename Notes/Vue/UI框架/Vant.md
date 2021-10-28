# Vant (for Vue 2)



> [Vant - 轻量、可靠的移动端组件库 (youzan.github.io)](https://youzan.github.io/vant/#/zh-CN/home)



## 定义

- `有赞` 前端团队推出的一款基于 `Vue` 的 `移动端` UI框架
- 和 `Bootstrap` 差不多, 对原生的 `HTML` 标签进行了封装以及美化, 让我们专注于业务逻辑而不是 `UI界面`
- `Vue3` 使用 `Vant v3` [Vant - 轻量、可靠的移动端组件库](https://youzan.github.io/vant/v3/#/zh-CN)
- <span style="color: #f6a;">很适合搭建电商网站</span>

---

## 安装

```shell
npm i vant
```

---

## 按需导入

- 需要借助 `babel-plugin-import` 插件

```shell
npm i -D babel-plugin-import
```

- 修改 `babel.config.js` , 加入如下信息

```json
module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
    	},
      'vant'
    ]
  ]
}
```

- 在 `main.js` 中按需导入

```js
import { NavBar, Card, SubmitBar } from 'vant'

Vue.use(NavBar)
Vue.use(Card)
Vue.use(SubmitBar)
```

---

## 使用组件

[Vant - 轻量、可靠的移动端组件库](https://youzan.github.io/vant/#/zh-CN/home)

- 查看文档, 复制对应代码到 `.vue` 文件的 `<template>` 中即可

示例

```vue
<template>
    <div id="app">
        <van-nav-bar
            title="购物车"
            left-text="返回"
            right-text="按钮"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
        />
        <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
        />
        <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
        />
        <van-submit-bar :price="3050" button-text="提交订单" />
    </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  name: 'App',
  methods: {
    onClickLeft () {
      Toast('返回')
    },
    onClickRight () {
      Toast('按钮')
    }
  }
}
</script>

<style>

</style>
```

