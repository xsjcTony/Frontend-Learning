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



## 数据共享

- 在创建 `Store` 时, 将传入的 `state` 保存在 `Store实例` 中, 这样就可以通过 `this.$store.state` 获取
- 使用 `Vue.util.defineReactive` 来实现响应式

```js
class Store {
  constructor (options) {
    Vue.util.defineReactive(this, 'state', options.state)
  }
}
```



## getters

- 遍历创建 `Store` 时传入的 `getters` 对象, 通过 `defineProperty` 的 `getter` 来传入 `state` , 然后拿到返回值

```js
this.getters = options.getters ?? {}
for (const key in getters) {
  Object.defineProperty(this.getters, key, {
    get: () => {
      return getters[key](this.state)
    }
  })
}
```



## mutations

- 遍历创建 `Store` 时传入的 `mutations` 对象, 通过 `defineProperty` 将 `value` 设置为一个方法, 传入 `state` 和 `payload`
- 创建一个 `commit` 方法, 调用 `this.mutations` 中的对应方法
- 需要使用 `箭头函数` , 以将 `this` 绑定到 `Store` 类

```js
commit = (mutation, payload) => {
  this.mutations[mutation](payload)
}
```

```js
this.mutations = options.mutations ?? {}
for (const key in mutations) {
  Object.defineProperty(this.mutations, key, {
    value: (payload) => {
      mutations[key](this.state, payload)
    }
  })
}
```



## actions

- 遍历创建 `Store` 时传入的 `actions` 对象, 通过 `defineProperty` 将 `value` 设置为一个方法, 传入 `Store` 类 和 `payload`
- 创建一个 `dispatch` 方法, 调用 `this.actions` 中的对应方法
- 需要使用 `箭头函数` , 以将 `this` 绑定到 `Store` 类

```js
dispatch = (action, payload) => {
  this.actions[action](payload)
}
```

```js
parseActions (actions = {}) {
  this.actions = {}

  for (const key in actions) {
    Object.defineProperty(this.actions, key, {
      value: (payload) => {
        actions[key](this, payload)
      }
    })
  }
}
```



## modules

1. 将数据处理为如下格式

```js
const root = {
  _raw: rootModule,
  _state: doorModule.state,
  _children: {
    child1: {
      _raw: child1Module,
      _state: child1Module.state,
      _children: {
        // nested child module
      }
    },
    child2: {
      _raw: child2Module,
      _state: child2Module.state,
      _children: {
        // nested child module
      }
    }
  }
}
```

数据处理示例代码

```js
class ModuleCollection {
  constructor (rootModule) { // rootModule即为创建Store时的options
    this.register(rootModule)
  }

  register(rootModule, arr = []) {
    const module = {
      _raw: rootModule,
      _state: rootModule.state,
      _children: {

      }
    }

    // root module
    if (arr.length === 0) {
      this.root = module
    }
    // child modules
    else {
      const parent = arr.splice(0, arr.length - 1).reduce((currentModule, childModule) => {
        return currentModule._children[childModule]
      }, this.root)
      parent._children[arr.at(-1)] = module
    }

    for (const childModuleName in rootModule.modules) {
      const childModule = rootModule.modules[childModuleName]
      this.register(childModule, [...arr, childModuleName])
    }
  }
}
```

2. 将每个子模块中的 `state` 中的数据以 `this.$store.state.child1.child2.data` 的形式添加到根模块的 `state` 中
   - 必须确保数据是响应式的, 使用 `Vue.set()` 实现

```js
initModules (rootModule, arr = []) {
  // put data in child module into root state
  if (arr.length > 0) {
    const parent = arr.splice(0, arr.length - 1).reduce((state, currentKey) => {
      return state[currentKey]
    }, this.state)

    Vue.set(parent, arr.at(-1), rootModule._state)
  }

  // fetch data of child module
  for (const childModuleName in rootModule._children) {
    const childModule = rootModule._children[childModuleName]
    this.initModules(childModule, [...arr, childModuleName])
  }
}
```

