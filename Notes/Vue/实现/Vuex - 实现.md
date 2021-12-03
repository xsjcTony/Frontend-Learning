# Vuex - 实现



## 本质

- `Vuex` 本质是一个 `插件`
- 一个全局共享数据的 `插件`
- `Store` 属性是一个 `类`
- 在控制区域的 `Vue实例` 以及其子组件的 `Vue实例` 上都有 `$store` 属性, 用于访问仓库

起步模板 ( `install` 为 `Vue插件` 必须要有的方法)

```js
// Auex.js
const install = (Vue, options) => {

}


class Store {
  constructor (options) {
    
  }
}


export default {
  install,
  Store
}
```



## 给所有Vue实例挂载$store仓库对象

- 通过 `Vue.mixin()` 全局混入, 通过 `beforeCreate` 钩子来给所有 `Vue实例` 在创建时添加 `$store`
- 由于 `Vue` 创建 `Vue实例` 是根据先 `父组件` 再 `子组件` 的顺序, 而 `根组件` 有 `store` 属性, 指向了 `Vuex` 对象, 所以可以在 `mixin()` 中判断 `组件` 的 `$options` 中是否包含 `store` 属性, 包含则是 `根组件` , 直接赋值给 `$store` , 若不包含则是 `子孙组件` , 取 `$parent` 的 `$store` 即可

```js
const install = (Vue, options) => {
  // global mixin, apply on every component
  Vue.mixin({
    beforeCreate() {
      // root component => use $options.store
      if (this.$options?.store) {
        this.$store = this.$options.store
      }
      // child components => use its parent's $store
      else {
        this.$store = this.$parent.$store
      }
    }
  })
}
```

