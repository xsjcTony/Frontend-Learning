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
- 可以传递额外的参数

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



### 方法装饰器 (Method Decorator)

[Method Decorators - Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html#method-decorators)

- 在 `方法` 声明之前的前一行绑定
- 可以用于监视 / 修改 / 替换 `方法` 的定义
- 传递的参数有 `3` 个
  - `静态方法` : `类` 的定义 / `实例方法` : `类` 的原型对象
  - 被绑定 `方法` 的名字
  - 被绑定 `方法` 的 `属性描述对象` ( `Object.defineProperty` 的第三个参数)
    - 在 `target < ES5` 的情况下, 这个参数不起作用, 为 `undefined`

```typescript
function test (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.enumerable = true
}

class Person {
  sayName (): void {
    console.log('My name is Aelita')
  }

  @test
  sayAge (): void {
    console.log('My age is 24')
  }

  static say (): void {
    console.log('Hello World')
  }
}

const p = new Person()
for (const key in p) {
  console.log(key) // sayAge
}
```

```TypeScript
function test (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.value = function (): void {
    console.log('My name is Tony')
  }
}

class Person {
  @test
  sayName (): void {
    console.log('My name is Aelita')
  }
}

const p = new Person()
p.sayName()
```



### 访问器装饰器 (Accessor Decorator)

[Accessor Decorators - Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html#accessor-decorators)

- 在 `访问器` 声明之前的前一行绑定
- 可以用于监视 / 修改 / 替换 `访问器` 的定义
- 传递的参数有 `3` 个
  - `静态成员` : `类` 的定义 / `实例成员` : `类` 的原型对象
  - 被绑定 `方法` 的名字
  - 被绑定 `方法` 的 `属性描述对象` ( `Object.defineProperty` 的第三个参数)
    - 在 `target < ES5` 的情况下, 这个参数不起作用, 为 `undefined`

注意点

- `TypeScript` 不允许同时装饰同一个成员的 `get` / `set` 访问器
- 同一个成员的 `访问器装饰器` 必须绑定在根据文档顺序的第一个 `访问器` 上 (其实好像都可以?)

```typescript
function test (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.set = (value: string) => {
    target.myName = value
  }
  descriptor.get = (): string => {
    return target.myName
  }
}

class Person {
  private _name: string

  constructor (name: string) {
    this._name = name
  }

  @test
  set name (value: string) {
    this._name = value
  }

  get name (): string {
    return this._name
  }
}

const p = new Person('Aelita')
console.log(p.name)
p.name = 'zs'
console.log(p.name)
```



### 属性装饰器 (Property Decorator)

[Property Decorators - Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html#property-decorators)

- 在 `属性` 声明之前的前一行绑定
- 可以用于监视 `属性` 的定义
- 传递的参数有 `2` 个
  - `静态属性` : `类` 的定义 / `实例属性` : `类` 的原型对象
  - 被绑定 `属性` 的名字

```typescript
function test (target: any, propertyKey: string) {
  target[propertyKey] = 'Aelita'
}

class Person {
  static age: number
  @test
  name?: string
}

const p = new Person()
console.log(p.name)

```



### 参数装饰器 (Parameter Decorator)

[Parameter Decorators - Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html#parameter-decorators)

- 在 `参数` 声明之前隔一个 `空格` 绑定
- 可以用于监视 / 修改 / 替换 `访问器` 的定义
- 传递的参数有 `3` 个
  - `静态成员` : `类` 的定义 / `实例成员` : `类` 的原型对象
  - 被绑定的 `参数` 所在的 `方法` 的名字 ( 若使用在 `constructor` 的参数中时为 `undefined` )
  - `参数` 在 `参数列表` 中的 `索引`

```typescript
function test (target: any, propertyKey: string, parameterIndex: number) {
  console.log(target)
  console.log(propertyKey)
  console.log(parameterIndex)
}

class Person {
  say (age: number, @test name: string): void {}
}

```







































