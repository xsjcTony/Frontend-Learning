# Vue - 原理 (v2)



## 双向数据绑定实现

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

---

## 实例创建

1. 处理 `el` , 将对应的 `DOM元素` 挂载到 `$el` 上
2. 将 `data` 挂载到 `$data` 上
   - 挂载之前通过 `defineProperty` 给所有数据添加 `getter` / `setter`
   - 将 `$data` 中第一层的键值挂载到 `实例` 上
3. 将 `methods` 挂载到 `$methods` 上
4. 根据 `$el` 和 `$data` 来编译渲染
   1. 将控制区域中的 `DOM` 中的元素保存到 `DocumentFragment` 内存中 (同时也会自动从 `DOM` 中移除)
   2. 查找 `指令` 和 `模板` 并进行相应的处理

---

## 数据驱动界面更新

1. 根据 `数据双向绑定` 中的原理, 使用 `defineProperty` 给每个数据都添加 `getter` 和 `setter`

2. 创建一个 `观察者` 类, 定义更新的方法

3. 创建一个 `发布订阅模式` 类, 统一管理属性的所有 `观察者` , 并调用更新方法
4. 在第一次渲染的时候给所有属性添加 `观察者`
   1. 在属性的 `getter` 中添加 `观察者`
   2. 在属性的 `setter` 中触发 `观察者` 的更新方法
5. 这样数据发生变化的时候就会在 `setter` 中调用 `观察者` 的更新方法, 从而驱动界面更新 

---

## 界面驱动数据更新

- `v-model` 专属

1. 给 `input` 通过 `addEventListener` 添加 `input` 事件监听用户输入
2. 将用户输入的内容赋值给 `v-model` 中绑定的数据

---

## 指令

- 查找以 `v-` 开头的属性
- 根据 `指令` 名称寻找相应的方法进行编译



### v-model

- 将数据设置给输入框的 `value` 属性
- 监听用户输入更新数据



### v-html

- 设置元素的 `innerHTML`



### v-text

- 设置元素的 `innerText`



### v-on

- 获取指令中的事件名称
- 获取指令中的方法名称以及参数
- 将原生 `event` 对象加进参数中
- 给元素添加 `EventListener` , 将指令中的方法作为回调函数
- 修改回调函数的 `this` 为 `实例`

