# Vue Router (v3)



> [Vue Router](https://router.vuejs.org/)
>
> [Vue Router - 中文文档](https://router.vuejs.org/zh/)
>
> [vuejs/vue-router: 🚦 The official router for Vue.js.](https://github.com/vuejs/vue-router)



## 定义

- `Vue` 官方的 `路由管理器`
- 用来切换 `组件` 的显示
- `Vue Router` 使用 `hash(#)` 来切换, 而 `v-if` / `v-show` 使用标记 ( `true` / `false` ) 来切换
- `Vue Router` 不仅能够切换 `组件` 的显示, 还可以在切换的时候传递 `参数`
- <span style="color: #0ff">`Vue Router 3.x` 应用于 `Vue 2.x`</span>

---

## 基本使用



### 导入

- 必须要在 `vue.js` 之后导入

```html
<script src="js/vue.js"></script>
<script src="js/vue-router.js"></script>
```



### 定义路由规则

- 是一个 `数组` , 每一项是一个 `对象`
- `path` : `hash` 值
- `component` : 对应要显示的 `组件`

```js
const routes = [
  { path: '/one', component: one },
  { path: '/two', component: two }
]
```



### 创建路由对象

- 使用 `new VueRouter()` 创建, 传入一个 `对象`
- `routes` : 路由规则
- `mode` : 路由模式
  - <span style="color: #ff0;">`hash` : 默认模式, 在 `URL` 前面加一个 `#` (不推荐)</span>
  - `history` : HTML5 history模式, 注意默认情况下在打包上线之后不能刷新, 否则会报错 `404 Not Found` , 需要在服务器上进行额外配置


```js
const router = new VueRouter({
  routes // (ES6缩写) 相当于 routes: routes
})
```



### 绑定Vue实例对象

- 将创建好的 `路由对象` 绑定到 `Vue实例对象` 上
- 这样整个应用都有路由功能了
- 使用 `router` 属性指定

```js
// Vue实例对象
const vue = new Vue({
  el: '#app',
  // 注册局部组件
  components: {
    one,
    two
  },
  // 绑定路由对象
  router // (ES6缩写) 相当于 router: router
})
```



### 设置导航

- 通过 `<router-link>` 组件来导航
- 通过 `to` 属性来指定链接 ( `hash值` )

```html
<div id="app">
    <router-link to="/one">one组件</router-link>
		<router-link to="/two">two组件</router-link>
</div>
```



### 设置路由出口

- 在 `Vue` 应用程序中设置 `路由出口`
- 需要显示的 `组件` 会被渲染在 `路由出口` 的位置
- 使用 `<router-view>` 组件

```html
<div id="app">
  	<!-- 导航 -->
  	<router-link to="/one">one组件</router-link>
		<router-link to="/two">two组件</router-link>
  	<!-- 路由出口 -->
  	<router-view></router-view>
</div>
```

---

## router-link

[API 参考 - \<router-link\> | Vue Router (vuejs.org)](https://router.vuejs.org/zh/api/#router-link)

- 用于在具有路由功能的 `应用程序` 中进行 `导航`
- `<router-link>` 默认会被渲染为一个 `<a>` 标签
- <span style="color: #f40;">使用该组件进行 `导航` , 不要使用写死的 `<a>` 标签</span>
- 激活的 `<router-link>` 会有一个 `class` 叫做 `router-link-active` , 可以编辑他的 `css` 来自定义样式, 可以通过 `<router-link>` 组件的 `active-class` 属性值来修改或通过 `路由对象` 配置中的 `linkActiveClass` 属性来全局修改
- 属性值
    - `to` : 目标路由的 `hash` 值
    - `tag` : `<router-link>` 渲染成的标签, 默认值为 `a` ( `v4.x` 中被废弃, 使用 `v-slot` 代替, 详见文档或工程中 `51-Vue Router-router-link` )
    - `active-class` : 设置激活状态时的 `class` 名称, 默认值为 `router-link-active`

---

## Router 构建选项

[API 参考 - Router 构建选项 | Vue Router](https://router.vuejs.org/zh/api/#router-构建选项)

- 使用 `new VueRouter()` 创建, 传入一个 `对象`
- `routes` : 路由规则, 是一个 `数组` , 每一项是一个 `对象`
    - `path` : (必须要有) `hash` 值
    - `component` : 对应要显示的 `组件`
    - `components` : `命名视图` 组件
    - `redirect` : 重定向到的路由
    - `children` : 用于配置 `嵌套路由 `
- `linkActiveClass` : 全局配置 `<router-link>` 组件默认的激活的 `class` 名称 (对 `v-slot` 的用法无效)

---

## 路由对象

[API 参考 - 路由对象 | Vue Router (vuejs.org)](https://router.vuejs.org/zh/api/#路由对象)

- 当前激活的路由的状态信息
- 在 `组件` 内, 通过 `this.$route` 访问
- `路由对象` 的 `属性`
    - `params` : 一个 `对象` , 包含了动态片段和全匹配片段. 如果没有 `路由参数` ，就是一个 `{}`
    - `query` : 一个 `对象` , 表示 `URL` 查询参数. 如果没有`查询参数` , 则是个 `{}`

---

## 参数传递

[动态路由匹配 | Vue Router](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html)

- 传递方式一: `URL` 参数传递

    - 传递: 直接将参数写在 `to` 属性中

    ```html
    <router-link to="/one?name=Tony&age=24">one组件</router-link>
    ```

    - 接收: 在 `组件` 中的 `created` `生命周期` 方法中获取, 使用 `this.$route.query`

    ```js
    const one = {
      template: '#one',
      created: function () {
        const { name, age } = this.$route.query
        console.log(name, age) // Tony, 24
      }
    }
    ```

- 传递方式二: 通过 `占位符` 传递

    - 传递: 在定义 `路由规则` 时在 `path` 中写上 `占位符` , 然后指定 `to` 属性的时候用 `数据` 代替 `占位符`

    ```html
    <div id="app">
        <router-link to="/two/Lily/24">two组件</router-link>
        <router-view></router-view>
    </div>
    <script>
      // 定义路由规则
      const routes = [
        { path: '/two/:name/:age', component: two } // 在path中写上占位符
      ]
    </script>
    ```

    - 接收: 在 `组件` 中的 `created` `生命周期` 方法中获取, 使用 `this.$route.params`

    ```js
    const two = {
      template: '#two',
      created: function () {
        const { name, age } = this.$route.params
        console.log(name, age) // Lily, 24
      }
    }
    ```
    

---

## 嵌套路由

[嵌套路由 | Vue Router](https://router.vuejs.org/zh/guide/essentials/nested-routes.html)

- 在 `子组件` 中定义 `<router-link>` 和 `<router-view>` , 作为 `子路由` 的 `导航` 和 `出口`

    ```html
    <template id="one">
        <div class="page-one">
            <router-link to="/one/sub_one" custom v-slot="{ navigate }">
                <button @click="navigate" role="link">第一个子界面</button>
            </router-link>
            <router-link to="/one/sub_two" custom v-slot="{ navigate }">
                <button @click="navigate" role="link">第二个子界面</button>
            </router-link>
            <router-view></router-view>
        </div>
    </template>
    ```

- 在 `路由规则` 的该 `子路由` 归属的 `父路由` 中定义 `children` 属性, 在其中定义子路由

    ```js
    const routes = [
      {
        path: '/one',
        component: one,
        // 定义属于 /one 的子路由
        children: [
          { path: 'sub_one', component: subOne }, // 子路由不需要写父路由的路径, 也不需要写"/"
          { path: 'sub_two', component: subTwo }
        ]
      },
      { path: '/two', component: two }
    ]
    ```

---

## 命名视图

[命名视图 | Vue Router](https://router.vuejs.org/zh/guide/essentials/named-views.html)

- 类似 `具名插槽`

- 让不同的 `<router-view>` 出口显示不同的内容

- 当 `路由地址` 被匹配的时候同时指定多个 `出口` , 并且每个 `出口` 中显示的内容不同

- 没有被命名的 `<router-view>` 名称默认为 `default` , 和 `匿名插槽` 一样, 并且有几个就会被渲染几份

- 使用 `name` 属性给 `<router-view>` 指定名称

    ```html
    <div id="app">
        <router-view name="name1"></router-view>
        <router-view name="name2"></router-view>
    </div>
    ```

- 在 `路由规则` 中使用 `components` 来指定 `命名视图` 的渲染规则

    ```js
    const routes = [
      {
        path: '/',
        components: {
          name1: one,
          name2: two
        }
      }
    ]
    ```

---

## Watch

- 属于 `Vue实例对象` , 详情见 `Vue` 笔记
- `watch` 还能够监听 `路由地址` 的变化
- 可以用于判断是从哪个界面跳转过来的
- 监听的 `key` 为 `$route.path`

---

## 编程式导航

[编程式的导航 | Vue Router](https://router.vuejs.org/zh/guide/essentials/navigation.html)



### router.push()

- 可以在 `Vue实例对象` 中通过 `this.$router.push` 来调用
- 相当于 `<router-link :to="...">`
- 会向 `history` 添加记录
- 参数
    - `location` : 路径 / 地址
    - `onComplete` : (Optional) 导航成功的 `回调函数`
    - `onAbort` : (Optional) 导航终止的 `回调函数`

---

## 优化



### 组件按需加载

- 通过 `ES6 import` 的方式加载 `SFC组件` , 无论有没有被用到, 都会被加载进来
- 通过 `动态导入` 来实现

```js
// import Foo from './Foo.vue' // 这种是直接导入, 
const Foo = () => import('./Foo.vue') // 推荐使用这种异步导入, 做到懒加载的效果

const router = new VueRouter({
  routes: [{ path: '/foo', component: Foo }]
})
```



