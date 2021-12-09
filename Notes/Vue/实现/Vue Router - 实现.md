# Vue Router - 实现



## 本质

- 根据不同的 `hash` / `路径地址` , 将不同的内容渲染到 `<router-view>` 中
- 核心关健点是如何监听 `hash` / `路径地址` 的变化, 将不同的内容写到 `<router-view>` 中
- 本质是一个 `插件`
- `VueRouter` 是一个 `类`

起步模板 ( `install` 为 `Vue插件` 必须要有的方法)

```js
class AueRouter {
  constructor (options) {}
}

AueRouter.install = (Vue, options) => {}

export default AueRouter
```

---

## 处理路由信息



### 提取路由信息

- 将得到的路由信息提取成如下格式

```js
routeMap: {
  '/home': Home // path: component
}
```



### 初始化路由信息

- 创建一个新的 `class` 专门用于保存当前路由信息

```js
class AueRoute {
  constructor () {
    this.currentPath = null
  }
}
```

- 若没有 `pathname` 或者 `hash` , 则增加一个默认的
- 在页面初次加载完成时保存当前的 `pathname` / `hash`
- 在 `pathname` / `hash` 改变时保存当前的值

---

## 给Vue实例挂载$router和\$route

- 使用 `Vue.mixin` 给所有 `Vue实例` 添加 `beforeCreate钩子` 并挂载
- 如果有 `this.$options.router` 即为根组件, 直接挂载
- 若没有, 则使用 `this.$parent` 的 `$router` / `$route`
- 将 `$router` 使用 `Vue.util.defineReactive()` 变成响应式, 以方便后期使用 `<router-view>` 更新界面

```js
AueRouter.install = (Vue, options) => {
  Vue.mixin({
    beforeCreate () {
      if (this.$options?.router) {
        this.$router = this.$options.router
        this.$route = this.$router.route
        Vue.util.defineReactive(this, '$router', this.$router)
      } else {
        this.$router = this.$parent.$router
        this.$route = this.$router.route
      }
    }
  })
}
```

---

## 相关组件实现



### \<router-link>

- 在 `install` 方法中通过 `Vue.component` 注册一个全局组件 `<router-link>`
- 通过 `props` 指定需要的参数, 比如 `to`
- 通过 `render` 渲染函数返回一个 `<a>` 标签, 或指定标签
- `render` 函数中可以使用 `jsx` 格式

```jsx
Vue.component('router-link', {
  props: {
    to: {
      type: String,
      default: '',
      required: true
    }
  },
  render () {
    return this.$router.mode === 'history' ?
      <a href={ this.to }>{ this.$slots.default }</a> :
      <a href={ `#${ this.to }` }>{ this.$slots.default }</a>
  }
})
```



### \<router-view>

- 在 `install` 方法中通过 `Vue.component` 注册一个全局组件 `<router-view>`
- 通过 `render` 渲染函数返回一个通过 `createElement` / `h` 渲染过后的组件
- `组件` 从 `$router.routeMap` 中获取, 当前路径从 `$route.currentPath` 中获取
- 前提是 `currentPath` 需要是响应式数据

```js
Vue.component('router-view', {
  render (h) {
    const component = this.$router.routeMap.get(this.$route.currentPath)
    return h(component)
  }
})
```





