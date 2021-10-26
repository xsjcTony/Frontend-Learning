# Vuex (v3)



> [What is Vuex? | Vuex](https://vuex.vuejs.org/)
>
> [Vuex 是什么？ | Vuex](https://vuex.vuejs.org/zh/)
>
> [vuejs/vuex: 🗃️ Centralized State Management for Vue.js.](https://github.com/vuejs/vuex)



## 定义

- 专为 `Vue` 应用程序开发的 `状态管理模式`
- 可以用于管理 `共享状态`
- 方便整个程序中的任何 `组件` 都可以获取 / 修改 `Vuex` 中保存的 `公共状态`
- 集成到了 `Vue Devtools` 中
- <span style="color: #0ff">`Vuex 3.x` 应用于 `Vue 2.x`</span>

---

## 准备工作

- 必须要在 `vue.js` 之后导入

```html
<script src="js/vue.js"></script>
<script src="js/vuex.js"></script>
```

- 创建 `Vuex` 对象
    - 通过 `Vuex.Store()` 构造函数创建
    - `state` : 相当于组件中的data, 专门用于保存共享数据(状态)
    - `mutations` : 专门用于保存修改共享数据的方法
        - 其中的所有方法都会接收一个参数 `state` , 就是上述的 `state` , 其中保存了共享数据

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```

- 在 `根组件` 中定义 `store` , 这样其所有后代 `组件` 都可以使用
    - 使用 `this.$store` 访问这个 `Vuex` 对象

```js
new Vue({
  el: '#app',
  store // ES6的简写方式, 相当于 store: store
})
```

---

## 访问数据

- 在 `组件` 中使用数据
- `共享数据` 保存在 `this.$store.state` 中

```html
<div id="app">
    <p>{{ this.$store.state.count }}</p>
</div>
```

---

## 修改数据

- <span style="color: #ff0">不要在 `Vuex` 中直接修改 `共享数据` , 这样很不利于调试错误, 不利于维护</span>
- 在 `组件` 的方法中使用 `this.$store.commit()` 来调用 `mutations` 中的修改共享数据的方法
- `commit()` 中写上 `mutations` 中想要调用的方法名称

```js
new Vue({
  el: '#app',
  store, // ES6的简写方式, 相当于 store: store
  methods: {
    addCount () {
      this.$store.commit('increment')
    }
  }
})
```

---

## Getters

[Getter | Vuex](https://vuex.vuejs.org/zh/guide/getters.html#通过属性访问)

- 可以理解为是 `store` 的 `计算属性`
- 会根据它的依赖被缓存起来, 只有依赖值发生了改变才会重新计算

- 和 `mutations` 一样, `getters` 中的所有方法都会自动传入一个 `state` 参数
- 想要访问的话可以通过 `this.$store.getters` 访问

getters示例

```js
const store = new Vuex.Store({
  state: {
    msg: 'Tony'
  },
  mutations: {},
  getters: {
    format: state => state.msg + ' loves Lily'
  }
})
```

获取getters数据示例

- 虽然获取了三次, 但只会计算一次

```html
<div id="app">
  	<p>{{ this.$store.state.msg }}</p> <!-- Tony -->
    <p>{{ this.$store.getters.format }}</p> <!-- Tony loves Lily -->
    <p>{{ this.$store.getters.format }}</p> <!-- Tony loves Lily -->
    <p>{{ this.$store.getters.format }}</p> <!-- Tony loves Lily -->
</div>
```