# Iterator



> [Iterators and generators - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)



## 定义

- 迭代器
- 一种接口, 一种标准规范
- 规定了不同数据类型统一进行数据遍历的机制
- 在 `>=ES6` 的环境中主要供 `forof循环` 使用



## 默认实现 `Iterator` 接口的数据类型

- Array
- Map
- Set
- String
- TypedArray
- arguments
- NodeList



## 可迭代对象

定义

- 只要一个数据已经实现了 `Iterator` 接口, 那么这个数据就有一个叫做 `Symbol.iterator` 的方法
- 该方法会返回一个可迭代对象
- 可迭代对象中有一个叫 `next` 的方法
- `next` 方法会返回一个对象, 包含 `value` 和 `done` 两个属性
    - `value` 代表当前遍历至的元素的数值
    - `done` 代表是否遍历完毕
    - 最后一个元素的 `next` 方法会返回 `{value: undefined, done: true}` , 代表遍历完毕



## 应用场景

- 解构赋值
- 扩展运算符



## 实现 `Iterator` 接口

```js
class MyArray {
  constructor() {
    for(let i = 0; i < arguments.length; i++) {
      this[i] = arguments[i];
    }
    this.length = arguments.length;
  }

  [Symbol.iterator]() {
    let index = 0;
    let self = this;
    return {
      next: function () {
        if(index < self.length) {
          return {
            value: self[index++],
            done: false
          };
        } else {
          return {
            value: self[index+],
            done: true
          };
        }
      }
    };
  }
}
```

