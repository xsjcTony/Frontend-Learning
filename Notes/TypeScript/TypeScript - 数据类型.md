# TypeScript - 数据类型



## 基本概念

- `TypeScript` 支持与 `JavaScript` 几乎相同的数据类型
- 除此之外还提供了 `枚举` 类型 ( `enum` )
- `JavaScript` 也支持的数据类型的内部用法和 `JavaScript` 一样

---

## 赋值关系表 (Assignability Table)

| Assignability |  any  | unknown | object | void  | undefined | null  | never |
| :-----------: | :---: | :-----: | :----: | :---: | :-------: | :---: | ----- |
|     any →     |       |  **✓**  | **✓**  | **✓** |   **✓**   | **✓** | ✕     |
|   unknown →   | **✓** |         |   ✕    |   ✕   |     ✕     |   ✕   | ✕     |
|   object →    | **✓** |  **✓**  |        |   ✕   |     ✕     |   ✕   | ✕     |
|    void →     | **✓** |  **✓**  |   ✕    |       |     ✕     |   ✕   | ✕     |
|  undefined →  | **✓** |  **✓**  |   ✓    | **✓** |           |   ✓   | ✕     |
|    null →     | **✓** |  **✓**  |   ✓    |   ✓   |     ✓     |       | ✕     |
|    never →    | **✓** |  **✓**  | **✓**  | **✓** |   **✓**   | **✓** |       |

---

## 基本数据类型



### 数值 number

```typescript
let val: number
val = 123
val = 0x11
```



### 布尔 boolean

```TypeScript
let val: boolean
val = true
```



### 字符串 string

```TypeScript
let val: string
val = '123'
val = `anotherVariable = ${ anotherVariable }`
```



### 数组 Array []

- 有两种方式可以定义 `数组`

```TypeScript
let arr1: Array<number> // 只能存储 number 的数组
let arr2: string[] // 只能存储 string 的数组
```

#### 只读数组 (ReadonlyArray)

- 只能被赋值一次的特殊 `数组`
- `TypeScript` 中对于 `数组` 类型的扩展
- 有两种格式

```TypeScript
let arr: ReadonlyArray<number> = [1, 3, 5] // 格式一
arr.push(7) // 会报错
let arr2: readonly string[] = [1, 3, 5] // 格式二
```



### 元祖 [tuple]

- `TypeScript` 中对于 `数组` 类型的扩展
- 用于 `确定长度` 并且对于每个元素 `确定数据类型` 的数组

```TypeScript
let tuple: [string, number, boolean] // 只能存储三个元素 (不能多也不能少), 第一个必须是 string, 第二个必须是 number, 第三个必须是 boolean
```

#### 只读元祖

- 只能被赋值一次的特殊 `元祖`

```TypeScript
let tuple: readonly [string, number, boolean]
```



### 任意 any

- 可以存储任意类型的数据
- `any` 可以赋值给任意数据类型
- 本质上是跳过了类型检查
- 慎用

```typescript
let val: any
val = 123
val = '123'
val = true
val = [1, 3, 5]
```



### void

- 与 `any` 相反, 表示没有任何类型
- 一般用于函数返回值
- 只有 `null` / `undefined` / `never` / `any` 类型可以赋值给 `void` 类型 (与 `tsconfig` 中的 `strict` 模式相关)

```TypeScript
function test1 (): void {
  console.log('hello world')
}

let test2 = (): void => {
  console.log('hello world')
}
```



### never

- 表示不存在的类型
- 一般用于抛出异常或根本没有返回值的函数
- 也出现于 `联合` 类型的收束中
- 是 `unknown` 的子类型

```TypeScript
function demo (): never {
  throw new Error('err')
}

function fn(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    x; // has type 'never'!
  }
}
```



### object

- 表示除了 `primitive` 类型之外的任意值, 包括 `function`
- 多用 `接口` ( `interface` ) 来表示
- <span style="color: #f90">和 `{}` 的含义不相同</span>
- <span style="color: #f90">和 `Object` 的含义不相同, `Object` 基本上永远不会用到</span>

```TypeScript
let obj: object
obj = { name: 'Tony', age: 24 }
```

---

## 类型断言 (Type Assertions)

定义

