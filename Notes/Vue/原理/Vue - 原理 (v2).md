# Vue - 原理 (v2)



## 双向数据绑定

定义

- `v-model` 的效果, 界面发生变化会让数据改变, 数据发生变化也会让界面改变

原理

- 实时监听数据变化, 一旦数据发生改变就更新界面
- 通过 `原生JS` 的 `defineProperty` 方法实现 [Object.defineProperty() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
- <span style="color: #0ff;">实现双向数据绑定的重点是通过 `defineProperty` 给属性添加 `get` / `set` 方法, 监听数据变化, 并执行相应的操作</span>

封装

```js
const obj = {
  name: { a: 'abc' },
  age: 24,
  extra: ''
}

// 用于快速给传入的对象的所有属性都添加 get 和 set 方法
class Observer {
  constructor (obj) {
    this.observer(obj)
  }

  observer (obj) {
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        this.defineReactive(obj, key, obj[key])
      }
    }
  }

  defineReactive (obj, key, value) {
    this.observer(value) // 如果取值是一个对象, 那么也给其每一个属性添加getter和setter

    const self = this // 保存当前上下文的this
    Object.defineProperty(obj, key, {
      enumerable: false,
      get () {
        return value
      },

      set (newValue) {
        if (newValue !== value) {
          self.observer(newValue) // 如果被赋值了一个对象, 那么也给其每一个属性添加getter和setter
          value = newValue
        }
      }
    })
  }
}

new Observer(obj)
```



## Vue实例

分析

- `Vue` 是一个类, 因为创建 `Vue实例` 的时候使用了 `new`
- 需要从创建好的 `Vue实例` 中拿到数据 `data` 和控制区域 `el` , 编译渲染这个区域
  - `el` 可以是一个 `id选择器` , 也可以是一个 `DOM元素`
- 需要将创建实例时传入的 `el` 绑定到实例 `$el` 上, `data` 绑定到 `$data` 上
