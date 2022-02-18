## TypeScript - 模块 & 命名空间



> [TypeScript: Documentation - Namespaces and Modules](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html)



## 模块 (Module)

[TypeScript: Documentation - Modules](https://www.typescriptlang.org/docs/handbook/modules.html)

- `TypeScript` 同时兼容 `ES6` 和 `NodeJS` 的模块
- 更多具体细节参见文档

```TypeScript
export = xxx
import xxx = require('./path/to/module')
```

---

## 命名空间 (Namespace)

[TypeScript: Documentation - Namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html)

定义

- 可以看做是一个 `微型模块`
- 适合把相关业务代码写在一起, 又不想污染全局空间的场景
- 本质是一个 `大对象` , 可以把 `变量` / `方法` / `类` / `接口` 等都放在里面

和 `模块` 的异同

- 在程序 `内部` 使用的代码, 可以使用 `命名空间` 封装防止全局污染
- 在程序 `内部` / `外部` 使用的代码, 可以使用 `模块` 封装防止全局污染
- `模块` 可以实现 `命名空间` 相同的功能, 所以一般统一使用 `模块` 即可



### 基本使用

```TypeScript
// 定义命名空间
namespace Validation {
  const lettersRegexp = /^[A-Za-z]+$/
  // 通过 export 暴露给外界使用
  export const LettersValidator = (value: string) => {
    return lettersRegexp.test(value)
  }
}

const lettersRegexp = 1 // OK, 不会污染全局空间

// 使用命名空间
console.log(Validation.LettersValidator('abc'))
```



### 单文件命名空间

- 也可以将 `命名空间` 放到一个单独的文件中
- 在其他文件中使用 `/// <reference path='./path/to/namespace.ts' />` 的方式导入之后使用
- 需要通过 `tsc` 打包之后使用

```shell
tsc --outFile targetJSFile sourceTSFile [sourceTSFile ...]
```



### 同名命名空间合并

- 同名的 `命名空间` 会自动合并
- **不能**出现同名的 `变量` / `方法` 等
- 同名 `命名空间` 中, 其他 `命名空间` 没有通过 `export` 导出的内容是获取不到的

```TypeScript
namespace Validation {
  export let name: string = 'Aelita'
}

namespace Validation {
  export let age: number = 24
 
}

console.log(Validation.name) // Aelita
console.log(Validation.age) // 24
```



### 和同名 `类` 合并

- 同名 `类` 必须定义在 `命名空间` 之前

```TypeScript
class Person {
  say (): void {
    console.log('Hello World!')
  }
}

namespace Person {
  export const hi = (): void => {
    console.log('hi')
  }
}

Person.hi()
const p = new Person()
p.say()
```



### 和同名 `函数` 合并

- 同名 `函数` 必须定义在 `命名空间` 之前
- 不能是 `箭头函数`

```TypeScript
function getCounter (): void {
  getCounter.count++
  console.log(getCounter.count)
}

namespace getCounter {
  export let count: number = 0
}

getCounter() // 1
getCounter() // 2
getCounter() // 3
```



### 和同名 `枚举` 合并

- 没有先后顺序要求

```TypeScript
enum Gender {
  Male,
  Female
}

namespace Gender {
  export const Unisex: number = 666
}

console.log(Gender)
```



























