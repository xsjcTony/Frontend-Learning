# TypeScript - 装饰器 (Decorator)



> [TypeScript: Documentation - Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html#decorator-factories)



## 基本概念

- 在 `JavaScript` 中仍然处在 `提案` 状态

- 一种特殊类型的声明, 可以被附加到不同的地方
  - 类装饰器
  - 方法装饰器
  - 访问器装饰器
  - 属性装饰器
  - 参数装饰器
- 基本格式
  - 普通装饰器
  - 装饰器工厂
  - 装饰器组合
- 格式为 `@expression`
- 紧贴在需要绑定的内容之前书写
- <span style="color: #f90;">`装饰器` 无论如何都**不会**改变 `TypeScript` 中的 `类型`</span>

---

## 启用

- 由于是还在 `提案` 阶段的语法, 所以需要在 `tsconfig` 中启用

```json
"experimentalDecorators": true
```

---

## 装饰器种类



### 普通装饰器

- 一个 `函数`

```TypeScript
function test (target) {
  console.log('test')
}

@test
class Person {}
```



### 装饰器工厂 (Decorator Factory)

- 一个返回 `回调函数` 的 `函数`
  - `函数` 是为 `装饰器` 做准备工作
  - 返回的 `回调函数` 是 `装饰器` 主体
- 绑定 `装饰器` 时, 需要加上 `()` 调用 `装饰器工厂` , 获得真正的 `装饰器`

```TypeScript
function demo () {
  console.log('set up')
  return (target) => {
    console.log('test')
  }
}

@demo()
class Person {}
```



### 装饰器组合 (Decorator Composition)

- 将 `普通装饰器` 和 `装饰器工厂` 结合起来使用
- 顺序为
  1. 先从上至下执行所有的 `装饰器工厂` , 拿到真正的 `装饰器`
  2. 从下至上执行所有的 `装饰器`

```typescript
function test (target) {
  console.log('test')
}

function demo () {
  console.log('demo setup')
  return (target) => {
    console.log('demo in')
  }
}

function abc (target) {
  console.log('abc')
}

function def () {
  console.log('def setup')
  return (target) => {
    console.log('def in')
  }
}

@test
@demo()
@def()
@abc
class Person {}
/*
输出结果:
demo setup
def setup
def in
abc
demo in
test
*/
```

---

## 不同用法



### 类装饰器 (Class Decorator)

[Class Decorators - Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html#class-decorators)

- 在 `类` 声明之前的前一行绑定
- 可以用于监视 / 修改 / 替换 `类` 的定义
- `类` 的定义会作为唯一的参数传递给 `装饰器`
- 如果 `装饰器` 返回了一个新的 `类` , 那么会用其代替原有 `类` 的定义 (相当于一个 `子类` )

```TypeScript
// 正常装饰器
function test (target: Function) {
  target.personName = 'Aelita' // 静态属性
  target.prototype.name = 'Tony' // 实例属性
  target.prototype.say = function (): void { // 实例方法
    console.log(`my name is ${ target.prototype.name }`)
  }
}

@test
class Person {}

const p = new Person()
// 由于是装饰器添加的, 所以TypeScript不知道, 会报错. 可以使用interface来合并, 避免报错
console.log(p.name) // Tony
p.say() // my name is Tony
console.log(Person.personName) // Aelita
```

```TypeScript
// 返回类的装饰器
function test <T extends { new (...args: any[]): object }>(target: T) {
  return class extends target {
    name: string = 'Tony' // 会覆盖原有的 name
    age: number = 24
  }
}

@test
class Person {
  name = 'Aelita'
}

const p = new Person()
console.log(p) // Person { name: 'Tony', age: 24 }
```













































