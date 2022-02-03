# TypeScript - 接口



> [TypeScript: Documentation - Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)



## 定义

- 可以理解为定义 `object` 的另一种方式

```typescript
interface FullName {
  firstName: string,
  lastName: string
}

let person = {
  firstName: 'Aelita',
  lastName: 'Schaeffer'
}

function say ({ firstName, lastName }: FullName): void {
  console.log(`My name is: ${ firstName }_${ lastName }`)
}

say(person)
```

---

## 可选属性 ?

- 默认情况下, 给类型为 `接口` 的变量赋值时, 必须要一模一样 (属性数量, 属性类型)
- 在 `接口` 定义中, 给可能不需要的属性加上一个 `?` 即可让其变为可选属性

```TypeScript
'use strict'

interface FullName {
  firstName: string,
  lastName: string,
  middleName?: string // 可选属性
}

function say ({ firstName, lastName, middleName }: FullName): void {
  middleName ?
    console.log(`My name is: ${ firstName }_${ middleName }_${ lastName }`) :
    console.log(`My name is: ${ firstName }_${ lastName }`)
}

say({ firstName: 'Aelita', lastName: 'Schaeffer' }) // Aelita_Schaeffer
say({ firstName: 'Aelita', lastName: 'Schaeffer', middleName: 'aaa' }) // Aelita_aaa_Schaeffer
```

---

## 索引签名 (Index Signatures)

- 用于描述那些不知道名字但是知道他大概是什么样的属性
- 只要 `key` 和 `value` 的类型满足 `索引签名` 的限定即可, 无论有几个都无所谓
- `string` 要特别注意, 因为他会影响到其他正常能够通过 `obj.property` 访问的属性

```TypeScript
interface FullName {
  [index: string]: string
}

let person: FullName = {
  firstName: 'Aelita',
  lastName: 'Schaeffer'
}
```

---

## 只读属性 readonly

- 指定该属性只能被赋值一次

```TypeScript
interface FullName {
  firstName: string
  readonly lastName: string
}

let person: FullName = {
  firstName: 'Aelita',
  lastName: 'Schaeffer'
}

person.lastName = 'foo' // 会报错
```

---

## 函数接口

- `接口` 也可以用于限定 `函数`
- 可以使用 `可选属性`

```TypeScript
interface Sum {
  (a: number, b?: number): number
}

let sum: Sum = function (x: number, y: number): number {
  return x + y
}
```

---

## 混合类型接口 (Call Signatures)

- `接口` 中既有 `属性` , 又有 `函数`
- 带有 `属性` 的可以 `调用` 的东西

```TypeScript
interface Count {
  (): void
  count: number
}

let getCounter = ((): Count => {
  let fn = <Count>function () {
    fn.count++
    console.log(fn.count)
  }
  fn.count = 0
  return fn
})()

getCounter() // 1
getCounter() // 2
getCounter() // 3

// 等价写法
let demo = <Count>(() => {
  demo.count++
  console.log(demo.count)
})
demo.count = 0

demo() // 1
demo() // 2
demo() // 3
```

---

## 继承 extends

- 继承其他 `接口` 中的属性
- 可以继承一个或多个 `接口`
- 被继承的 `父接口` 之间不可以有类型冲突的同名 `属性`
- `子接口` 可以 `override` `父接口` 的同名 `属性` , 但类型必须是 `父接口` 中属性的类型的 `子类型`

```TypeScript
interface Length {
  length: number
}

interface Width {
  width: number
}

interface Height {
  height: unknown
}

interface Rectangle extends Length, Width, Height {
  color: string
  height: number // override Height.height
}

let rectangle: Rectangle = {
  length: 10,
  width: 20,
  height: 30,
  color: 'red'
}
```

---

