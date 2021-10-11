# 模块化 (>=ES6)



## 定义

- 一个文件就是一个 `模块`
- `模块` 中的数据都是私有的
- 可以通过对应的关键字暴露 `模块` 中的数据
- 可以通过对应的关键字导入 `模块` 并使用其中暴露的数据

---

## 格式



### 第一种方式

- 导出数据: `export { xxx }`
    - `xxx` 为需要导出的变量名 / 函数名
- 导入数据: `import { xxx } from 'path/to/module'`
    - 可以省略 `.js` 扩展名

```js
// a.js
const name = "Tony"
export { name }
const age = 24
export { age }
```

```js
// index.js
import { name, age } from './a' // .js扩展名可以省略
console.log(name) // Tony
console.log(age) // 24
```

注意点

- 该方式导出和导入的 `xxx` 变量名必须一致

- 如果想要在导入的时候修改变量名, 那么可以使用 `as` 来修改, 但是原有的变量名就会失效

    ```js
    // index.js
    import { name as str } from './a'
    console.log(name) //  // 变量名已失效
    console.log(str) // Tony
    ```

- 该方式可以导出多次

原理

- 导入本质上是 `ES6` 的 `解构赋值`



### 第二种方式

- 导出数据: `export default xxx`
    - `xxx` 为需要导出的变量名 / 函数名
- 导入数据: `import xxx from 'path/to/module'`
    - 可以省略 `.js` 扩展名

```js
// b.js
const name = "Tony"
export default name
```

```js
// index.js
import str from './b' // .js扩展名可以省略
console.log(str) // Tony
```

注意点

- 该方式导出和导入的 `xxx` 变量可以不一样
- 该方式只能导出一次数据, 换言之该方式只能暴露一个变量给外界

原理

- 导入本质上是 `ES6` 的 `解构赋值`



### 两种方式混合使用

- 企业开发中两种方式可以混合使用
- 导入的时候如果只写一行, 那么 `export default` 的导入必须写在前面, `export {}` 的导入写在后面
- 也可以分开导入

```js
// c.js
const name = 'Tony'
const age = 24

function say () {
  console.log('hi')
}

export { name, age, say }

class Person {
  constructor () {
    this.name = 'Lily'
    this.age = 18
  }
}

export default Person

const test = 'test'
export { test }
```

```js
// index.js
// import Person, { name, age, say, test } from './c' // 也可以写在一行中, 但是Person必须写在前面
import Person from './c'
import { name, age, say, test } from './c'

const p = new Person()
console.log(p)

console.log(name)
console.log(age)
say()
console.log(test)
```