- 将一种类型强制转换为另一种类型
- 告诉编译器, 你别TM帮我检查了, I know what I'm doing

转换方式

- `<newType>variable` : 在 `.tsx` 中不适用
- `variable as newType` : 企业开发中推荐

```TypeScript
const str: any = 'it666'
// 方式一 (.tsx文件中不能用)
console.log(<string>str.length)
// 方式二 (企业开发推荐)
console.log((str as string).length)
```

---

## 类型收窄 (Narrowing)

[TypeScript: Documentation - Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

- 可以通过一些方式收窄 `联合类型` 的可能性



### Type predicates

[Using type predicates - Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)

- 用户自定义的类型保护函数
- 返回值类型为 `Type predicates` , 格式为 `parameterName is Type`
  - 函数中返回的是 `boolean`
- 可以应用于 `Array.filter()`
- 一般用于比较复杂以及需要精确控制的场景

```TypeScript
function isString (value: string | number): value is string {
  return typeof value === 'string'
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

const underWater: Fish[] = zoo.filter((pet): pet is Fish => isFish(pet))
```



### typeof

[typeof type guard - Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#typeof-type-guards)

- `TypeScript` 的 `typeof` 会返回如下 `字符串` , 意为只能 `收窄` 如下类型
  - `string`
  - `number`
  - `bigint`
  - `boolean`
  - `symbol`
  - `undefined`
  - `object`
  - `function`
- 只能使用 `===` / `!==`
- 利用 `typeof` 可以进行 `收窄`

```TypeScript
let value: string | number
// value = ...
if (typeof value === 'string') {
  console.log(value.length)
} else {
  console.log(value.toFixed())
}
```



### instanceof

[instanceof narrowing - Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#instanceof-narrowing)

- 一般适用于使用 `new` 创建的实例

```TypeScript
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString())
  } else {
    console.log(x.toUpperCase())
  }
}
```

---

## 函数 (Function)

基本定义

- 大部分和 `JavaScript` 中相同
- 在 `TypeScript` 中需要给参数 / 返回值指定类型

```typescript
// 命名函数
function say1 (name: string): void {
  console.log(name)
}

// 匿名函数
let say2 = function (name: string): void {
  console.log(name)
}

// 箭头函数
let say3 = (name: string): void => {
  console.log(name)
}
```



### 完整格式

- 在 `TypeScript` 中, `函数` 的完整格式是由两部分组成的

  1. 定义一个函数

  2. 根据定义实现函数

- 第二部函数实现中, 类型可以不写, `TypeScript` 会根据函数定义自动推导出对应的数据类型

```typescript
// 定义函数
let add: (a: number, b: number) => number
// 根据定义实现函数
add = function (x: number, y: number): number {
  return x + y
}

// 一步到位写法 (实现中不写类型)
let add1: (a: number, b: number) => number = function (x, y) {
  return x + y
}
```



### 函数声明 type

- 利用 `type` 实现, 本质是使用了 `Type Aliases` [TypeScript: Documentation - Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)

```TypeScript
type Add = (a: number, b: number) => number
let add: Add = function (x, y) {
  return x + y
}
```



### 函数重载 (Function Overloads)

[TypeScript: Documentation - More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)

- 同名函数可以根据不同的参数实现不同的功能
- 格式为先定义两个以上的函数, 然后再统一实现
- <span style="color: #ff0;">能用 `联合类型` 解决的, 尽量不要用 `函数重载` , 比如下面代码示例中的, 参数数量相同但只是类型不同的情况, 换言之, 下面这个例子不是特别好, 只是可以作为格式参考</span>
- `实现签名` (即实现的函数) 对外是不可见的

```typescript
// 坏例子
function getArray(x: number): number[]
function getArray(str: string): string[]
function getArray(value: number | string): number[] | string[] {
  if (typeof value === 'number') {
    const arr: number[] = []
    for (let i = 0; i < value; i++) {
      arr.push(value)
    }
    return arr
  } else {
    return value.split('')
  }
}
```



### 可选参数 ?

[TypeScript: Documentation - More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-parameters)

- 在可选的参数后面加上 `?` , 即意为该参数可传递也可不传递
- 类型为指定类型或 `undefined` , 在函数实现中需要处理为 `undefined` 即未传递的情况
- 也可以在 `函数重载` 中使用
- 可以有多个
- `可选参数` 后面除了 `可选参数` 不能跟其他参数
- <span style="color: #f90">永远**不要**在 `回调函数` 的定义中使用 `可选参数`</span>

```typescript
function add (x: number, y?: number, z?: number): number {
  return x + (y ? y : 0) + (z ? z : 0)
}

add(10) // 10
add(10, 20) // 30
add(10, 20, 30) // 60
```



### 默认参数

- 和 `ES6` 中相同

```typescript
function add (x: number, y: number = 10): number {
  return x + y
}

add(10) // 30
```



### 剩余参数

- 和 `ES6` 中相同

```TypeScript
function add (x: number, ...args: number[]): void {
  console.log(args)
}

add(10, 20, 30, 40) // [20, 30, 40]
```

---

## 泛型 \<T>

[TypeScript: Documentation - Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

定义

- 让代码变得更加健壮, 并且保持灵活性和可重用性
- 可以让用户指定的类型
- 可以避免 `any` 带来的一些问题



### 基本格式

- 在 `函数` 之前 / `类名` 之后使用 `<>` 包裹一个字符, 通常为 `T`
- 在实现 `函数` / `类` 时, 就可以使用这个字符作为类型
- 调用时, 在 `函数` / `类` 名之后加上 `<>` , 其中包含了想要指定的类型, 比如 `<string>`
  - 一般情况下会省略, 编译器会根据所给参数自动推断类型
- 可以指定多个 `泛型` 类型, 以 `,` 分隔

```typescript
// 例子中为 <Type>, 一般为 <T>
const getArray = <Type>(value: Type, items: number = 5): Type[] => {
  return new Array(items).fill(value)
}

let arr = getArray<string>('abc', 3)
let arr2 = getArray('abc', 3) // 一般情况下会省略 <string>
arr.map(item => item.length) // [3, 3, 3]
```



### 泛型约束 (Generic Constraint)

[TypeScript: Documentation - Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)

- 用于约束类型的一些性质, 比如必须拥有某些属性等等
- 创建一个 `接口` , 然后 `继承` 这个 `接口`

```typescript
interface Lengthwise {
  length: number
}

const logLength = <T extends Lengthwise>(arg: T): T => {
  console.log(arg.length)
  return arg
}

logLength(1) // 报错: Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.
logLength('I am a string, I have length property') // OK
```

#### 类型参数 (Type Parameter)

- 一个 `泛型` 被另一个 `泛型` 约束

```typescript
const getProps = <T, Key extends keyof T>(obj: T, key: Key): any => {
  return obj[key]
}
let obj = {
  a: 'a',
  b: 'b'
}
console.log(getProps(obj, 'a'))
console.log(getProps(obj, 'b'))
console.log(getProps(obj, 'c')) // 报错: Argument of type '"c"' is not assignable to parameter of type '"a" | "b"'
```



### 泛型类 / 接口

- 见 `TypeScript - 类` 的 `泛型` 篇章

---

## 枚举 enum

[TypeScript: Handbook - Enums](https://www.typescriptlang.org/docs/handbook/enums.html)

- `TypeScript` 独有的类型
- 表示变量只能是固定的几个取值之一

```typescript
// 定义了一个名称叫做 Gender 的枚举类型, 取值分别是 Male 和 Female
enum Gender {
  Male,
  Female
}
const gender: Gender = Gender.Male // Male
```



### 数值枚举 (Numeric Enum)

- 给成员赋值 `数值`

- 底层实现的本质是 `数值` 类型, 所以赋值 `数值` 类型不会报错

- 取值在没有任何赋值的情况下, 默认为从上至下从 `0` 开始递增
- 可以手动指定每个取值的值
  - 手动指定之前的取值不受影响, 之后的会 `+1` 递增
  - 取值可以重复, 但先定义的会被覆盖, 无法通过 `EnumType[index]` 的方式获取到, 但是 `EnumType.Word` 依然会指向指定的数值
  - 取值可以是 `负数`
  - <span style="color: #ff0">如果某个枚举成员之前的一个成员取值不是 `数值字面量` , 那么必须要手动赋值</span>
- 数值枚举的取值可以是 `字面量` (数值, 可以视作 `常量` ) / `常量` / `计算结果` [Computed and constant members - Enums](https://www.typescriptlang.org/docs/handbook/enums.html#computed-and-constant-members)

```TypeScript
const num = 666
const getNum = (): number => {
  return 888
}
enum Gender {
  Male = 3, // 字面量 (常量的一种)
  Female = num, // 常量
  Unisex = 8, // 必须要手动赋值, 因为前面一个成员不是数值字面量
  Unknown = getNum() // 计算结果
}
console.log(Gender.Male) // 3
console.log(Gender.Female) // 666
console.log(Gender.Unisex) // 8
console.log(Gender.Unknown) // 888
```



### 反向映射 (Reverse Mapping)

- `数值枚举` 可以通过成员对应的 `取值` 拿到他的名称

```typescript
// 接上述例子
console.log(Gender[3]) // Male
console.log(Gender[666]) // Female
console.log(Gender[8]) // Unisex
console.log(Gender[888]) // Unknown
```



### 字符串枚举 (String Enum)

- 给成员赋值 `字符串`

注意点

- 在取值为 `字符串` 的成员之后的成员, 必须手动赋值
- 取值只能为 `字符串字面量` / `数值字面量` / 内部的其他枚举值, 不可以是 `常量` / `计算结果`
- `字符串枚举` **没有** `反向映射` , 无法根据 `取值` 获取到名称

```TypeScript
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = Up // 内部的其他枚举值
}
console.log(Direction.Up) // "UP"
console.log(Direction.Down) // "DOWN"
console.log(Direction.Left) // "LEFT"
console.log(Direction.Right) // "UP"
```



### 异构枚举 (Heterogeneous Enum)

- 混合 `字符串枚举` / `数值枚举` 的枚举
- 一般不推荐使用, 除非真的想尝试从 `JavaScript` 的运行时行为中获取一些优势

```TypeScript
enum Direction {
  Up = 'UP', // 字符串字面量
  Down = 6, // 数值字面量, 由于跟在 字符串字面量 成员之后, 所以必须手动赋值
  Left, // 根据上一个成员的 6 自动递增到 7, 不强制手动赋值
  Right = Up // 内部的其他枚举值
}
console.log(Direction.Up) // "UP"
console.log(Direction.Down) // 6
console.log(Direction.Left) // 7
console.log(Direction.Right) // "UP"
```



### 枚举成员类型 (Enum Member Type)

- 以 `数值字面量` / `字符串字面量` 赋值的 `枚举成员` 可以作为类型使用
- <span style="color: #f90;">在企业开发中不要使用这个特性</span>
- `数值字面量` 可以赋值任意数值
- `字符串字面量` 只能赋值枚举成员的名称

```TypeScript
enum Gender {
  Male = 6,
  Female = 'Test'
}
interface TestInterface {
  age: Gender.Male,
  name: Gender.Female
}
class Person implements TestInterface {
  age: Gender.Male = 8 // 可以赋值任意数字
  name: Gender.Female = Gender4.Female // 只能赋值成员名称本身
}
```



### 联合枚举 (Union Enum)

- 枚举类型本身会自动变成枚举成员的联合

```TypeScript
enum Gender {
  Male,
  Female
}
// 会被视为
interface TestInterface {
  gender: Gender // gender: (Gender.Male | Gender.Female)
}
```



### 常量枚举 const

[const enums - Enums](https://www.typescriptlang.org/docs/handbook/enums.html#const-enums)

- `常量枚举` 不会生成真实存在的对象
- 编译时会利用枚举成员的 `取值` 直接替换
- 可以减少文件体积
- 但是有一些陷阱, 具体见文档 [Const enum pitfalls - Enums](https://www.typescriptlang.org/docs/handbook/enums.html#const-enum-pitfalls)
- `常量枚举` 只能赋值 `字面量` 或其他枚举成员
- 可以通过 `preserveConstEnums` 选项来防止 `常量枚举` 在编译时被移除

```typescript
const enum Enum {
  A,
  B
}
```

---

## 自动类型推断 (Type Inference)

[TypeScript: Documentation - Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html)

定义

- 不明确告诉编译器具体是什么类型, 编译器也能知道是什么类型

根据初始值

- 必须在定义的同时初始化, 才能自动推断
- 若先定义再初始化, 则无法推断

```TypeScript
let value = 123 // 相当于 let value: number = 123
let arr = [1, 'a'] // 相当于 let arr: (number | string)[] = [1, 'a']
```

根据上下文

```typescript
window.onmousedown = (event) => { // 相当于 (event: MouseEvent)
  console.log(event.target) // 有代码提示
}
```

---

## 兼容性 (Type Compatibility)

[TypeScript: Documentation - Type Compatibility](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)



### 对象

- 如果类型 `y` 至少有和类型 `x` 相同的成员, 则 `x` 与 `y` 兼容, `y` 可以赋值给 `x`
- 会递归检查

```TypeScript
interface TestInterface {
  name: string
  children: {
    age: number
  }
}

let t1 = { name: 'Aelita', children: { age: 18 } } // OK
let t2 = { name: 'Tony', children: { age: 'abc' } } // 会递归检查, age类型不对, 无法兼容
let t3 = { name: 'Ash' } // 没有 children, 无法兼容
let t4 = { name: 'Lily', children: { age: 18 }, gender: 'female' } // OK, 可以多但不可以少

let t: TestInterface
t = t1 // OK
t = t2 // 报错
t = t3 // 报错
t = t4 // OK
```



### 函数

- 函数如果要兼容, 需要考虑以下几个方面

参数个数

- 可以将参数少的赋值给参数多的
- 反之不行

```TypeScript
let fn1 = (x: number) => 0
let fn2 = (x: number, y: number) => 0
fn1 = fn2 // 报错
fn2 = fn1 // OK
```

参数类型

- 同位置的参数类型必须满足下列其一
  - 类型一致
  - 被赋值的函数参数类型必须是赋值函数参数类型的 `子类型`
- 参数名称无所谓

```TypeScript
let fn1 = (x: number) => 0
let fn2 = (x: number) => 0
let fn3 = (x: string) => 0
fn1 = fn2 // OK
fn2 = fn1 // OK
fn1 = fn3 // 报错
fn3 = fn1 // 报错

let fn1 = (x: number) => 0
let fn2 = (x: number | string) => 0
fn1 = fn2 // OK
fn2 = fn1 // 报错, number 不能赋值给 number | string
```

返回值类型

- 满足下列条件之一
  - 类型一致
  - 被赋值的函数返回值类型必须是赋值函数返回值类型的 `子类型`

```TypeScript
// 类型一致
let fn1 = (): number => 123
let fn2 = (): number => 456
let fn3 = (): string => 'abc'
fn1 = fn2 // OK
fn2 = fn1 // OK
fn1 = fn3 // 报错
fn3 = fn1 // 报错

// 子类型
let x = () => ({ name: "Alice" });
let y = () => ({ name: "Alice", location: "Seattle" });
x = y; // OK
y = x; // Error, because x() lacks a location property
```

函数重载

- 被赋值函数的所有 `重载签名` 都必须匹配至少一个兼容的赋值函数的 `重载签名`

```TypeScript
function add(x: number, y: number): number
function add(x: string, y: string): string
function add(x: any, y: any): number | string {
  return x + y
}

function sub(x: number, y: number): number
function sub(x: any, y: any): number {
  return x - y
}

let fn1 = add
fn1 = sub // 报错

let fn2 = sub
fn2 = add // OK
```



### 枚举

- `数值枚举` 与 `数值` 兼容
- 不同的 `枚举` 之间是 **不兼容** 的

```typescript
enum Gender {
  Male,
  Female
}
let value: Gender
value = Gender.Male // OK
value = 3 // OK
let num: number
num = 5 // OK
num = Gender.Female // OK
```



### 类

- 和 `对象` / `接口` 的兼容方式差不多
- `private` / `protected` 成员会 **影响** 兼容性
- `static` 成员和 `constructor` **不影响** 兼容性

```TypeScript
class Person {
  public name: string
  public age: number

  constructor (name: string, age: number) {
    this.name = name
    this.age = age
  }
}
class Animal {
  public name: string

  constructor (name: string) {
    this.name = name
  }
}
let p: Person = new Person('Aelita', 24)
let a: Animal = new Animal('Dog')
p = a // 报错, 不能将少的赋值给多的
a = p // OK
```



### 泛型

- 若没有在定义中使用 `泛型参数` , 则 **不影响** 兼容性, 反之 **影响**

```TypeScript
interface TestInterface<T> {

}

let t1: TestInterface<number>
let t2: TestInterface<string>
t1 = t2 // OK, 没有使用泛型参数
t2 = t1 // OK, 没有使用泛型参数

interface TestInterface2<T> {
  age: T
}
let t3: TestInterface2<number>
let t4: TestInterface2<string>
t3 = t4 // 报错, 使用了泛型参数
t4 = t3 // 报错, 使用了泛型参数
```



### 基本数据类型

- 见 `赋值关系表`

---

## 高级类型



### 交叉 &

- 将多个类型合并为一个类型

```TypeScript
let mergeFn = <T, U>(arg1: T, arg2: U): (T & U) => {
  return Object.assign(arg1, arg2)
}
let res = mergeFn({ name: 'Aelita' }, { age: 24 })
console.log(res) // { name: 'Aelita', age: 24 }
```



### 联合 |

- 表示这个变量可以是列举出的数据中的任何一种

```TypeScript
let val: number | string | boolean // val 既可以是 number, 也可以是 string, 还可以是 boolean
val = 123 // OK
val = 'abc' // OK
val = false // OK
```

#### 可辨识联合 (Discriminated Union)

- 联合的每一个取值至少拥有一个 `共同可辨识特征`
- 可以通过 `可辨识特征` 进行 `类型收窄`
- 若需要进行完整性检查, 那么给函数加上返回值类型, 并在 `tsconfig` 中开启 `strictNullChecks`

```TypeScript
interface Square {
  kind: 'square'
  x: number
}
interface Rectangle {
  kind: 'rectangle'
  x: number
  y: number
}
interface Circle {
  kind: 'circle'
  radius: number
}

type Shape = Square | Rectangle | Circle // 可辨识联合, 共同可辨识特征为 kind

function area(s: Shape): number {
  switch (s.kind) { // 通过 kind 进行类型收窄
    case 'square':
      return s.x ** 2
    case 'rectangle':
      return s.x * s.y
    case 'circle':
      return Math.PI * (s.radius ** 2)
  }
}
```



### null / undefined

- 默认情况下, `null` / `undefined` 可以赋值给除了 `never` 之外的任意类型
- `null` / `undefined` 也可以相互赋值

```TypeScript
let value1: null
let value2: undefined
let value3: number
value1 = value2 // OK
value2 = value1 // OK
value3 = value1 // Ok
value3 = value2 // OK
```

- 建议在 `tsconfig` 中开启 `strictNullChecks` [strictNullChecks - Docs on every TSConfig option](https://www.typescriptlang.org/tsconfig#strictNullChecks)
  - 阻止将 `null` / `undefined` 赋值给其他类型的行为, 除非使用 `联合类型` , 比如 `string | null | undefined`
  - 对于 `可选属性` / `可选参数` 来说, 默认情况下其类型就是 `联合类型` , 为 `当前类型 | undefined`
  - 在使用包含 `null` / `undefined` 的 `联合类型` 的值时, 需要先检查 `null` / `undefined` 的情况, 进行收窄 ( `narrowing` )
  - 可以使用 `!` 后缀来告诉编译器这个值不是 `null` / `undefined`

```TypeScript
function doSomething(x: string | null): void {
  if (x === null) {
    return
  } else {
    console.log("Hello, " + x.toUpperCase())
  }
}

function liveDangerously(x?: number | null) { // x 由于是可选参数, 所以其类型为 number | null | undefined
  console.log(x!.toFixed()) // OK, 使用 ! 就代表 x 不是 null 或 undefined
}
```



### 字面量 (Literal)

[Literal Types - Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)

- 在 `TypeScript` 中可以将 `字面量` 作为具体类型使用
- 包含 `字符串` / `数值` / `true` / `false`
- 可以用于一些比较特殊的场景, 或与其他的混合使用

```typescript
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
function configure(x: Options | "auto") {
  // ...
}
```



### 索引访问类型 [type]

[TypeScript: Documentation - Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)

定义

- 通过 `[]` 索引访问操作符, 得到某个索引的类型

```TypeScript
interface TestInterface {
  a: string
  b: number,
  c: boolean,
  d: symbol,
  e: null,
  f: undefined,
  g: never
}
type MyType = TestInterface['a'] // string
type MyType = TestInterface[keyof TestInterface] // string | number | boolean | symbol | null | undefined | never
```

- 使用 `typeof arr[number]` 可以获得数组中的类型

```TypeScript
const arr = ['str', 123]
type res = typeof arr[number] // string | number
```

应用场景示例

```TypeScript
const obj = {
  name: 'Aelita',
  age: 24,
  bool: true
}

// T[K] 代表对象中有的类型的数组, 具体由调用者决定
function getValues <T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  let arr: T[K][] = []
  keys.forEach((key: K) => {
    arr.push(obj[key])
  })
  return arr
}

let res = getValues(obj, ['name', 'bool']) // res: (string | boolean)[]
console.log(res)
```



### 映射类型 (Mapped Type)

[TypeScript: Documentation - Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)

- 根据旧的 `类型` 创建出新的 `类型`
- 基于 `索引签名`
- 可以添加 `readonly` / `?` 修饰符
  - 通过 `+` / `-` 控制是增加还是删除
  - 不写的话默认为 `+` 

```TypeScript
interface TestInterface1 {
  name: string
  age: number
}
interface TestInterface2 {
  readonly name?: string
  readonly age?: number
}

type ReadonlyTestInterface<T> = {
  -readonly [P in keyof T]-?: T[P] // 在 T 的基础上去除 readonly 和 ?
}

type MyType = ReadonlyTestInterface<TestInterface2> // 等于 TestInterface1
```

拆包

- 将映射之后的类型还原为映射之前的类型

```TypeScript
interface MyInterface {
  name: string
  age: number
}
// 映射
type MyType<T> = {
  +readonly [P in keyof T]: T[P]
}
type Test = MyType<MyInterface>
// 拆包
type UnMyType<T> = {
  -readonly [P in keyof T]: T[P]
}
type Test2 = UnMyType<Test>
```



### 工具类型 (Utility Type)

[TypeScript: Documentation - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

- 全局可用的 `TypeScript` 内置 `工具类型`
- 可以嵌套使用

`Partial<Type>` / `Readonly<Type>` / `Required<Type>`

- 将原有类型中的内容变为 `可选` / `只读` / `必须`

```TypeScript
type MyType2 = Readonly<TestInterface1>
type MyType3 = Partial<TestInterface1>
type MyType4 = Partial<Readonly<TestInterface1>>
type MyType5 = Required<TestInterface2>
```

`Pick<Type, Keys>`

- 通过 `(联合) 字符串字面量` 将原有类型中的部分内容映射到新类型中

```TypeScript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false
}
```

`Record<Keys, Type>`

- 将一个类型的所有属性作为 `Key` , 映射到另一个类型上, 作为 `Value`

```typescript
type AnimalKind = 'dog' | 'cat'
interface AnimalInfo {
  name: string
  age: number
}
type Animal = Record<AnimalKind, AnimalInfo>
// Animal 实质上为
/*
{
  dog: {
    name: string
    age: number
  }
  cat: {
    name: string
    age: number
  }
}
*/
```

`Exclude<UnionType, ExcludedMembers>`

- 从 `UnionType` 中剔除可以赋值给 `ExcludedMembers` 的类型

```TypeScript
type res = Exclude<string | number | boolean, number>
```

`Extract<Type, Union>`

- 从 `Type` 中提取可以赋值给 `Union` 的类型

```TypeScript
type res = Extract<string | number | boolean, number | string>
```

`NonNullable<Type>`

- 从 `Type` 中剔除 `null` / `undefined`

```TypeScript
type res = NonNullable<string | null | boolean | undefined>
```

`ReturnType<Type>`

- 获取 `函数Type` 的返回值类型

```TypeScript
type res = ReturnType<() => number>
```

`ConstructorParameters<Type>`

- 获取一个 `类` 的 `构造函数Type` 的参数组成的 `元祖`

```TypeScript
class Person {
  constructor (name: string, age: number) {}
}
type res = ConstructorParameters<typeof Person>
```

`Parameters<Type>`

- 获取 `函数Type` 的参数类型组成的 `元祖`

```TypeScript
declare function say (name: string, age: number, gender: boolean): void
type res = Parameters<typeof say>
```



### 条件类型 (Conditional Type)

[TypeScript: Documentation - Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)

- 判断前面一个类型是否 相同于 / 继承于 后面一个类型, 返回不同的结果
- 格式为 `T extends U ? X : Y`

```TypeScript
type MyType<T> = T extends string ? string: any
type res = MyType<boolean>
```

#### 分布式条件类型 (Distributive Conditional Type)

[Distributive Conditional Types - Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)

- 当被检测类型是 `泛型` 并且是 `联合类型` 时, 就称之为 `分布式条件类型`
- 可以实现 `Exlucde` / `Extract` / `NonNullable` 等

```TypeScript
// Exclude 的实现
type MyType<T, U> = T extends U ? never : T
type res = MyType<string | number | boolean, number>
```

#### infer

- 在 `条件类型` 中根据 `检测类型` 推断出新的类型

```TypeScript
type MyType<T> = T extends Array<infer U> ? U : T
type res = MyType<string | number[]> // string | number
// 等价于
type MyType<T> = T extends any[] ? T[number] : T
```



### unknown

- `TypeScript v3.0` 新增
- 比 `any` 更安全

- 和 `any` 一样, 可以存储任意类型的数据
- 如果没有 `类型断言` / `流程控制`
  - `unknown` 不能赋值给除了 `any` 以外的任何其他类型
  - 不能做任何操作 ( `===` / `!==` 除外)

- 不能访问 `属性` / `方法` / 创建实例
- 与任何类型组成的 `交叉类型` , 结果都是其他类型
- 与除了 `any` 以外的任何类型组成的 `联合类型` , 最后结果都是 `unknown`
- `keyof unknown` 结果为 `never`
- 使用 `映射类型` 时, 如果遍历的是 `unknown` 类型, 那么不会映射任何属性, 会返回 `{}`

```TypeScript
function safeParse(s: string): unknown {
  return JSON.parse(s)
}
```



### Symbol

[TypeScript: Documentation - Symbols](https://www.typescriptlang.org/docs/handbook/symbols.html)

- 和 `ES6` 中的 `symbol` 一样



### Iterators & Generators

[TypeScript: Documentation - Iterators and Generators](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html)

- 和 `ES6` 中的一样
- 当编译目标为 `ES5` / `ES3` 时,  `for...of` 循环只能用在 `数组` 上

---

## 类型别名 type

[Type Aliases - Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)

定义

- 用于给一个类型起一个其他的名字
- 方便重复使用
- 可以和 `接口` 相互兼容



### 基本格式

- 使用 `type` 关键字

```typescript
type MyString = string
let value13: MyString = 'abc'
```

- 也可以使用 `泛型`

```TypeScript
type MyType<T> = { x: T, y: T }
let value14: MyType<number> = { x: 123, y: 456 }
```

- 可以使用自己, 以方便配合 `可选属性` 定义一些 `树状` / `嵌套` 结构

```typescript
type MyType = {
  name: string
  children?: MyType
}
let value14: MyType = {
  name: 'one',
  children: {
    name: 'two',
    children: {
      name: 'three'
    }
  }
}
```



### 和接口的异同

相同点

- 都可以描述属性 / 方法

```TypeScript
type MyType = {
  name: string
  say (): void
}

interface MyInterface {
  name: string
  say (): void
}
```

- 都可以扩展
  - `类型别名` 通过 `& ` 扩展
  - `接口` 通过 `extends` 扩展

```TypeScript
type MyType = {
  name: string
  say (): void
}
type MyType2 = myType & {
  age: number
}

interface MyInterface {
  name: string
  say (): void
}
interface MyInterface2 extends MyInterface {
  age: number
}
```

不同点

- `类型别名` 可以声明 `基本类型` / `联合类型` / `元祖` 等 , 而 `接口` 不行

```TypeScript
type MyType = boolean | string
type MyType2 = [string, number, boolean]
```

-  `类型别名` 不会自动合并, 而 `接口` 会

```TypeScript
// 类型别名 不能创建多个同名的, 会报错
type MyType = {
  name: string
}
type MyType2 = { // 报错
  age: number
}

// 接口 会合并
interface MyInterface {
  name: string
}
interface MyInterface {
  age: number
}
```

























































